from fastapi import FastAPI, UploadFile, File, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pytesseract
from PIL import Image
import io
import re
from datetime import datetime
import json
import requests
from functools import lru_cache
import math

app = FastAPI(title="MedFinder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Users database with roles
USERS_DB = {
    "demo@medfinder.com": {"password": "demo123", "role": "user", "name": "Demo User"},
    "admin@medfinder.com": {"password": "admin123", "role": "admin", "name": "Admin User"},
    "user@medfinder.com": {"password": "user123", "role": "user", "name": "Regular User"},
}

# Mock Data for Demo
MOCK_DRUGS = {
    "lisinopril": {"generic": "lisinopril", "brand": "Prinivil", "rxnorm": "29046", "atc": "C09AA03"},
    "atorvastatin": {"generic": "atorvastatin", "brand": "Lipitor", "rxnorm": "83367", "atc": "C10AA05"},
    "metformin": {"generic": "metformin", "brand": "Glucophage", "rxnorm": "6809", "atc": "A10BA02"},
    "amlodipine": {"generic": "amlodipine", "brand": "Norvasc", "rxnorm": "17767", "atc": "C08CA01"},
    "omeprazole": {"generic": "omeprazole", "brand": "Prilosec", "rxnorm": "7646", "atc": "A02BC01"},
}

MOCK_PHARMACIES = [
    {"id": 1, "name": "Apollo Pharmacy", "city": "Delhi", "area": "Connaught Place", "lat": 28.6139, "lng": 77.2090, "open": True},
    {"id": 2, "name": "MedPlus", "city": "Delhi", "area": "Karol Bagh", "lat": 28.6519, "lng": 77.1900, "open": True},
    {"id": 3, "name": "Netmeds", "city": "Delhi", "area": "Lajpat Nagar", "lat": 28.5677, "lng": 77.2431, "open": True},
    {"id": 4, "name": "1mg Pharmacy", "city": "Delhi", "area": "Dwarka", "lat": 28.5921, "lng": 77.0460, "open": True},
    {"id": 5, "name": "Apollo 24/7", "city": "Delhi", "area": "Rohini", "lat": 28.7495, "lng": 77.0736, "open": True},
    {"id": 6, "name": "Apollo Pharmacy", "city": "Mumbai", "area": "Andheri", "lat": 19.1136, "lng": 72.8697, "open": True},
    {"id": 7, "name": "MedPlus", "city": "Mumbai", "area": "Bandra", "lat": 19.0596, "lng": 72.8295, "open": True},
    {"id": 8, "name": "Netmeds", "city": "Mumbai", "area": "Powai", "lat": 19.1197, "lng": 72.9078, "open": False},
    {"id": 9, "name": "1mg Pharmacy", "city": "Mumbai", "area": "Thane", "lat": 19.2183, "lng": 72.9781, "open": True},
    {"id": 10, "name": "Wellness Forever", "city": "Mumbai", "area": "Borivali", "lat": 19.2403, "lng": 72.8593, "open": True},
    {"id": 11, "name": "Apollo Pharmacy", "city": "Bangalore", "area": "Koramangala", "lat": 12.9352, "lng": 77.6245, "open": True},
    {"id": 12, "name": "MedPlus", "city": "Bangalore", "area": "Indiranagar", "lat": 12.9716, "lng": 77.6412, "open": True},
    {"id": 13, "name": "Netmeds", "city": "Bangalore", "area": "Whitefield", "lat": 12.9698, "lng": 77.7499, "open": True},
    {"id": 14, "name": "1mg Pharmacy", "city": "Bangalore", "area": "Electronic City", "lat": 12.8456, "lng": 77.6603, "open": True},
    {"id": 15, "name": "Apollo 24/7", "city": "Bangalore", "area": "Jayanagar", "lat": 12.9250, "lng": 77.5838, "open": True},
    {"id": 16, "name": "Apollo Pharmacy", "city": "Hyderabad", "area": "Banjara Hills", "lat": 17.4239, "lng": 78.4738, "open": True},
    {"id": 17, "name": "MedPlus", "city": "Hyderabad", "area": "HITEC City", "lat": 17.4435, "lng": 78.3772, "open": True},
    {"id": 18, "name": "Netmeds", "city": "Hyderabad", "area": "Kukatpally", "lat": 17.4849, "lng": 78.3914, "open": False},
    {"id": 19, "name": "1mg Pharmacy", "city": "Hyderabad", "area": "Secunderabad", "lat": 17.4399, "lng": 78.4983, "open": True},
    {"id": 20, "name": "Apollo Pharmacy", "city": "Chennai", "area": "T Nagar", "lat": 13.0418, "lng": 80.2341, "open": True},
    {"id": 21, "name": "MedPlus", "city": "Chennai", "area": "Anna Nagar", "lat": 13.0850, "lng": 80.2101, "open": True},
    {"id": 22, "name": "Netmeds", "city": "Chennai", "area": "Velachery", "lat": 12.9750, "lng": 80.2210, "open": True},
    {"id": 23, "name": "1mg Pharmacy", "city": "Chennai", "area": "OMR", "lat": 12.8996, "lng": 80.2209, "open": True},
    {"id": 24, "name": "Apollo Pharmacy", "city": "Pune", "area": "Koregaon Park", "lat": 18.5362, "lng": 73.8958, "open": True},
    {"id": 25, "name": "MedPlus", "city": "Pune", "area": "Hinjewadi", "lat": 18.5912, "lng": 73.7389, "open": True},
    {"id": 26, "name": "Netmeds", "city": "Pune", "area": "Wakad", "lat": 18.5974, "lng": 73.7898, "open": True},
]

class LoginRequest(BaseModel):
    email: str
    password: str

class PrescriptionData(BaseModel):
    drug_name: str
    strength: Optional[str] = None
    dosage: Optional[str] = None

class MedicineCreate(BaseModel):
    drug_name: str
    generic_name: str
    brand_name: str
    rxnorm_id: str
    atc_code: str

class PriceReport(BaseModel):
    pharmacy_name: str
    drug_name: str
    price: float
    user_trust_score: Optional[float] = 0.5

def verify_admin(user_email: str):
    """Verify if user is admin"""
    user = USERS_DB.get(user_email)
    if not user or user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return True

@app.get("/")
def root():
    return {"message": "MedFinder API", "version": "2.0.0"}

@app.post("/api/auth/login")
def login(data: LoginRequest):
    """Authenticate user and return role"""
    user = USERS_DB.get(data.email)
    
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "success": True,
        "data": {
            "email": data.email,
            "role": user["role"],
            "name": user["name"]
        }
    }

@app.post("/api/ocr/extract")
async def extract_prescription(file: UploadFile = File(...)):
    """Extract prescription details from uploaded image"""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        text = pytesseract.image_to_string(image)
        
        drug_name = extract_drug_name(text)
        strength = extract_strength(text)
        dosage = extract_dosage(text)
        
        if not drug_name:
            raise HTTPException(status_code=400, detail="Could not extract drug name")
        
        return {
            "success": True,
            "data": {
                "drug_name": drug_name,
                "strength": strength,
                "dosage": dosage,
                "raw_text": text,
                "confidence": 0.85
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}")

@app.post("/api/drugs/parse")
async def parse_drug(data: PrescriptionData):
    """Parse and normalize drug information"""
    drug_lower = data.drug_name.lower().strip()
    
    drug_info = None
    for key, value in MOCK_DRUGS.items():
        if key in drug_lower or value["brand"].lower() in drug_lower:
            drug_info = value
            break
    
    if not drug_info:
        drug_info = MOCK_DRUGS["lisinopril"]
    
    fda_data = await get_openfda_info(drug_info["generic"])
    alternatives = [d["generic"] for d in MOCK_DRUGS.values() if d["generic"] != drug_info["generic"]][:3]
    
    return {
        "success": True,
        "data": {
            "drug_name": data.drug_name,
            "generic_name": drug_info["generic"],
            "brand_name": drug_info["brand"],
            "strength": data.strength,
            "dosage": data.dosage,
            "rxnorm_id": drug_info["rxnorm"],
            "atc_code": drug_info["atc"],
            "safe_alternatives": alternatives,
            "fda_info": fda_data
        }
    }

@app.get("/api/prices/compare")
def compare_prices(drug_name: str, location: str = "Delhi", generic: bool = True):
    """Get price comparison with INR savings and AI prediction"""
    location_lower = location.lower()
    filtered_pharmacies = [
        p for p in MOCK_PHARMACIES 
        if location_lower in p["city"].lower() or location_lower in p["area"].lower()
    ]
    
    if not filtered_pharmacies:
        filtered_pharmacies = MOCK_PHARMACIES
    
    prices = []
    
    for pharmacy in filtered_pharmacies:
        base_price = 80
        city_multiplier = 1.0
        if pharmacy["city"] == "Mumbai":
            city_multiplier = 1.2
        elif pharmacy["city"] == "Bangalore":
            city_multiplier = 0.9
        elif pharmacy["city"] == "Chennai":
            city_multiplier = 0.85
        elif pharmacy["city"] == "Pune":
            city_multiplier = 0.95
        
        generic_price = round(base_price * city_multiplier + (pharmacy["id"] * 15), 2)
        brand_price = round(generic_price * 3.5, 2) if not generic else None
        savings_inr = round(brand_price - generic_price, 2) if brand_price else 0
        
        # AI Price Prediction
        predicted_drop = round(generic_price * 0.12, 2)  # 12% predicted drop
        price_trend = "dropping" if pharmacy["id"] % 3 == 0 else "stable"
        
        # Pharmacy Rating
        rating = round(4.0 + (pharmacy["id"] % 10) / 10, 1)
        review_count = 50 + (pharmacy["id"] * 23)
        
        prices.append({
            "pharmacy_id": pharmacy["id"],
            "pharmacy_name": pharmacy["name"],
            "city": pharmacy["city"],
            "area": pharmacy["area"],
            "distance": 0,
            "brand_price": brand_price,
            "generic_price": generic_price,
            "savings_inr": savings_inr,
            "stock_status": "in_stock" if pharmacy["id"] % 4 != 0 else "low_stock",
            "open_now": pharmacy["open"],
            "lat": pharmacy["lat"],
            "lng": pharmacy["lng"],
            "rating": rating,
            "review_count": review_count,
            "ai_prediction": {
                "predicted_price": round(generic_price - predicted_drop, 2),
                "price_trend": price_trend,
                "best_time_to_buy": "Tuesday morning" if price_trend == "dropping" else "Now",
                "confidence": 0.87
            },
            "timestamp": datetime.now().isoformat()
        })
    
    prices.sort(key=lambda x: x["generic_price"])
    
    return {
        "success": True,
        "data": {
            "drug_name": drug_name,
            "location": location,
            "prices": prices,
            "total_pharmacies": len(prices)
        }
    }

@app.get("/api/pharmacies/nearby")
def get_nearby_pharmacies(location: str = "Delhi"):
    """Get nearby pharmacies"""
    location_lower = location.lower()
    filtered = [
        p for p in MOCK_PHARMACIES 
        if location_lower in p["city"].lower() or location_lower in p["area"].lower()
    ]
    
    if not filtered:
        filtered = MOCK_PHARMACIES
    
    return {
        "success": True,
        "data": {
            "pharmacies": filtered,
            "count": len(filtered),
            "location": location
        }
    }

@app.post("/api/insurance/estimate")
def estimate_insurance(drug_name: str, insurer: str, generic_price: float, tier: Optional[int] = 1):
    """Estimate insurance with INR"""
    copay_tiers = {
        1: 50.0,
        2: 150.0,
        3: 400.0,
        4: 800.0
    }
    
    insurer_multiplier = 1.0
    if insurer.lower() in ["star health", "hdfc ergo", "icici lombard"]:
        insurer_multiplier = 0.8
    elif insurer.lower() in ["cghs", "esi", "ayushman bharat"]:
        insurer_multiplier = 0.5
    
    base_copay = copay_tiers.get(tier, 15.0)
    copay = round(base_copay * insurer_multiplier, 2)
    final_cost = min(copay, generic_price)
    out_of_pocket = max(0, generic_price - copay)
    
    return {
        "success": True,
        "data": {
            "insurer": insurer,
            "tier": tier,
            "copay": copay,
            "out_of_pocket": out_of_pocket,
            "final_cost": final_cost,
            "savings_vs_brand": round(generic_price * 2.5, 2)
        }
    }

@app.post("/api/stock/report")
def report_stock(pharmacy_id: int, drug_name: str, in_stock: bool, user_trust_score: Optional[float] = 0.5):
    """Crowd-sourced stock reporting"""
    confidence = min(0.95, 0.5 + (user_trust_score * 0.45))
    
    return {
        "success": True,
        "message": "Stock status updated",
        "data": {
            "pharmacy_id": pharmacy_id,
            "drug_name": drug_name,
            "in_stock": in_stock,
            "confidence": round(confidence, 2),
            "timestamp": datetime.now().isoformat()
        }
    }

@app.post("/api/prices/report")
def report_price(data: PriceReport):
    """Crowdsourced price reporting"""
    confidence = min(0.95, 0.5 + (data.user_trust_score * 0.45))
    
    return {
        "success": True,
        "message": "Price report submitted",
        "data": {
            "pharmacy_name": data.pharmacy_name,
            "drug_name": data.drug_name,
            "price": data.price,
            "confidence": round(confidence, 2),
            "timestamp": datetime.now().isoformat()
        }
    }

@app.post("/api/alerts/create")
def create_price_alert(drug_name: str, target_price: float, user_email: str):
    """Create price alert"""
    return {
        "success": True,
        "message": "Price alert created",
        "data": {
            "drug_name": drug_name,
            "target_price": target_price,
            "user_email": user_email,
            "alert_id": f"alert_{datetime.now().timestamp()}",
            "status": "active"
        }
    }

@app.get("/api/alerts/list")
def list_price_alerts(user_email: str):
    """List user's price alerts"""
    mock_alerts = [
        {"id": 1, "drug_name": "Lisinopril", "target_price": 100, "current_price": 120, "status": "active"},
        {"id": 2, "drug_name": "Atorvastatin", "target_price": 250, "current_price": 240, "status": "triggered"},
    ]
    return {
        "success": True,
        "data": {"alerts": mock_alerts}
    }

@app.get("/api/admin/stats")
def get_admin_stats(user_email: str = Header(..., alias="X-User-Email")):
    """Admin dashboard with INR savings"""
    verify_admin(user_email)
    
    return {
        "success": True,
        "data": {
            "total_searches": 15847,
            "active_users": 3421,
            "pharmacy_partners": 127,
            "total_savings_inr": 2847500.00,
            "avg_savings_per_search": 179.75,
            "most_searched": [
                {"drug": "Lisinopril", "count": 2341, "avg_savings_inr": 225.00},
                {"drug": "Atorvastatin", "count": 1987, "avg_savings_inr": 180.50},
                {"drug": "Metformin", "count": 1654, "avg_savings_inr": 150.25}
            ]
        }
    }

@app.post("/api/admin/medicines")
def add_medicine(data: MedicineCreate, user_email: str = Header(..., alias="X-User-Email")):
    """Admin only: Add medicine"""
    verify_admin(user_email)
    
    MOCK_DRUGS[data.generic_name.lower()] = {
        "generic": data.generic_name,
        "brand": data.brand_name,
        "rxnorm": data.rxnorm_id,
        "atc": data.atc_code
    }
    
    return {
        "success": True,
        "message": "Medicine added successfully"
    }

@app.put("/api/admin/medicines/{drug_name}")
def edit_medicine(drug_name: str, data: MedicineCreate, user_email: str = Header(..., alias="X-User-Email")):
    """Admin only: Edit medicine"""
    verify_admin(user_email)
    
    if drug_name.lower() not in MOCK_DRUGS:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    MOCK_DRUGS[drug_name.lower()] = {
        "generic": data.generic_name,
        "brand": data.brand_name,
        "rxnorm": data.rxnorm_id,
        "atc": data.atc_code
    }
    
    return {
        "success": True,
        "message": "Medicine updated successfully"
    }

@app.delete("/api/admin/medicines/{drug_name}")
def delete_medicine(drug_name: str, user_email: str = Header(..., alias="X-User-Email")):
    """Admin only: Delete medicine"""
    verify_admin(user_email)
    
    if drug_name.lower() not in MOCK_DRUGS:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    del MOCK_DRUGS[drug_name.lower()]
    
    return {
        "success": True,
        "message": "Medicine deleted successfully"
    }

def extract_drug_name(text: str) -> Optional[str]:
    text_lower = text.lower()
    for drug in MOCK_DRUGS.keys():
        if drug in text_lower:
            return drug.capitalize()
    for drug_info in MOCK_DRUGS.values():
        if drug_info["brand"].lower() in text_lower:
            return drug_info["brand"]
    words = re.findall(r'\b[A-Za-z]{5,}\b', text)
    return words[0] if words else None

def extract_strength(text: str) -> Optional[str]:
    match = re.search(r'(\d+)\s*(mg|mcg|g|ml)', text, re.IGNORECASE)
    return match.group(0) if match else None

def extract_dosage(text: str) -> Optional[str]:
    patterns = [
        r'(\d+)\s*times?\s*(daily|per day)',
        r'once\s*daily',
        r'twice\s*daily'
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(0)
    return None

@lru_cache(maxsize=100)
async def get_openfda_info(drug_name: str) -> dict:
    try:
        url = f"https://api.fda.gov/drug/label.json?search=openfda.generic_name:{drug_name}&limit=1"
        response = requests.get(url, timeout=3)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("results"):
                result = data["results"][0]
                return {
                    "warnings": result.get("warnings", ["No warnings"])[:1],
                    "active_ingredient": result.get("openfda", {}).get("substance_name", [drug_name]),
                    "manufacturer": result.get("openfda", {}).get("manufacturer_name", ["Various"])[:1],
                    "purpose": result.get("purpose", ["Prescription medication"])[:1]
                }
    except Exception as e:
        print(f"OpenFDA error: {e}")
    
    return {
        "warnings": ["Consult your doctor"],
        "active_ingredient": [drug_name],
        "manufacturer": ["Various"],
        "purpose": ["Prescription medication"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
