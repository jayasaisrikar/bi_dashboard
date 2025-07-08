'use client';

import { useState, useEffect } from 'react';

interface AIInsight {
  id: string;
  type: 'prediction' | 'anomaly' | 'recommendation' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  action: string;
  data_source: string;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI-generated insights
    const generateInsights = () => {
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'prediction',
          title: 'Revenue Growth Forecast',
          description: 'Aerospace division projected to exceed Q1 targets by 12% based on current R&D investment trends.',
          confidence: 87,
          impact: 'high',
          action: 'Consider increasing production capacity',
          data_source: 'Financial & R&D data'
        },
        {
          id: '2',
          type: 'anomaly',
          title: 'Security Pattern Anomaly',
          description: 'Unusual incident clustering detected in Downtown district. Pattern differs from historical trends.',
          confidence: 92,
          impact: 'medium',
          action: 'Deploy additional Wayne Tech units',
          data_source: 'Security monitoring systems'
        },
        {
          id: '3',
          type: 'recommendation',
          title: 'Employee Retention Optimization',
          description: 'Mid-level employees showing 23% higher satisfaction with flexible work arrangements.',
          confidence: 78,
          impact: 'medium',
          action: 'Expand remote work policies',
          data_source: 'HR analytics & satisfaction surveys'
        },
        {
          id: '4',
          type: 'optimization',
          title: 'R&D Budget Reallocation',
          description: 'Neural interface projects showing 340% higher commercialization potential than quantum computing.',
          confidence: 95,
          impact: 'high',
          action: 'Shift 15% budget allocation',
          data_source: 'R&D portfolio analysis'
        }
      ];

      setInsights(mockInsights);
      setLoading(false);
    };

    // Simulate AI processing time
    setTimeout(generateInsights, 1500);
  }, []);

  const getInsightIcon = (type: string) => {
    const iconStyle = { 
      width: '20px', 
      height: '20px', 
      color: '#8b5cf6'
    };

    switch (type) {
      case 'prediction':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'anomaly':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'recommendation':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'optimization':
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' };
      case 'medium':
        return { background: '#fffbeb', color: '#92400e', border: '1px solid #fed7aa' };
      case 'low':
        return { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' };
      default:
        return { background: '#f9fafb', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ 
            padding: '8px', 
            background: '#8b5cf6', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>AI-Powered Insights</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ 
              height: '80px', 
              background: '#f3f4f6', 
              borderRadius: '8px',
              animation: 'pulse 2s infinite'
            }} />
          ))}
        </div>
        
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>AI analyzing data patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            padding: '8px', 
            background: '#8b5cf6', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>AI-Powered Insights</h2>
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#8b5cf6', 
          fontWeight: '600',
          padding: '4px 8px',
          background: '#f3f4f6',
          borderRadius: '4px'
        }}>
          {insights.length} insights generated
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            style={{ 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              background: '#ffffff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ 
                padding: '8px', 
                background: '#f3f4f6', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getInsightIcon(insight.type)}
              </div>
              
              <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{insight.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      ...getImpactColor(insight.impact),
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {insight.impact} IMPACT
                    </span>
                    <span style={{
                      fontSize: '11px',
                      background: '#f3f4f6',
                      color: '#374151',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px', 
                  marginBottom: '12px',
                  lineHeight: '1.5',
                  margin: '0 0 12px 0'
                }}>
                  {insight.description}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#8b5cf6',
                      margin: '0 0 4px 0'
                    }}>
                      Recommended Action:
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#374151',
                      margin: 0
                    }}>
                      {insight.action}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '120px' }}>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 2px 0' }}>
                      Data Source
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {insight.data_source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: '#faf5ff', 
        borderRadius: '8px',
        border: '1px solid #e9d5ff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <svg style={{ width: '16px', height: '16px', fill: '#8b5cf6' }} viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <circle cx="12" cy="8" r="1" fill="white"/>
            <circle cx="12" cy="12" r="1" fill="white"/>
            <circle cx="12" cy="16" r="1" fill="white"/>
          </svg>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#7c3aed' }}>AI Analysis Summary</span>
        </div>
        <p style={{ 
          fontSize: '14px', 
          color: '#6b46c1',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Machine learning models have processed 2.3M data points across financial, security, HR, and R&D datasets. 
          Next analysis cycle in 4 hours.
        </p>
      </div>
    </div>
  );
}
