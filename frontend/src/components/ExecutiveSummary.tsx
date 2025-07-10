'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Heart, Briefcase, Shield, Clock, ArrowUp, ArrowDown } from 'lucide-react';

interface ExecutiveSummaryData {
  total_revenue: number;
  total_profit: number;
  profit_margin: number;
  employee_retention: number;
  employee_satisfaction: number;
  active_projects: number;
  rd_budget_utilization: number;
  public_safety_score: number;
  avg_response_time: number;
}

export default function ExecutiveSummary() {
  const [data, setData] = useState<ExecutiveSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/executive-summary');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch executive summary:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Executive Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-slate-700 h-32 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Executive Summary</h2>
        <p className="text-slate-400">Failed to load data</p>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${data.total_revenue.toLocaleString()}M`,
      subtitle: '2024 Annual',
      icon: DollarSign,
      trend: 'up',
      change: '+12.5%'
    },
    {
      title: 'Net Profit',
      value: `$${data.total_profit.toLocaleString()}M`,
      subtitle: `${data.profit_margin}% Margin`,
      icon: TrendingUp,
      trend: 'up',
      change: '+8.3%'
    },
    {
      title: 'Employee Retention',
      value: `${data.employee_retention}%`,
      subtitle: 'Company Average',
      icon: Users,
      trend: 'up',
      change: '+2.1%'
    },
    {
      title: 'Employee Satisfaction',
      value: `${data.employee_satisfaction}/10`,
      subtitle: 'Satisfaction Score',
      icon: Heart,
      trend: 'up',
      change: '+0.5'
    },
    {
      title: 'Active R&D Projects',
      value: data.active_projects.toString(),
      subtitle: `${data.rd_budget_utilization}% Budget Used`,
      icon: Briefcase,
      trend: 'up',
      change: '+15%'
    },
    {
      title: 'Public Safety Score',
      value: `${data.public_safety_score}/10`,
      subtitle: 'Gotham Average',
      icon: Shield,
      trend: 'up',
      change: '+1.2'
    },
    {
      title: 'Response Time',
      value: `${data.avg_response_time}min`,
      subtitle: 'Average Response',
      icon: Clock,
      trend: 'down',
      change: '-15%'
    }
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Executive Summary</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-400">Live Data</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                {metric.title}
              </h3>
              
              <p className="text-xl font-bold text-white mb-1">
                {metric.value}
              </p>
              
              <p className="text-xs text-slate-400">
                {metric.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
