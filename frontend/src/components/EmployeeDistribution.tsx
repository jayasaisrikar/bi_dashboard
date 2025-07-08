'use client';

import { useState, useEffect } from 'react';

interface EmployeeDistributionData {
  departments: {
    labels: string[];
    values: number[];
  };
  levels: {
    labels: string[];
    values: number[];
  };
}

export default function EmployeeDistribution() {
  const [data, setData] = useState<EmployeeDistributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'departments' | 'levels'>('departments');

  useEffect(() => {
    // Sample data for demonstration
    const sampleData: EmployeeDistributionData = {
      departments: {
        labels: ['Technology', 'Applied Sciences', 'Security', 'Operations', 'Research', 'Administration'],
        values: [3200, 2100, 1800, 1500, 1200, 800]
      },
      levels: {
        labels: ['Senior Management', 'Middle Management', 'Senior Staff', 'Junior Staff', 'Interns'],
        values: [150, 800, 2500, 5200, 950]
      }
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
          Employee Distribution
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
          Loading employee data...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          Employee Distribution
        </h2>
        <p style={{ color: '#6b7280' }}>Failed to load data</p>
      </div>
    );
  }

  const colors = [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#8b5cf6', // Purple
    '#f59e0b', // Orange
    '#ef4444', // Red
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];

  const getButtonStyle = (buttonView: string, isActive: boolean) => {
    return {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      background: isActive ? '#3b82f6' : '#e5e7eb',
      color: isActive ? '#ffffff' : '#374151'
    };
  };

  const getCurrentData = () => {
    return view === 'departments' ? data.departments : data.levels;
  };

  const currentData = getCurrentData();
  const total = currentData.values.reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
          Employee Distribution
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setView('departments')}
            style={getButtonStyle('departments', view === 'departments')}
            onMouseOver={(e) => {
              if (view !== 'departments') {
                e.currentTarget.style.background = '#d1d5db';
              }
            }}
            onMouseOut={(e) => {
              if (view !== 'departments') {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
          >
            Departments
          </button>
          <button
            onClick={() => setView('levels')}
            style={getButtonStyle('levels', view === 'levels')}
            onMouseOver={(e) => {
              if (view !== 'levels') {
                e.currentTarget.style.background = '#d1d5db';
              }
            }}
            onMouseOut={(e) => {
              if (view !== 'levels') {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
          >
            Levels
          </button>
        </div>
      </div>

      {/* Simple Pie Chart Visualization */}
      <div style={{ 
        height: '180px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: `conic-gradient(${currentData.values.map((value, index) => {
            const percentage = (value / total) * 100;
            const color = colors[index % colors.length];
            return `${color} ${index === 0 ? 0 : currentData.values.slice(0, index).reduce((sum, v) => sum + (v / total) * 100, 0)}% ${currentData.values.slice(0, index + 1).reduce((sum, v) => sum + (v / total) * 100, 0)}%`;
          }).join(', ')})`,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#ffffff',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#111827'
          }}>
            <div style={{ fontSize: '18px' }}>{total.toLocaleString()}</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {currentData.labels.map((label, index) => {
          const value = currentData.values[index];
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={label} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '8px',
              background: '#f9fafb',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  background: colors[index % colors.length]
                }} />
                <span style={{ fontSize: '14px', color: '#374151' }}>{label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {value.toLocaleString()}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
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
          {view === 'departments' ? 'Department' : 'Level'} Distribution
        </strong> • Largest group: <strong style={{ color: '#3b82f6' }}>
          {currentData.labels[currentData.values.indexOf(Math.max(...currentData.values))]}
        </strong> ({((Math.max(...currentData.values) / total) * 100).toFixed(1)}%)
      </div>
    </div>
  );
}
