# Wayne Enterprises Business Intelligence Dashboard

A full-stack business intelligence dashboard built with FastAPI backend and Next.js frontend, showcasing key insights from Wayne Enterprises' company data. Please find the link to a demo video here: [link]([url](https://drive.google.com/file/d/1pE_aKn48Q3FWof8PY-9-CHKbs43T_QvO/view?usp=sharing))

## 🚀 Project Overview

This project demonstrates a comprehensive BI dashboard that processes multiple datasets and presents actionable insights through interactive visualizations. The application includes:

- **Executive Summary**: Key performance metrics at a glance
- **Financial Trends**: Quarterly revenue, profit, and R&D investment tracking
- **Division Performance**: Comparative analysis across business units
- **Employee Analytics**: Distribution and engagement metrics
- **Security Performance**: Gotham City safety metrics by district
- **R&D Portfolio**: Research project analysis and budget utilization
- **News Narrative**: Compelling data storytelling in newspaper format

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI 0.111.0
- **Data Processing**: Pandas, NumPy
- **API Endpoints**: RESTful APIs for all dashboard components
- **Data Sources**: CSV files for financial, HR, R&D, and security data

### Frontend (Next.js)
- **Framework**: Next.js 15.3.5 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Components**: Modular React components for each dashboard section

## � Project Structure

```
wayne/
├── data/                          # Data files
│   ├── wayne_financial_data.csv   # Financial performance (40 records)
│   ├── wayne_hr_analytics.csv     # HR analytics (217 records)
│   ├── wayne_rd_portfolio.csv     # R&D portfolio (76 records)
│   └── wayne_security_data.csv    # Security data (109 records)
├── backend/                       # FastAPI backend
│   ├── main.py                    # Main API server
│   ├── requirements.txt           # Python dependencies
│   └── websocket_manager.py       # WebSocket handling
├── frontend/                      # Next.js frontend
│   ├── src/
│   │   ├── app/                   # App router pages
│   │   ├── components/            # React components
│   │   ├── contexts/              # React contexts
│   │   └── hooks/                 # Custom hooks
│   ├── public/                    # Static assets
│   ├── package.json               # Node dependencies
│   └── *.config.*                 # Configuration files
├── package.json                   # Root package.json
├── start.bat                      # Windows startup script
├── start.sh                       # Unix startup script
└── README.md                      # Project documentation
```

## �📊 Datasets

1. **Financial Performance** (40 records): Quarterly data across 5 divisions (2023-2024)
2. **HR Analytics** (217 records): Employee metrics across departments and levels
3. **R&D Portfolio** (76 records): Active research projects and budget utilization
4. **Security Data** (109 records): Gotham City security metrics by district

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn pandas numpy python-multipart pydantic
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📈 Key Features

### Executive Dashboard
- Real-time KPI cards showing critical business metrics
- Revenue, profit margins, employee satisfaction scores
- R&D project counts and budget utilization
- Public safety performance indicators

### Interactive Visualizations
- **Line Charts**: Financial trends over time
- **Bar Charts**: Division performance comparisons
- **Pie Charts**: Employee distribution analysis
- **Radar Charts**: Security performance by district
- **Mixed Charts**: R&D portfolio analysis

### Data Storytelling
- Newspaper-style narrative highlighting key business insights
- Supporting visualizations that reinforce the story
- Professional presentation suitable for executive audiences

## 🎯 Business Insights Delivered

1. **Financial Performance**: Clear visibility into revenue growth and profitability trends
2. **Operational Excellence**: Security improvements showing measurable community impact
3. **Human Capital**: Employee retention and satisfaction metrics
4. **Innovation Pipeline**: R&D investment effectiveness and commercialization potential
5. **Strategic Planning**: Data-driven insights for executive decision making

## 🔧 Technical Implementation

### Backend API Endpoints
- `/api/executive-summary`: Key performance indicators
- `/api/financial-trends`: Quarterly financial data
- `/api/division-performance`: Business unit metrics
- `/api/employee-distribution`: HR analytics
- `/api/security-performance`: Safety and security data
- `/api/rd-portfolio`: Research and development analysis
- `/api/narrative-data`: Story-driven insights

### Frontend Components
- `Dashboard.tsx`: Main container with error handling
- `ExecutiveSummary.tsx`: KPI cards display
- `FinancialTrends.tsx`: Line chart for financial data
- `DivisionPerformance.tsx`: Interactive bar charts
- `EmployeeDistribution.tsx`: Pie charts with view switching
- `SecurityPerformance.tsx`: Radar chart for district comparison
- `RDPortfolio.tsx`: Multi-chart R&D analysis
- `NewsNarrative.tsx`: Newspaper-style data storytelling

## 📋 Future Enhancements

- Real-time data streaming
- Advanced filtering and drill-down capabilities
- Export functionality for reports
- Mobile-responsive optimizations
- Additional visualization types
- User authentication and role-based access

## 🏆 Success Metrics

The dashboard successfully demonstrates:
- ✅ Full-stack development proficiency
- ✅ Data visualization expertise
- ✅ Professional UI/UX design
- ✅ Clear business insight communication
- ✅ Rapid prototyping under time constraints

---

**Built for Wayne Enterprises CEO Executive Review**
*Demonstrating technical excellence in business intelligence solutions*
