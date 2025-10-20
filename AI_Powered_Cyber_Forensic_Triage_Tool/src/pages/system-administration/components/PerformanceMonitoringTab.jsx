import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PerformanceMonitoringTab = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const systemMetrics = {
    cpu: { current: 68, average: 72, peak: 89 },
    memory: { current: 74, average: 71, peak: 92 },
    storage: { current: 45, average: 48, peak: 67 },
    network: { current: 23, average: 28, peak: 78 }
  };

  const performanceData = [
    { time: '00:00', cpu: 45, memory: 62, storage: 34, network: 12 },
    { time: '04:00', cpu: 52, memory: 68, storage: 38, network: 18 },
    { time: '08:00', cpu: 78, memory: 82, storage: 45, network: 45 },
    { time: '12:00', cpu: 89, memory: 92, storage: 52, network: 67 },
    { time: '16:00', cpu: 76, memory: 79, storage: 48, network: 54 },
    { time: '20:00', cpu: 68, memory: 74, storage: 45, network: 23 }
  ];

  const investigationThroughput = [
    { period: 'Jan', cases: 45, evidence: 234, reports: 38 },
    { period: 'Feb', cases: 52, evidence: 287, reports: 44 },
    { period: 'Mar', cases: 48, evidence: 312, reports: 41 },
    { period: 'Apr', cases: 61, evidence: 398, reports: 52 },
    { period: 'May', cases: 58, evidence: 367, reports: 49 },
    { period: 'Jun', cases: 67, evidence: 423, reports: 58 }
  ];

  const storageDistribution = [
    { name: 'Evidence Files', value: 45, color: '#1E3A8A' },
    { name: 'System Logs', value: 23, color: '#F59E0B' },
    { name: 'Reports', value: 18, color: '#10B981' },
    { name: 'Backups', value: 14, color: '#EF4444' }
  ];

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High Memory Usage',
      description: 'Memory utilization exceeded 90% threshold',
      timestamp: '2 minutes ago',
      metric: 'Memory',
      value: '92%'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Processing Queue Backlog',
      description: 'Evidence processing queue has 15+ items pending',
      timestamp: '8 minutes ago',
      metric: 'Queue',
      value: '18 items'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      description: 'System maintenance window scheduled for tonight',
      timestamp: '1 hour ago',
      metric: 'Maintenance',
      value: '23:00 UTC'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getMetricColor = (value) => {
    if (value >= 80) return 'text-error';
    if (value >= 60) return 'text-warning';
    return 'text-success';
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-error/10 border-error/20 text-error';
      case 'warning': return 'bg-warning/10 border-warning/20 text-warning';
      case 'info': return 'bg-primary/10 border-primary/20 text-primary';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Performance Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated?.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            placeholder="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
          <Button variant="outline" iconName="RefreshCw" iconPosition="left" iconSize={16}>
            Refresh
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left" iconSize={16}>
            Export Report
          </Button>
        </div>
      </div>
      {/* System Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(systemMetrics)?.map(([key, metric]) => (
          <div key={key} className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  key === 'cpu' ? 'bg-primary/10' :
                  key === 'memory' ? 'bg-warning/10' :
                  key === 'storage' ? 'bg-success/10' : 'bg-accent/10'
                }`}>
                  <Icon 
                    name={
                      key === 'cpu' ? 'Cpu' :
                      key === 'memory' ? 'HardDrive' :
                      key === 'storage' ? 'Database' : 'Wifi'
                    } 
                    size={20}
                    className={
                      key === 'cpu' ? 'text-primary' :
                      key === 'memory' ? 'text-warning' :
                      key === 'storage' ? 'text-success' : 'text-accent'
                    }
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground capitalize">{key}</h4>
                  <p className="text-sm text-muted-foreground">Usage</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className={`text-lg font-semibold ${getMetricColor(metric?.current)}`}>
                  {metric?.current}%
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full forensic-transition ${
                    metric?.current >= 80 ? 'bg-error' :
                    metric?.current >= 60 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${metric?.current}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Avg: {metric?.average}%</span>
                <span>Peak: {metric?.peak}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance Trends */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">System Performance Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="var(--color-warning)" strokeWidth={2} />
                <Line type="monotone" dataKey="network" stroke="var(--color-success)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Distribution */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">Storage Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {storageDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {storageDistribution?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Investigation Throughput */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h4 className="font-medium text-foreground mb-4">Investigation Throughput</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={investigationThroughput}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="period" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="cases" fill="var(--color-primary)" />
              <Bar dataKey="evidence" fill="var(--color-warning)" />
              <Bar dataKey="reports" fill="var(--color-success)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Performance Alerts */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Performance Alerts</h4>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left" iconSize={14}>
            Configure Alerts
          </Button>
        </div>
        
        <div className="space-y-3">
          {alerts?.map((alert) => (
            <div key={alert?.id} className={`p-4 rounded-lg border ${getAlertColor(alert?.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={
                        alert?.type === 'critical' ? 'AlertCircle' :
                        alert?.type === 'warning' ? 'AlertTriangle' : 'Info'
                      } 
                      size={16} 
                    />
                    <h5 className="font-medium">{alert?.title}</h5>
                    <span className="text-xs opacity-75">{alert?.timestamp}</span>
                  </div>
                  <p className="text-sm opacity-90">{alert?.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs">
                    <span>Metric: {alert?.metric}</span>
                    <span>Value: {alert?.value}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoringTab;