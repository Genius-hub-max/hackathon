# 🔐 MedFinder Login Credentials

## Demo Accounts

### 1. User Account (Regular Patient)
```
Email: demo@medfinder.com
Password: demo123
```
**Use for:** Testing prescription upload, price comparison, navigation

### 2. Admin Account (Dashboard Access)
```
Email: admin@medfinder.com
Password: admin123
```
**Use for:** Viewing analytics, pharmacy management, statistics

### 3. Alternative User Account
```
Email: user@medfinder.com
Password: user123
```
**Use for:** Additional testing

## How to Test

### Step 1: Login
1. Go to `http://localhost:3000/login`
2. Enter credentials (use demo@medfinder.com / demo123)
3. Click "Sign In"
4. You'll be redirected to `/app`

### Step 2: Test Price Comparison
1. Click "Or enter drug details manually →"
2. Enter:
   - Drug Name: **Lisinopril**
   - Strength: **10mg**
   - Dosage: **Once daily**
3. Click "Find Prices"
4. Enter location: **Bangalore**
5. Click "Find Pharmacies"
6. See 5 pharmacies with prices from ₹95 to ₹320
7. Savings shown in rupees (e.g., "Save ₹225")

### Step 3: Test Navigation
1. Click "Navigate to Pharmacy →" on any pharmacy
2. Google Maps opens with directions

### Step 4: Test Admin Dashboard
1. Logout from current account
2. Login with admin@medfinder.com / admin123
3. Go to `http://localhost:3000/admin`
4. View statistics and analytics

## Features to Test

### ✅ Authentication
- [x] Login page with validation
- [x] Signup page (creates account instantly)
- [x] Logout functionality
- [x] Protected routes (redirects to login if not authenticated)

### ✅ Price Comparison
- [x] Location-based search (26 pharmacies across 6 cities)
- [x] Savings shown in rupees (not percentage)
- [x] City and area display
- [x] Stock availability
- [x] Open/closed status

### ✅ Cities Available
- Delhi (5 pharmacies)
- Mumbai (5 pharmacies)
- Bangalore (5 pharmacies)
- Hyderabad (4 pharmacies)
- Chennai (4 pharmacies)
- Pune (3 pharmacies)

### ✅ Test Locations
Try searching for:
- "Delhi" → Shows 5 pharmacies (₹95-₹305)
- "Bangalore" → Shows 5 pharmacies (₹95-₹320)
- "Mumbai" → Shows 5 pharmacies (₹186-₹321)
- "Koramangala" → Shows pharmacy in that area
- "Andheri" → Shows pharmacy in that area

## Quick Test Checklist

```
□ Visit http://localhost:3000
□ Click "Sign In"
□ Login with demo@medfinder.com / demo123
□ Enter drug: Lisinopril
□ Enter location: Bangalore
□ See 5 pharmacies with prices
□ Verify savings shown in ₹ (e.g., "Save ₹225")
□ Click Navigate → Google Maps opens
□ Logout
□ Login with admin@medfinder.com / admin123
□ Visit /admin → See dashboard
```

## Troubleshooting

### "Redirecting to login"
- This is correct! App requires authentication
- Use demo@medfinder.com / demo123

### "Invalid email or password"
- Check spelling: demo@medfinder.com (not Demo or DEMO)
- Password is case-sensitive: demo123 (lowercase)

### "No pharmacies found"
- Try different location: Delhi, Mumbai, Bangalore
- Check backend is running on port 8000

### Backend not running
```bash
cd backend
python main.py
```

### Frontend not running
```bash
cd frontend
npm run dev
```

## Demo Flow for Judges

1. **Show Login** (10 seconds)
   - "Users sign in to access the platform"
   - Login with demo@medfinder.com / demo123

2. **Upload Prescription** (20 seconds)
   - "Enter drug details manually or scan"
   - Enter: Lisinopril 10mg

3. **Enter Location** (10 seconds)
   - "Search by city or area"
   - Enter: Bangalore

4. **Show Results** (30 seconds)
   - "5 pharmacies found"
   - "Prices from ₹95 to ₹320"
   - "Save ₹225 with cheapest option"
   - Click Navigate

5. **Show Admin** (20 seconds)
   - Logout and login as admin
   - Show dashboard with analytics

**Total: 90 seconds** ✅

## Security Note

These are demo credentials for hackathon presentation only.
In production, use proper authentication with:
- Password hashing (bcrypt)
- JWT tokens
- Email verification
- 2FA for admin accounts

---

**All credentials are visible on the login page for easy testing!**
