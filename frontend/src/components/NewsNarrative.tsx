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
import { useCurrentDate } from '@/hooks/useClientOnly';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface NarrativeData {
  headline: string;
  improvement_percentage: number;
  quarterly_incidents: {
    quarters: string[];
    incidents: number[];
  };
  key_districts: string[];
  investment_impact: string;
}

export default function NewsNarrative() {
  const [data, setData] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const currentDate = useCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/narrative-data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch narrative data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 rounded mb-4"></div>
          <div className="bg-gray-200 h-32 rounded"></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">News Narrative</h2>
        <p className="text-gray-500">Failed to load data</p>
      </section>
    );
  }

  const chartData = {
    labels: data.quarterly_incidents.quarters,
    datasets: [
      {
        label: 'Security Incidents',
        data: data.quarterly_incidents.incidents,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
            return value + ' incidents';
          }
        }
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8">
      <div className="flex items-start space-x-8">
        {/* Newspaper-style content */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">📰</span>
            </div>
            <span className="text-sm font-medium text-blue-600">GOTHAM BUSINESS JOURNAL</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{currentDate}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {data.headline}
          </h1>
          
          <div className="prose prose-lg text-gray-700 mb-6">
            <p className="mb-4 leading-relaxed">
              Wayne Enterprises&apos; comprehensive security initiative has delivered remarkable results across 
              Gotham City, with a <span className="font-bold text-green-600">{data.improvement_percentage}% improvement</span> in 
              crime prevention effectiveness over the past 18 months.
            </p>
            
            <p className="mb-4 leading-relaxed">
              {data.investment_impact} The company&apos;s innovative approach combines advanced technology 
              deployment with community engagement programs, resulting in measurable improvements in public safety metrics.
            </p>
            
            <p className="leading-relaxed">
              Key performance improvements have been observed in {data.key_districts.join(', ')} districts, 
              with Bristol District leading the transformation as a model for citywide expansion.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Crime Prevention +{data.improvement_percentage}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Technology Deployment Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Community Engagement Programs</span>
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="w-80 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quarterly Security Incidents</h3>
          <div className="h-48">
            <Line data={chartData} options={options} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Downward trend demonstrates effectiveness of Wayne Tech security solutions
          </p>
        </div>
      </div>
    </section>
  );
}
