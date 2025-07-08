'use client';

import { useState, useEffect } from 'react';

interface DivisionPerformanceData {
  divisions: string[];
  revenue: number[];
  profit: number[];
  profit_margin: number[];
  market_share: number[];
  customer_satisfaction: number[];
}

export default function DivisionPerformance() {
  const [data, setData] = useState<DivisionPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'revenue' | 'profit' | 'margin'>('revenue');

  useEffect(() => {
    // Sample data for demonstration
    const sampleData: DivisionPerformanceData = {
      divisions: ['Technology', 'Applied Sciences', 'Aerospace', 'Defense', 'Biotech'],
      revenue: [8500, 6200, 5800, 4900, 3100],
      profit: [2100, 1500, 1200, 980, 620],
      profit_margin: [24.7, 24.2, 20.7, 20.0, 20.0],
      market_share: [35, 28, 22, 18, 12],
      customer_satisfaction: [9.2, 8.8, 8.5, 8.7, 9.0]
    };

    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Division Performance
        </h2>
        <div style={{ 
          height: '200px', 
          background: '#f3f4f6', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280'
        }}>
          Loading performance data...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Division Performance
        </h2>
        <p style={{ color: '#6b7280' }}>Failed to load data</p>
      </div>
    );
  }

  const getButtonStyle = (buttonView: string, isActive: boolean) => {
    let baseColor = '#e5e7eb';
    let activeColor = '#3b82f6';
    
    if (buttonView === 'profit') {
      activeColor = '#10b981';
    } else if (buttonView === 'margin') {
      activeColor = '#8b5cf6';
    }

    return {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      background: isActive ? activeColor : baseColor,
      color: isActive ? '#ffffff' : '#374151'
    };
  };

  const getCurrentData = () => {
    switch (view) {
      case 'revenue':
        return data.revenue;
      case 'profit':
        return data.profit;
      case 'margin':
        return data.profit_margin;
      default:
        return data.revenue;
    }
  };

  const getMaxValue = () => {
    const currentData = getCurrentData();
    return Math.max(...currentData);
  };

  const getUnit = () => {
    switch (view) {
      case 'revenue':
        return '$M';
      case 'profit':
        return '$M';
      case 'margin':
        return '%';
      default:
        return '$M';
    }
  };

  const getBarColor = () => {
    switch (view) {
      case 'revenue':
        return '#3b82f6';
      case 'profit':
        return '#10b981';
      case 'margin':
        return '#8b5cf6';
      default:
        return '#3b82f6';
    }
  };

  const maxValue = getMaxValue();
  const currentData = getCurrentData();
  const unit = getUnit();
  const barColor = getBarColor();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          Division Performance
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setView('revenue')}
            style={getButtonStyle('revenue', view === 'revenue')}
            onMouseOver={(e) => {
              if (view !== 'revenue') {
                e.currentTarget.style.background = '#d1d5db';
              }
            }}
            onMouseOut={(e) => {
              if (view !== 'revenue') {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
          >
            Revenue
          </button>
          <button
            onClick={() => setView('profit')}
            style={getButtonStyle('profit', view === 'profit')}
            onMouseOver={(e) => {
              if (view !== 'profit') {
                e.currentTarget.style.background = '#d1d5db';
              }
            }}
            onMouseOut={(e) => {
              if (view !== 'profit') {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
          >
            Profit
          </button>
          <button
            onClick={() => setView('margin')}
            style={getButtonStyle('margin', view === 'margin')}
            onMouseOver={(e) => {
              if (view !== 'margin') {
                e.currentTarget.style.background = '#d1d5db';
              }
            }}
            onMouseOut={(e) => {
              if (view !== 'margin') {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
          >
            Margin
          </button>
        </div>
      </div>

      <div style={{ height: '240px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.divisions.map((division, index) => (
          <div key={division} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              minWidth: '120px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              {division}
            </div>
            <div style={{ 
              flex: '1', 
              height: '24px', 
              background: '#f3f4f6', 
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${(currentData[index] / maxValue) * 100}%`,
                background: barColor,
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{ 
              minWidth: '60px', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#111827',
              textAlign: 'right'
            }}>
              {view === 'margin' ? `${currentData[index]}%` : `$${currentData[index]}M`}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '16px', 
        padding: '12px',
        background: '#f9fafb',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <strong style={{ color: '#111827' }}>
          {view === 'revenue' ? 'Revenue' : view === 'profit' ? 'Net Profit' : 'Profit Margin'}
        </strong> by division • Best performer: <strong style={{ color: barColor }}>
          {data.divisions[currentData.indexOf(Math.max(...currentData))]}
        </strong>
      </div>
    </div>
  );
}
