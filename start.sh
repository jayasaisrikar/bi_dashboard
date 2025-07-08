#!/bin/bash

echo "🚀 Starting Wayne Enterprises BI Dashboard..."
echo ""

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Start Backend
echo "📊 Starting FastAPI Backend (Port 8000)..."
cd backend
if check_port 8000; then
    uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
else
    echo "❌ Backend port 8000 is already in use"
    exit 1
fi

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo ""
echo "🎨 Starting Next.js Frontend (Port 3000)..."
cd ../frontend
if check_port 3000; then
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend started with PID: $FRONTEND_PID"
else
    echo "❌ Frontend port 3000 is already in use"
    kill $BACKEND_PID
    exit 1
fi

echo ""
echo "🎉 Wayne Enterprises Dashboard is ready!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping services..."; kill $BACKEND_PID $FRONTEND_PID; exit 0' INT
wait
