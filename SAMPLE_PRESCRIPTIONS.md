# Sample Prescription Data for Testing

## Test Prescriptions

### 1. Lisinopril (Blood Pressure)
```
Patient: John Doe
Date: 2024-01-15

Rx: Lisinopril 10mg
Sig: Take 1 tablet by mouth once daily
Qty: 30 tablets
Refills: 3

Dr. Sarah Johnson, MD
License: MD12345
```

### 2. Atorvastatin (Cholesterol)
```
Patient: Jane Smith
Date: 2024-01-16

Rx: Atorvastatin 20mg
Sig: Take 1 tablet by mouth once daily at bedtime
Qty: 90 tablets
Refills: 5

Dr. Michael Chen, MD
License: MD67890
```

### 3. Metformin (Diabetes)
```
Patient: Robert Williams
Date: 2024-01-17

Rx: Metformin 500mg
Sig: Take 1 tablet by mouth twice daily with meals
Qty: 60 tablets
Refills: 6

Dr. Emily Rodriguez, MD
License: MD11223
```

### 4. Amlodipine (Blood Pressure)
```
Patient: Maria Garcia
Date: 2024-01-18

Rx: Amlodipine 5mg
Sig: Take 1 tablet by mouth once daily
Qty: 30 tablets
Refills: 3

Dr. David Lee, MD
License: MD44556
```

### 5. Omeprazole (Acid Reflux)
```
Patient: James Brown
Date: 2024-01-19

Rx: Omeprazole 20mg
Sig: Take 1 capsule by mouth once daily before breakfast
Qty: 30 capsules
Refills: 2

Dr. Lisa Anderson, MD
License: MD77889
```

## Expected OCR Results

### Lisinopril
- Drug Name: "Lisinopril"
- Strength: "10mg"
- Dosage: "once daily"
- Confidence: 0.85+

### Atorvastatin
- Drug Name: "Atorvastatin"
- Strength: "20mg"
- Dosage: "once daily at bedtime"
- Confidence: 0.85+

## Mock Price Ranges (for testing)

| Drug | Generic Price Range | Brand Price Range | Avg Savings |
|------|-------------------|------------------|-------------|
| Lisinopril | $10-25 | $45-65 | 65% |
| Atorvastatin | $15-35 | $80-120 | 70% |
| Metformin | $8-20 | $40-60 | 68% |
| Amlodipine | $12-28 | $50-75 | 62% |
| Omeprazole | $10-22 | $55-85 | 72% |

## Testing Instructions

1. Use manual entry for fastest testing
2. Copy drug names from above
3. Expected response time: < 2 seconds
4. Verify price comparison shows 4 pharmacies
5. Check that lowest price is highlighted
6. Confirm navigation button works

## Demo Tips

- Use "Lisinopril 10mg" for best demo (highest savings %)
- Show manual entry first (faster than OCR)
- Point out generic vs brand price difference
- Demonstrate sorting by price vs distance
- Show stock availability indicators
