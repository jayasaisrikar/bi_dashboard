'use client';

import { useState, useEffect } from 'react';

interface RDPortfolioData {
  division_projects: {
    labels: string[];
    values: number[];
  };
  budget_utilization: {
    categories: string[];
    allocated: number[];
    spent: number[];
    utilization: number[];
  };
  commercialization: {
    labels: string[];
    values: number[];
  };
}

export default function RDPortfolio() {
  const [data, setData] = useState<RDPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/rd-portfolio');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching R&D portfolio data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          R&D Portfolio Analysis
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
          Loading R&D portfolio data...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
          R&D Portfolio Analysis
        </h2>
        <p style={{ color: '#6b7280' }}>Failed to load data</p>
      </div>
    );
  }

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
        R&D Portfolio Analysis
      </h2>
      
      {/* Budget Utilization Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
          Budget Utilization by Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.budget_utilization.categories.map((category, index) => {
            const allocated = data.budget_utilization.allocated[index];
            const spent = data.budget_utilization.spent[index];
            const maxValue = Math.max(...data.budget_utilization.allocated);
            
            return (
              <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  minWidth: '100px', 
                  fontSize: '12px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {category}
                </div>
                <div style={{ 
                  flex: '1', 
                  height: '24px', 
                  background: '#f3f4f6', 
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Allocated bar (background) */}
                  <div style={{
                    position: 'absolute',
                    height: '100%',
                    width: `${(allocated / maxValue) * 100}%`,
                    background: '#d1d5db',
                    borderRadius: '4px'
                  }} />
                  {/* Spent bar (foreground) */}
                  <div style={{
                    position: 'absolute',
                    height: '100%',
                    width: `${(spent / maxValue) * 100}%`,
                    background: colors[index % colors.length],
                    borderRadius: '4px'
                  }} />
                </div>
                <div style={{ 
                  minWidth: '80px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: '#111827',
                  textAlign: 'right'
                }}>
                  ${spent}M / ${allocated}M
                </div>
                <div style={{ 
                  minWidth: '40px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: colors[index % colors.length],
                  textAlign: 'right'
                }}>
                  {data.budget_utilization.utilization[index]}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commercialization & Summary Row */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Commercialization Potential */}
        <div style={{ flex: '1' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
            Commercialization Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.commercialization.labels.map((label, index) => {
              const value = data.commercialization.values[index];
              const total = data.commercialization.values.reduce((sum, v) => sum + v, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return (
                <div key={label} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 12px',
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
                      {value}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Statistics */}
        <div style={{ flex: '1' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
            Portfolio Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ 
              background: '#eff6ff', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #dbeafe'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e40af', marginBottom: '4px' }}>
                Active Projects
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1d4ed8' }}>
                {data.division_projects.values.reduce((a, b) => a + b, 0)}
              </div>
            </div>
            
            <div style={{ 
              background: '#f0fdf4', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #dcfce7'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#166534', marginBottom: '4px' }}>
                Total Allocated
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#15803d' }}>
                ${(data.budget_utilization.allocated.reduce((a, b) => a + b, 0) / 1000).toFixed(1)}B
              </div>
            </div>
            
            <div style={{ 
              background: '#fff7ed', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #fed7aa'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#9a3412', marginBottom: '4px' }}>
                Total Spent
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#c2410c' }}>
                ${(data.budget_utilization.spent.reduce((a, b) => a + b, 0) / 1000).toFixed(1)}B
              </div>
            </div>
            
            <div style={{ 
              background: '#faf5ff', 
              padding: '12px', 
              borderRadius: '6px',
              border: '1px solid #e9d5ff'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c2d12', marginBottom: '4px' }}>
                Avg Utilization
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#8b5cf6' }}>
                {(data.budget_utilization.utilization.reduce((a, b) => a + b, 0) / data.budget_utilization.utilization.length).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
