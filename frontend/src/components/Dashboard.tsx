'use client';

import { useState } from 'react';
import FinancialChart from './FinancialChart';
import FinancialTrends from './FinancialTrends';
import RealTimeAlerts from './RealTimeAlerts';
import SecurityPerformance from './SecurityPerformance';
import DivisionPerformance from './DivisionPerformance';
import EmployeeDistribution from './EmployeeDistribution';
import RDPortfolio from './RDPortfolio';
import AIInsights from './AIInsights';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              ⚡
            </div>
            <div className="logo-text">
              <h1>Wayne Enterprises</h1>
              <p>Executive Dashboard</p>
            </div>
          </div>
          <div className="status-indicator">
            <div className="status-dot pulse"></div>
            <span>Live Data</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`nav-tab ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveTab('financial')}
            >
              💰 Financial
            </button>
            <button 
              className={`nav-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              🛡️ Security
            </button>
            <button 
              className={`nav-tab ${activeTab === 'people' ? 'active' : ''}`}
              onClick={() => setActiveTab('people')}
            >
              👥 People
            </button>
            <button 
              className={`nav-tab ${activeTab === 'rd' ? 'active' : ''}`}
              onClick={() => setActiveTab('rd')}
            >
              🔬 R&D
            </button>
            <button 
              className={`nav-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              🧠 AI Insights
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* Executive Summary */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2>Executive Summary</h2>
            <div className="status-indicator">
              <div className="status-dot pulse"></div>
              <span>Live Data</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4">
            {/* Revenue Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">💰</div>
                <div className="metric-trend up">
                  ↗️ +12.5%
                </div>
              </div>
              <div className="metric-title">Total Revenue</div>
              <div className="metric-value">$30,460M</div>
              <div className="metric-subtitle">2024 Annual</div>
            </div>

            {/* Profit Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">📈</div>
                <div className="metric-trend up">
                  ↗️ +8.3%
                </div>
              </div>
              <div className="metric-title">Net Profit</div>
              <div className="metric-value">$7,746M</div>
              <div className="metric-subtitle">25.4% Margin</div>
            </div>

            {/* Employee Retention Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">👥</div>
                <div className="metric-trend up">
                  ↗️ +2.1%
                </div>
              </div>
              <div className="metric-title">Employee Retention</div>
              <div className="metric-value">97.6%</div>
              <div className="metric-subtitle">Company Average</div>
            </div>

            {/* Satisfaction Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">❤️</div>
                <div className="metric-trend up">
                  ↗️ +0.5
                </div>
              </div>
              <div className="metric-title">Employee Satisfaction</div>
              <div className="metric-value">9.3/10</div>
              <div className="metric-subtitle">Satisfaction Score</div>
            </div>

            {/* R&D Projects Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">🔬</div>
                <div className="metric-trend up">
                  ↗️ +15%
                </div>
              </div>
              <div className="metric-title">Active R&D Projects</div>
              <div className="metric-value">67</div>
              <div className="metric-subtitle">44.6% Budget Used</div>
            </div>

            {/* Safety Score Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">🛡️</div>
                <div className="metric-trend up">
                  ↗️ +1.2
                </div>
              </div>
              <div className="metric-title">Public Safety Score</div>
              <div className="metric-value">9/10</div>
              <div className="metric-subtitle">Gotham Average</div>
            </div>

            {/* Response Time Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">⏱️</div>
                <div className="metric-trend down">
                  ↘️ -15%
                </div>
              </div>
              <div className="metric-title">Response Time</div>
              <div className="metric-value">2.2min</div>
              <div className="metric-subtitle">Average Response</div>
            </div>

            {/* Placeholder Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon">⚡</div>
                <div className="metric-trend up">
                  ↗️ +10.5%
                </div>
              </div>
              <div className="metric-title">System Performance</div>
              <div className="metric-value">98.7%</div>
              <div className="metric-subtitle">Uptime</div>
            </div>
          </div>
        </div>

        {/* Additional Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="card">
            <RealTimeAlerts />
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="card">
            <FinancialTrends />
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card">
            <SecurityPerformance />
          </div>
        )}

        {activeTab === 'people' && (
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div className="card" style={{ flex: '1' }}>
              <DivisionPerformance />
            </div>
            <div className="card" style={{ flex: '1' }}>
              <EmployeeDistribution />
            </div>
          </div>
        )}

        {activeTab === 'rd' && (
          <div className="card">
            <RDPortfolio />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="card">
            <AIInsights />
          </div>
        )}
      </main>
    </div>
  );
}
