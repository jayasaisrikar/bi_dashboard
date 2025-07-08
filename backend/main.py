from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from typing import Dict, List, Any
from datetime import datetime
import os
import asyncio
import json
import random

app = FastAPI(title="Wayne Enterprises Business Intelligence API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store data
financial_data = None
hr_data = None
rd_data = None
security_data = None

def load_data():
    """Load all CSV files"""
    global financial_data, hr_data, rd_data, security_data
    
    base_path = os.path.join(os.path.dirname(__file__), "..", "data")
    
    try:
        financial_data = pd.read_csv(os.path.join(base_path, "wayne_financial_data.csv"))
        hr_data = pd.read_csv(os.path.join(base_path, "wayne_hr_analytics.csv"))
        rd_data = pd.read_csv(os.path.join(base_path, "wayne_rd_portfolio.csv"))
        security_data = pd.read_csv(os.path.join(base_path, "wayne_security_data.csv"))
        
        # Convert date columns
        hr_data['Date'] = pd.to_datetime(hr_data['Date'])
        security_data['Date'] = pd.to_datetime(security_data['Date'])
        rd_data['Start_Date'] = pd.to_datetime(rd_data['Start_Date'])
        
        print("Data loaded successfully")
    except Exception as e:
        print(f"Error loading data: {e}")

# Load data on startup
load_data()

@app.get("/")
async def root():
    return {"message": "Wayne Enterprises Business Intelligence API"}

@app.get("/api/executive-summary")
async def get_executive_summary():
    """Get key executive metrics"""
    try:
        # Financial metrics
        latest_financial = financial_data[financial_data['Year'] == 2024]
        total_revenue = latest_financial['Revenue_M'].sum()
        total_profit = latest_financial['Net_Profit_M'].sum()
        profit_margin = (total_profit / total_revenue) * 100 if total_revenue > 0 else 0
        
        # Employee metrics
        latest_hr = hr_data[hr_data['Date'] >= '2024-01-01']
        avg_retention = latest_hr['Retention_Rate_Pct'].mean()
        avg_satisfaction = latest_hr['Employee_Satisfaction_Score'].mean()
        
        # R&D metrics
        active_projects = len(rd_data[rd_data['Status'] == 'Active'])
        total_allocated = rd_data['Budget_Allocated_M'].sum()
        total_spent = rd_data['Budget_Spent_M'].sum()
        rd_budget_utilization = (total_spent / total_allocated) * 100 if total_allocated > 0 else 0
        
        # Security metrics
        latest_security = security_data[security_data['Date'] >= '2024-01-01']
        avg_safety_score = latest_security['Public_Safety_Score'].mean()
        avg_response_time = latest_security['Response_Time_Minutes'].mean()
        
        # Handle NaN values
        def safe_round(value, decimals=1):
            return round(float(value), decimals) if not np.isnan(value) else 0.0
        
        return {
            "total_revenue": safe_round(total_revenue),
            "total_profit": safe_round(total_profit),
            "profit_margin": safe_round(profit_margin),
            "employee_retention": safe_round(avg_retention),
            "employee_satisfaction": safe_round(avg_satisfaction),
            "active_projects": active_projects,
            "rd_budget_utilization": safe_round(rd_budget_utilization),
            "public_safety_score": safe_round(avg_safety_score),
            "avg_response_time": safe_round(avg_response_time)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/financial-trends")
async def get_financial_trends():
    """Get quarterly financial trends"""
    try:
        # Group by quarter and year
        financial_data['Quarter_Year'] = financial_data['Quarter'] + ' ' + financial_data['Year'].astype(str)
        
        quarterly_totals = financial_data.groupby('Quarter_Year').agg({
            'Revenue_M': 'sum',
            'Net_Profit_M': 'sum',
            'RD_Investment_M': 'sum'
        }).reset_index()
        
        # Sort by year and quarter
        quarter_order = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024']
        quarterly_totals['Quarter_Year'] = pd.Categorical(quarterly_totals['Quarter_Year'], categories=quarter_order, ordered=True)
        quarterly_totals = quarterly_totals.sort_values('Quarter_Year')
        
        return {
            "quarters": quarterly_totals['Quarter_Year'].astype(str).tolist(),
            "revenue": quarterly_totals['Revenue_M'].round(1).tolist(),
            "profit": quarterly_totals['Net_Profit_M'].round(1).tolist(),
            "rd_investment": quarterly_totals['RD_Investment_M'].round(1).tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/division-performance")
async def get_division_performance():
    """Get division performance metrics"""
    try:
        # Get 2024 data
        recent_data = financial_data[financial_data['Year'] == 2024]
        
        division_metrics = recent_data.groupby('Division').agg({
            'Revenue_M': 'sum',
            'Net_Profit_M': 'sum',
            'Market_Share_Pct': 'mean',
            'Customer_Satisfaction_Score': 'mean'
        }).reset_index()
        
        # Calculate profit margin with NaN handling
        division_metrics['Profit_Margin'] = np.where(
            division_metrics['Revenue_M'] > 0,
            (division_metrics['Net_Profit_M'] / division_metrics['Revenue_M']) * 100,
            0
        )
        
        # Replace any remaining NaN values with 0
        division_metrics = division_metrics.fillna(0)
        
        return {
            "divisions": division_metrics['Division'].tolist(),
            "revenue": division_metrics['Revenue_M'].round(1).tolist(),
            "profit": division_metrics['Net_Profit_M'].round(1).tolist(),
            "profit_margin": division_metrics['Profit_Margin'].round(1).tolist(),
            "market_share": division_metrics['Market_Share_Pct'].round(1).tolist(),
            "customer_satisfaction": division_metrics['Customer_Satisfaction_Score'].round(1).tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/employee-distribution")
async def get_employee_distribution():
    """Get employee distribution by department and level"""
    try:
        # Get latest data (2024)
        latest_hr = hr_data[hr_data['Date'] >= '2024-01-01']
        
        # Department distribution
        dept_counts = latest_hr.groupby('Department').size().reset_index(name='count')
        
        # Level distribution
        level_counts = latest_hr.groupby('Employee_Level').size().reset_index(name='count')
        
        return {
            "departments": {
                "labels": dept_counts['Department'].tolist(),
                "values": dept_counts['count'].tolist()
            },
            "levels": {
                "labels": level_counts['Employee_Level'].tolist(),
                "values": level_counts['count'].tolist()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/security-performance")
async def get_security_performance():
    """Get security performance by district"""
    try:
        # Get recent data (2024)
        recent_security = security_data[security_data['Date'] >= '2024-01-01']
        
        district_metrics = recent_security.groupby('District').agg({
            'Security_Incidents': 'sum',
            'Response_Time_Minutes': 'mean',
            'Public_Safety_Score': 'mean',
            'Crime_Prevention_Effectiveness_Pct': 'mean'
        }).reset_index()
        
        return {
            "districts": district_metrics['District'].tolist(),
            "incidents": district_metrics['Security_Incidents'].tolist(),
            "response_time": district_metrics['Response_Time_Minutes'].round(1).tolist(),
            "safety_score": district_metrics['Public_Safety_Score'].round(1).tolist(),
            "prevention_effectiveness": district_metrics['Crime_Prevention_Effectiveness_Pct'].round(1).tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/rd-portfolio")
async def get_rd_portfolio():
    """Get R&D portfolio analysis"""
    try:
        # Active projects by division
        division_projects = rd_data[rd_data['Status'] == 'Active'].groupby('Division').size().reset_index(name='count')
        
        # Budget utilization by category
        category_budget = rd_data.groupby('Research_Category').agg({
            'Budget_Allocated_M': 'sum',
            'Budget_Spent_M': 'sum'
        }).reset_index()
        category_budget['Utilization_Pct'] = (category_budget['Budget_Spent_M'] / category_budget['Budget_Allocated_M']) * 100
        
        # Commercialization potential
        commercialization = rd_data.groupby('Commercialization_Potential').size().reset_index(name='count')
        
        return {
            "division_projects": {
                "labels": division_projects['Division'].tolist(),
                "values": division_projects['count'].tolist()
            },
            "budget_utilization": {
                "categories": category_budget['Research_Category'].tolist(),
                "allocated": category_budget['Budget_Allocated_M'].round(1).tolist(),
                "spent": category_budget['Budget_Spent_M'].round(1).tolist(),
                "utilization": category_budget['Utilization_Pct'].round(1).tolist()
            },
            "commercialization": {
                "labels": commercialization['Commercialization_Potential'].tolist(),
                "values": commercialization['count'].tolist()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/narrative-data")
async def get_narrative_data():
    """Get data for compelling narrative"""
    try:
        # Security improvement story
        security_trends = security_data.groupby('Date').agg({
            'Security_Incidents': 'sum',
            'Crime_Prevention_Effectiveness_Pct': 'mean'
        }).reset_index()
        
        # Calculate improvement
        early_2023 = security_trends[security_trends['Date'] < '2023-07-01']['Crime_Prevention_Effectiveness_Pct'].mean()
        late_2024 = security_trends[security_trends['Date'] >= '2024-01-01']['Crime_Prevention_Effectiveness_Pct'].mean()
        improvement = late_2024 - early_2023
        
        # Get quarterly incident reduction
        quarterly_incidents = security_data.copy()
        quarterly_incidents['Quarter'] = quarterly_incidents['Date'].dt.to_period('Q')
        quarterly_summary = quarterly_incidents.groupby('Quarter')['Security_Incidents'].sum().reset_index()
        
        return {
            "headline": "Wayne Enterprises Security Initiative Reduces Gotham Crime by 15%",
            "improvement_percentage": round(improvement, 1),
            "quarterly_incidents": {
                "quarters": [str(q) for q in quarterly_summary['Quarter'].tolist()],
                "incidents": quarterly_summary['Security_Incidents'].tolist()
            },
            "key_districts": ["Bristol", "Park Row", "Downtown"],
            "investment_impact": "Strategic deployment of Wayne Tech solutions has resulted in measurable improvements in public safety across all districts."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@app.websocket("/ws/security-updates")
async def security_updates_websocket(websocket: WebSocket):
    """WebSocket endpoint for real-time security updates"""
    await manager.connect(websocket)
    try:
        while True:
            # Simulate real-time data push
            await asyncio.sleep(5)
            
            # For demo, sending random improvement percentage
            improvement_pct = random.uniform(10, 20)
            message = json.dumps({
                "headline": "Wayne Enterprises Security Initiative Update",
                "improvement_percentage": round(improvement_pct, 1),
                "key_districts": ["Bristol", "Park Row", "Downtown"],
                "investment_impact": "Continued investment in Wayne Tech solutions is enhancing public safety."
            })
            await manager.broadcast(message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Error in WebSocket connection: {e}")
        manager.disconnect(websocket)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(5)
            
            # Real-time security updates
            security_update = {
                "type": "security_update",
                "timestamp": datetime.now().isoformat(),
                "district": random.choice(["Downtown", "East End", "Park Row", "The Narrows", "Bristol", "Diamond District"]),
                "incident_count": random.randint(0, 5),
                "response_time": round(random.uniform(2.0, 6.0), 1),
                "safety_score": round(random.uniform(6.0, 9.5), 1)
            }
            
            await websocket.send_text(json.dumps(security_update))
            
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
        }
    ]
    return {"alerts": alerts}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
