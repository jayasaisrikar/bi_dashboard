from fastapi import WebSocket, WebSocketDisconnect
import asyncio
import json
import random
from datetime import datetime
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Connection might be closed
                pass

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Send real-time updates every 5 seconds
            await asyncio.sleep(5)
            
            # Simulate real-time security data
            security_update = {
                "type": "security_update",
                "timestamp": datetime.now().isoformat(),
                "district": random.choice(["Downtown", "East End", "Park Row", "The Narrows", "Bristol", "Diamond District"]),
                "incident_count": random.randint(0, 5),
                "response_time": round(random.uniform(2.0, 6.0), 1),
                "safety_score": round(random.uniform(6.0, 9.5), 1)
            }
            
            await manager.send_personal_message(json.dumps(security_update), websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/realtime-alerts")
async def get_realtime_alerts():
    """Get current real-time alerts for the dashboard"""
    alerts = [
        {
            "id": "alert_001",
            "type": "security",
            "severity": "medium",
            "title": "Increased Activity in The Narrows",
            "description": "Security incidents up 15% in the last hour",
            "timestamp": datetime.now().isoformat(),
            "action_required": True
        },
        {
            "id": "alert_002", 
            "type": "financial",
            "severity": "low",
            "title": "R&D Budget Milestone Reached",
            "description": "Aerospace division has reached 75% budget utilization",
            "timestamp": datetime.now().isoformat(),
            "action_required": False
        }
    ]
    return {"alerts": alerts}
