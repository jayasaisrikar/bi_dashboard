'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialTrendsData {
  quarters: string[];
  revenue: number[];
  profit: number[];
  rd_investment: number[];
}

export default function FinancialTrends() {
  const [data, setData] = useState<FinancialTrendsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/financial-trends');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch financial trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Trends</h2>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded"></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Trends</h2>
        <p className="text-gray-500">Failed to load data</p>
      </section>
    );
  }

  const chartData = {
    labels: data.quarters,
    datasets: [
      {
        label: 'Revenue ($M)',
        data: data.revenue,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Net Profit ($M)',
        data: data.profit,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'R&D Investment ($M)',
        data: data.rd_investment,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value + 'M';
          }
        }
      },
    },
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Trends</h2>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
}
