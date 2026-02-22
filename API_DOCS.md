# MedFinder API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

Currently using mock authentication for demo. Production will use JWT tokens.

```
Authorization: Bearer <token>
```

## Endpoints

### 1. OCR & Drug Parsing

#### Extract Prescription (OCR)
```http
POST /api/ocr/extract
Content-Type: multipart/form-data

Body:
- file: image file (JPG, PNG, PDF)

Response:
{
  "success": true,
  "data": {
    "drug_name": "Lisinopril",
    "strength": "10mg",
    "dosage": "once daily",
    "raw_text": "...",
    "confidence": 0.85
  }
}
```

#### Parse Drug Information
```http
POST /api/drugs/parse
Content-Type: application/json

Body:
{
  "drug_name": "Lisinopril",
  "strength": "10mg",
  "dosage": "once daily"
}

Response:
{
  "success": true,
  "data": {
    "drug_name": "Lisinopril",
    "generic_name": "lisinopril",
    "brand_name": "Prinivil",
    "strength": "10mg",
    "dosage": "once daily",
    "rxnorm_id": "29046",
    "atc_code": "C09AA03",
    "safe_alternatives": ["enalapril", "ramipril"]
  }
}
```

### 2. Price Comparison

#### Compare Prices
```http
GET /api/prices/compare?drug_name=Lisinopril&generic=true&lat=40.7580&lng=-73.9855

Response:
{
  "success": true,
  "data": {
    "drug_name": "Lisinopril",
    "prices": [
      {
        "pharmacy_id": 1,
        "pharmacy_name": "CVS Pharmacy",
        "distance": 0.5,
        "brand_price": 54.25,
        "generic_price": 15.50,
        "savings_percent": 71.4,
        "stock_status": "in_stock",
        "open_now": true,
        "lat": 40.7580,
        "lng": -73.9855,
        "timestamp": "2024-01-20T10:30:00"
      }
    ]
  }
}
```

### 3. Pharmacy Services

#### Get Nearby Pharmacies
```http
GET /api/pharmacies/nearby?lat=40.7580&lng=-73.9855&radius=5.0

Response:
{
  "success": true,
  "data": {
    "pharmacies": [
      {
        "id": 1,
        "name": "CVS Pharmacy",
        "lat": 40.7580,
        "lng": -73.9855,
        "distance": 0.5,
        "open": true
      }
    ],
    "count": 4
  }
}
```

### 4. Insurance

#### Estimate Insurance Cost
```http
POST /api/insurance/estimate?drug_name=Lisinopril&insurer=Blue Cross&generic_price=15.50

Response:
{
  "success": true,
  "data": {
    "insurer": "Blue Cross",
    "copay": 10.00,
    "out_of_pocket": 5.50,
    "final_cost": 10.00,
    "savings_vs_brand": 38.75
  }
}
```

### 5. Stock Reporting

#### Report Stock Status
```http
POST /api/stock/report
Content-Type: application/json

Body:
{
  "pharmacy_id": 1,
  "drug_name": "Lisinopril",
  "in_stock": true
}

Response:
{
  "success": true,
  "message": "Stock status updated",
  "data": {
    "pharmacy_id": 1,
    "drug_name": "Lisinopril",
    "in_stock": true,
    "confidence": 0.75,
    "timestamp": "2024-01-20T10:30:00"
  }
}
```

### 6. Admin

#### Get Dashboard Statistics
```http
GET /api/admin/stats

Response:
{
  "success": true,
  "data": {
    "total_searches": 15847,
    "active_users": 3421,
    "pharmacy_partners": 127,
    "avg_savings": 67.3,
    "most_searched": [
      {
        "drug": "Lisinopril",
        "count": 2341
      }
    ]
  }
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "detail": "Detailed error information"
}
```

### Common Error Codes

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Data Formats

### Coordinates
- Latitude: decimal degrees (-90 to 90)
- Longitude: decimal degrees (-180 to 180)

### Prices
- Currency: USD
- Format: decimal with 2 places (e.g., 15.50)

### Timestamps
- Format: ISO 8601 (e.g., "2024-01-20T10:30:00")

## Testing

Use the provided test script:

```bash
cd backend
python test_api.py
```

Or use curl:

```bash
# Test health check
curl http://localhost:8000/

# Test drug parsing
curl -X POST http://localhost:8000/api/drugs/parse \
  -H "Content-Type: application/json" \
  -d '{"drug_name": "Lisinopril", "strength": "10mg"}'

# Test price comparison
curl "http://localhost:8000/api/prices/compare?drug_name=Lisinopril"
```

## Interactive Documentation

FastAPI provides automatic interactive documentation:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
