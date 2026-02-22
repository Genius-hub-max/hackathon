@echo off
echo ========================================
echo   MedFinder - GitHub Upload Script
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Adding all files...
git add .
echo.

echo Step 3: Creating initial commit...
git commit -m "Initial commit: MedFinder - Prescription Price Comparison Platform with AI predictions, price alerts, and savings tracker"
echo.

echo Step 4: Adding remote repository...
git remote add origin https://github.com/bluewolf1914/hackathon.git
echo.

echo Step 5: Setting main branch...
git branch -M main
echo.

echo Step 6: Pushing to GitHub...
echo NOTE: You may be prompted for credentials
echo Username: bluewolf1914
echo Password: Use your GitHub Personal Access Token
echo.
git push -u origin main
echo.

echo ========================================
echo   Upload Complete!
echo ========================================
echo.
echo Your repository is now live at:
echo https://github.com/bluewolf1914/hackathon
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add description and topics in About section
echo 3. Verify all files are uploaded
echo.
pause
