# MedFinder - Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### 1. "ModuleNotFoundError: No module named 'fastapi'"
**Problem:** Python dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

#### 2. "pytesseract.pytesseract.TesseractNotFoundError"
**Problem:** Tesseract OCR not installed

**Solution:**
- **Windows:** Download from https://github.com/UB-Mannheim/tesseract/wiki
  - Install to default location
  - Add to PATH: `C:\Program Files\Tesseract-OCR`
- **Mac:** `brew install tesseract`
- **Linux:** `sudo apt-get install tesseract-ocr`

#### 3. "Port 8000 already in use"
**Problem:** Another process using port 8000

**Solution:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

Or change port in main.py:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

#### 4. Database Connection Error
**Problem:** PostgreSQL not running or wrong credentials

**Solution:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- For demo, backend works without database (uses mock data)

### Frontend Issues

#### 1. "npm: command not found"
**Problem:** Node.js not installed

**Solution:**
- Download from https://nodejs.org/
- Install LTS version (18+)
- Restart terminal

#### 2. "Port 3000 already in use"
**Problem:** Another process using port 3000

**Solution:**
```bash
# Kill process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

#### 3. "Module not found: Can't resolve 'react-dropzone'"
**Problem:** Dependencies not installed

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS Error in Browser Console
**Problem:** Backend not allowing frontend origin

**Solution:**
- Ensure backend is running on port 8000
- Check CORS middleware in backend/main.py
- Verify API_URL in frontend code

### Mobile Issues

#### 1. "Expo CLI not found"
**Problem:** Expo not installed globally

**Solution:**
```bash
npm install -g expo-cli
# Or use npx
npx expo start
```

#### 2. "Unable to resolve module"
**Problem:** Dependencies not installed

**Solution:**
```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
```

#### 3. Camera Not Working
**Problem:** Permissions not granted

**Solution:**
- Check app permissions in phone settings
- Reinstall app
- Grant camera permissions when prompted

#### 4. "Network request failed"
**Problem:** Mobile app can't reach backend

**Solution:**
- Use your computer's IP address instead of localhost
- Update API_URL in App.tsx:
  ```typescript
  const API_URL = 'http://192.168.1.100:8000/api';
  ```
- Ensure phone and computer on same WiFi

### Docker Issues

#### 1. "docker: command not found"
**Problem:** Docker not installed

**Solution:**
- Download Docker Desktop from https://www.docker.com/
- Install and start Docker Desktop
- Restart terminal

#### 2. "Cannot connect to Docker daemon"
**Problem:** Docker Desktop not running

**Solution:**
- Start Docker Desktop application
- Wait for it to fully start (whale icon in system tray)

#### 3. "Port already allocated"
**Problem:** Ports 3000, 8000, 5432, or 6379 in use

**Solution:**
- Stop conflicting services
- Or modify ports in docker-compose.yml

### API Issues

#### 1. 404 Not Found
**Problem:** Wrong endpoint URL

**Solution:**
- Check API_DOCS.md for correct endpoints
- Verify base URL: http://localhost:8000/api
- Test with: http://localhost:8000/docs

#### 2. 500 Internal Server Error
**Problem:** Backend error

**Solution:**
- Check backend terminal for error logs
- Verify request body format
- Test with curl or Postman first

#### 3. Slow OCR Processing
**Problem:** Large image file

**Solution:**
- Compress images before upload
- Use manual entry for demos
- Optimize Tesseract settings

### Build Issues

#### 1. "npm run build" fails
**Problem:** TypeScript errors or missing dependencies

**Solution:**
```bash
# Fix TypeScript errors
npm run build 2>&1 | grep error

# Or disable strict mode temporarily
# In tsconfig.json: "strict": false
```

#### 2. Python Import Errors
**Problem:** Wrong Python version or virtual environment

**Solution:**
```bash
# Check Python version
python --version  # Should be 3.10+

# Create virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Performance Issues

### 1. Slow Page Load
**Solutions:**
- Enable production build: `npm run build && npm start`
- Use CDN for static assets
- Enable Redis caching
- Optimize images

### 2. High Memory Usage
**Solutions:**
- Limit concurrent requests
- Enable pagination
- Clear Redis cache periodically
- Optimize database queries

### 3. OCR Taking Too Long
**Solutions:**
- Reduce image size before processing
- Use faster OCR engine (Google ML Kit)
- Process asynchronously
- Show loading indicator

## Testing Issues

### 1. test_api.py Fails
**Problem:** Backend not running or wrong URL

**Solution:**
```bash
# Start backend first
cd backend
python main.py

# In new terminal, run tests
python test_api.py
```

### 2. Mock Data Not Loading
**Problem:** Database not initialized

**Solution:**
```bash
# Run schema.sql
psql medfinder < backend/schema.sql

# Or use mock data (already in main.py)
# No database needed for demo
```

## Environment Issues

### 1. Environment Variables Not Loading
**Problem:** .env file not found or wrong format

**Solution:**
```bash
# Copy example files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Edit with your values
# No quotes around values
# No spaces around =
```

### 2. API Keys Not Working
**Problem:** Invalid or missing API keys

**Solution:**
- For demo, API keys not required (uses mock data)
- For production:
  - Get RxNorm API key from https://rxnav.nlm.nih.gov/
  - Get Google Maps key from https://console.cloud.google.com/

## Demo Day Issues

### 1. Internet Connection Problems
**Backup Plan:**
- Use mock data (already implemented)
- Run everything locally
- Pre-record video demo

### 2. Screen Sharing Issues
**Solutions:**
- Test screen share before demo
- Close unnecessary applications
- Use presenter mode
- Have screenshots ready

### 3. Live Demo Fails
**Backup Plan:**
- Use manual entry (faster than OCR)
- Have pre-loaded results
- Show architecture diagrams
- Walk through code

## Quick Fixes

### Reset Everything
```bash
# Backend
cd backend
rm -rf __pycache__
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf .next node_modules
npm install

# Mobile
cd mobile
rm -rf node_modules
npm install
```

### Fresh Start
```bash
# Kill all processes
# Windows
taskkill /F /IM node.exe
taskkill /F /IM python.exe

# Mac/Linux
killall node
killall python

# Restart
cd backend && python main.py
cd frontend && npm run dev
cd mobile && npm start
```

## Getting Help

### Check Logs
- **Backend:** Terminal running `python main.py`
- **Frontend:** Terminal running `npm run dev`
- **Browser:** Developer Console (F12)

### Debug Mode
```python
# backend/main.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Useful Commands
```bash
# Check versions
python --version
node --version
npm --version

# Check ports
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Check processes
tasklist | findstr python
tasklist | findstr node
```

## Still Having Issues?

1. Check documentation:
   - README.md
   - API_DOCS.md
   - ARCHITECTURE.md

2. Review error messages carefully

3. Search error message online

4. Check GitHub issues (if available)

5. Contact support: support@medfinder.com

## Prevention Tips

- Always activate virtual environment (Python)
- Run `npm install` after pulling changes
- Keep dependencies updated
- Test before demo day
- Have backup plan ready
- Document custom changes

---

**Remember:** For hackathon demos, the mock data works perfectly without any external dependencies!
