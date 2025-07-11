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
  const [wsError, setWsError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial alerts data
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/realtime-alerts');
        if (response.ok) {
          const data = await response.json();
          setAlerts(data.alerts || []);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();

    // Set up WebSocket connection for real-time updates
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'localhost:8000';
        const wsProtocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
        const wsUrl = `${wsProtocol}://${backendUrl}/ws`;
        
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setIsConnected(true);
          setWsError(null);
          console.log('Connected to real-time updates');
        };        ws.onmessage = (event) => {
          try {
            const rawUpdate = JSON.parse(event.data);
            console.log('Received WebSocket data:', rawUpdate);
            
            // Check if this is a security update
            if (rawUpdate.type === 'security_update') {
              // Validate and transform the data to ensure it has the expected format
              const update: SecurityUpdate = {
                type: rawUpdate.type || 'patrol',
                timestamp: rawUpdate.timestamp || new Date().toISOString(),
                district: rawUpdate.district || 'Unknown',
                incident_count: typeof rawUpdate.incident_count === 'number' ? rawUpdate.incident_count : 0,
                response_time: typeof rawUpdate.response_time === 'number' ? rawUpdate.response_time : 0,
                safety_score: typeof rawUpdate.safety_score === 'number' ? rawUpdate.safety_score : 0
              };
              
              // Validate timestamp
              const timestampDate = new Date(update.timestamp);
              if (isNaN(timestampDate.getTime())) {
                update.timestamp = new Date().toISOString();
              }
              
              setLiveUpdates(prev => [update, ...prev.slice(0, 4)]);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = (event) => {
          setIsConnected(false);
          if (event.code !== 1000) { // 1000 is normal closure
            setWsError('Connection closed unexpectedly');
            console.log('WebSocket closed, attempting to reconnect...');
            // Attempt to reconnect after 5 seconds
            reconnectTimeout = setTimeout(() => {
              connectWebSocket();
            }, 5000);
          } else {
            console.log('WebSocket connection closed normally');
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
          setWsError('WebSocket connection failed');
        };

      } catch (error) {
        console.error('Error creating WebSocket connection:', error);
        setIsConnected(false);
        setWsError('Failed to create WebSocket connection');
      }
    };

    // Try to connect to WebSocket, but don't fail if it doesn't work
    connectWebSocket();

    // Fallback: Add simulated updates if WebSocket fails to connect
    const fallbackInterval = setTimeout(() => {
      if (!isConnected) {
        console.log('WebSocket connection failed, using simulated updates');
        setWsError('Using simulated data');
        
        // Add some initial simulated updates
        const initialUpdates: SecurityUpdate[] = [
          {
            type: 'security_update',
            timestamp: new Date().toISOString(),
            district: 'Downtown',
            incident_count: 2,
            response_time: 3.8,
            safety_score: 9.2
          },
          {
            type: 'security_update',
            timestamp: new Date(Date.now() - 120000).toISOString(),
            district: 'The Narrows',
            incident_count: 3,
            response_time: 4.1,
            safety_score: 8.5
          }
        ];
        
        setLiveUpdates(initialUpdates);
        
        // Set up periodic simulated updates
        const simulationInterval = setInterval(() => {
          const districts = ['Downtown', 'The Narrows', 'Midtown', 'East End', 'West Side'];
          const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
          
          const newUpdate: SecurityUpdate = {
            type: 'security_update',
            timestamp: new Date().toISOString(),
            district: randomDistrict,
            incident_count: Math.floor(Math.random() * 6),
            response_time: Math.round((Math.random() * 4 + 2) * 10) / 10,
            safety_score: Math.round((Math.random() * 3.5 + 6) * 10) / 10
          };

          setLiveUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
        }, 15000); // Update every 15 seconds
        
        return () => {
          clearInterval(simulationInterval);
        };
      }
    }, 3000); // Wait 3 seconds before falling back

    return () => {
      clearTimeout(fallbackInterval);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (ws) {
        ws.close(1000); // Normal closure
      }
    };
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

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      return date.toLocaleTimeString();
    } catch (error) {
      return 'Invalid time';
    }
  };

  const formatSafetyScore = (score: number) => {
    if (typeof score !== 'number' || isNaN(score)) {
      return 'N/A';
    }
    return score.toFixed(1);
  };

  const formatResponseTime = (time: number) => {
    if (typeof time !== 'number' || isNaN(time)) {
      return 'N/A';
    }
    return time.toFixed(1);
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
            {isConnected ? 'Live Updates' : wsError || 'Connecting...'}
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
                            {formatTimestamp(alert.timestamp)}
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
                      {update.incident_count} incidents • {formatResponseTime(update.response_time)}min response • Safety: {formatSafetyScore(update.safety_score)}/10
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {formatTimestamp(update.timestamp)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
