@echo off
echo 🚀 Starting Wayne Enterprises BI Dashboard...
echo.

echo 📊 Starting FastAPI Backend (Port 8000)...
cd backend
start cmd /k "uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 🎨 Starting Next.js Frontend (Port 3000)...
cd ..\frontend
start cmd /k "npm run dev"

echo.
echo 🎉 Wayne Enterprises Dashboard is starting!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📖 API Docs: http://localhost:8000/docs
echo.
echo Press any key to continue...
pause > nul
