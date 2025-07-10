'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SecurityPerformanceData {
  districts: string[];
  incidents: number[];
  response_time: number[];
  safety_score: number[];
  prevention_effectiveness: number[];
}

export default function SecurityPerformance() {
  const [data, setData] = useState<SecurityPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/security-performance');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch security performance:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Security Performance</h2>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded"></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Security Performance</h2>
        <p className="text-gray-500">Failed to load data</p>
      </section>
    );
  }

  // Normalize response time (lower is better) - invert for radar chart
  const normalizedResponseTime = data.response_time.map(time => Math.max(0, 10 - time));

  const chartData = {
    labels: data.districts,
    datasets: [
      {
        label: 'Safety Score',
        data: data.safety_score,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
      {
        label: 'Prevention Effectiveness',
        data: data.prevention_effectiveness.map(eff => eff / 10), // Scale to 0-10
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Response Efficiency',
        data: normalizedResponseTime,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Security Performance by District</h2>
      <div className="h-64">
        <Radar data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-gray-900">Best Performing</h4>
          <p className="text-green-600">Bristol District</p>
          <p className="text-gray-500">Highest safety scores</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Needs Attention</h4>
          <p className="text-red-600">The Narrows</p>
          <p className="text-gray-500">High incident rates</p>
        </div>
      </div>
    </section>
  );
}
