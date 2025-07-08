'use client';

import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'security' | 'financial' | 'hr' | 'rd';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  action_required: boolean;
}

interface SecurityUpdate {
  type: string;
  timestamp: string;
  district: string;
  incident_count: number;
  response_time: number;
  safety_score: number;
}

export default function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [liveUpdates, setLiveUpdates] = useState<SecurityUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Add some sample data for demonstration
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        type: 'security',
        severity: 'high',
        title: 'Increased Activity in The Narrows',
        description: 'Security incidents up 15% from yesterday',
        timestamp: new Date().toISOString(),
        action_required: true
      },
      {
        id: '2',
        type: 'financial',
        severity: 'low',
        title: 'Q4 Revenue Target Achieved',
        description: '103% of quarterly goal reached',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        action_required: false
      }
    ];

    const sampleUpdates: SecurityUpdate[] = [
      {
        type: 'patrol',
        timestamp: new Date().toISOString(),
        district: 'Downtown',
        incident_count: 2,
        response_time: 1.8,
        safety_score: 9.2
      },
      {
        type: 'patrol',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        district: 'The Narrows',
        incident_count: 5,
        response_time: 2.4,
        safety_score: 7.8
      }
    ];

    setAlerts(sampleAlerts);
    setLiveUpdates(sampleUpdates);
    setIsConnected(true);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const districts = ['Downtown', 'The Narrows', 'Midtown', 'East End', 'West Side'];
      const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
      
      const newUpdate: SecurityUpdate = {
        type: 'patrol',
        timestamp: new Date().toISOString(),
        district: randomDistrict,
        incident_count: Math.floor(Math.random() * 6),
        response_time: Math.round((Math.random() * 3 + 1) * 10) / 10,
        safety_score: Math.round((Math.random() * 3 + 7) * 10) / 10
      };

      setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security':
        return '🛡️';
      case 'financial':
        return '💰';
      case 'hr':
        return '👥';
      case 'rd':
        return '🔬';
      default:
        return '⚠️';
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { background: '#fef2f2', borderColor: '#dc2626', color: '#991b1b' };
      case 'high':
        return { background: '#fff7ed', borderColor: '#ea580c', color: '#9a3412' };
      case 'medium':
        return { background: '#fefce8', borderColor: '#ca8a04', color: '#92400e' };
      case 'low':
        return { background: '#eff6ff', borderColor: '#2563eb', color: '#1d4ed8' };
      default:
        return { background: '#f9fafb', borderColor: '#6b7280', color: '#374151' };
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Real-Time Operations Center</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: isConnected ? '#10b981' : '#ef4444' 
            }}
          ></div>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Active Alerts */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
          Active Alerts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '16px' }}>
              No active alerts
            </p>
          ) : (
            alerts.map((alert) => {
              const severityStyle = getSeverityStyle(alert.severity);
              return (
                <div
                  key={alert.id}
                  style={{
                    padding: '16px',
                    background: severityStyle.background,
                    borderLeft: `4px solid ${severityStyle.borderColor}`,
                    borderRadius: '8px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ 
                        fontSize: '20px',
                        minWidth: '24px',
                        textAlign: 'center'
                      }}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <h4 style={{ 
                          fontWeight: '600', 
                          color: '#111827', 
                          marginBottom: '4px',
                          fontSize: '16px'
                        }}>
                          {alert.title}
                        </h4>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#4b5563', 
                          marginBottom: '8px' 
                        }}>
                          {alert.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                          {alert.action_required && (
                            <span style={{
                              fontSize: '12px',
                              background: '#fee2e2',
                              color: '#991b1b',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: '500'
                            }}>
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '4px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#6b7280'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Live Security Updates */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
          Live Security Feed
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {liveUpdates.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '16px' }}>
              No recent updates
            </p>
          ) : (
            liveUpdates.map((update, index) => (
              <div
                key={`${update.timestamp}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '16px' }}>🕐</div>
                  <div>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#111827',
                      margin: '0 0 2px 0'
                    }}>
                      {update.district} District Update
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280',
                      margin: '0'
                    }}>
                      {update.incident_count} incidents • {update.response_time}min response • Safety: {update.safety_score}/10
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {new Date(update.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
