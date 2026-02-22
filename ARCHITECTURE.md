# MedFinder - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Users                                │
│  (Patients, Caregivers, Pharmacy Partners, Admins)          │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
    ┌────────▼────────┐              ┌───────▼────────┐
    │   Web App       │              │  Mobile App    │
    │   (Next.js)     │              │ (React Native) │
    └────────┬────────┘              └───────┬────────┘
             │                                │
             └────────────┬───────────────────┘
                          │
                  ┌───────▼────────┐
                  │   API Gateway   │
                  │   (FastAPI)     │
                  └───────┬────────┘
                          │
        ┏━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┓
        ┃                                   ┃
   ┌────▼─────┐                      ┌─────▼─────┐
   │PostgreSQL│                      │   Redis   │
   │ Database │                      │   Cache   │
   └──────────┘                      └───────────┘
        │
        │ External APIs
        ├─── RxNorm API (Drug normalization)
        ├─── OpenFDA API (Drug safety data)
        └─── Google Maps API (Navigation)
```

## Core Components

### 1. Backend API (FastAPI)

**Responsibilities:**
- OCR processing (Tesseract)
- Drug parsing and normalization
- Price aggregation
- Pharmacy location services
- Insurance estimation
- User authentication
- Admin analytics

**Key Endpoints:**
- `/api/ocr/extract` - Prescription OCR
- `/api/drugs/parse` - Drug normalization
- `/api/prices/compare` - Price comparison
- `/api/pharmacies/nearby` - Location search
- `/api/insurance/estimate` - Cost estimation
- `/api/stock/report` - Crowd-sourced stock updates
- `/api/admin/stats` - Analytics dashboard

**Technology:**
- FastAPI (async Python web framework)
- Pytesseract (OCR)
- Pydantic (data validation)
- PostgreSQL (primary database)
- Redis (caching layer)

### 2. Web Frontend (Next.js)

**Responsibilities:**
- Prescription upload interface
- Price comparison display
- Pharmacy map visualization
- Admin dashboard
- Responsive design

**Key Pages:**
- `/` - Home with upload
- `/admin` - Admin dashboard
- `/pharmacy` - Pharmacy partner portal (future)

**Technology:**
- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS
- React Dropzone (file upload)
- Leaflet/Google Maps (mapping)

### 3. Mobile App (React Native)

**Responsibilities:**
- Camera-based prescription scanning
- Real-time price comparison
- Turn-by-turn navigation
- Push notifications
- Offline mode

**Key Features:**
- Expo Camera integration
- Native navigation (Google/Apple Maps)
- Location services
- Image picker
- Offline data caching

**Technology:**
- React Native (Expo)
- Expo Camera
- Expo Location
- React Native Maps
- AsyncStorage (offline)

## Data Models

### Drug
```sql
- id: integer
- generic_name: string
- brand_name: string
- rxnorm_id: string
- atc_code: string
```

### Pharmacy
```sql
- id: integer
- name: string
- address: text
- lat: decimal
- lng: decimal
- phone: string
- hours: jsonb
```

### Price
```sql
- id: integer
- drug_id: foreign key
- pharmacy_id: foreign key
- generic_price: decimal
- brand_price: decimal
- timestamp: datetime
- source: string
```

### Search
```sql
- id: integer
- user_id: foreign key
- drug_name: string
- lat: decimal
- lng: decimal
- created_at: datetime
```

## Data Flow

### Prescription Upload Flow
```
1. User uploads image → Frontend
2. Frontend sends to /api/ocr/extract → Backend
3. Backend runs Tesseract OCR → Extracted text
4. Backend sends to /api/drugs/parse → Drug normalization
5. Backend queries RxNorm API → Generic mapping
6. Backend returns structured drug data → Frontend
7. Frontend displays editable fields → User confirms
```

### Price Comparison Flow
```
1. User confirms drug → Frontend
2. Frontend requests /api/prices/compare → Backend
3. Backend queries database for recent prices
4. Backend fetches from pharmacy APIs (if needed)
5. Backend applies caching (Redis, 1 hour TTL)
6. Backend sorts by price/distance → Sorted results
7. Frontend displays comparison table → User
8. User selects pharmacy → Navigation
```

### Stock Reporting Flow
```
1. User reports stock status → Frontend
2. Frontend posts to /api/stock/report → Backend
3. Backend calculates trust score (user history)
4. Backend updates confidence level in database
5. Backend returns updated status → Frontend
6. Frontend shows updated stock indicator
```

## Caching Strategy

**Redis Cache Layers:**
- Drug lookups: 24 hours
- Price data: 1 hour
- Pharmacy locations: 7 days
- User sessions: 30 days

**Cache Keys:**
```
drug:{drug_name} → Drug details
prices:{drug_id}:{lat}:{lng} → Price comparison
pharmacy:{pharmacy_id} → Pharmacy details
user:{user_id}:session → User session
```

## Security

**Authentication:**
- Firebase Auth for user management
- JWT tokens for API authentication
- Role-based access control (RBAC)

**Data Protection:**
- HTTPS/TLS encryption in transit
- AES-256 encryption at rest
- No long-term prescription image storage
- PII anonymization in logs

**API Security:**
- Rate limiting (100 req/min per IP)
- Input validation (Pydantic)
- SQL injection prevention (parameterized queries)
- CORS configuration

## Scalability

**Horizontal Scaling:**
- Stateless API servers (load balanced)
- Database read replicas
- Redis cluster for distributed caching
- CDN for static assets

**Performance Optimizations:**
- Database indexing on frequently queried fields
- Lazy loading for images
- API response pagination
- Gzip compression

**Monitoring:**
- Application logs (structured JSON)
- Error tracking (Sentry)
- Performance metrics (Prometheus)
- Uptime monitoring (Pingdom)

## Deployment

**Production Stack:**
- Frontend: Vercel (auto-scaling, CDN)
- Backend: Railway/AWS ECS (containerized)
- Database: AWS RDS PostgreSQL
- Cache: AWS ElastiCache Redis
- Mobile: Expo EAS (build service)

**CI/CD Pipeline:**
```
1. Git push → GitHub
2. GitHub Actions triggers
3. Run tests (pytest, jest)
4. Build Docker images
5. Deploy to staging
6. Run integration tests
7. Deploy to production
8. Health check verification
```

## Future Enhancements

**Phase 2:**
- Real-time pharmacy API integrations
- Advanced OCR with ML Kit
- Prescription refill reminders
- Multi-language support

**Phase 3:**
- AI drug interaction warnings
- Telemedicine integration
- Pharmacy rewards program
- Voice search capability

**Phase 4:**
- International expansion
- Blockchain for prescription verification
- Predictive pricing analytics
- White-label solutions for hospitals
