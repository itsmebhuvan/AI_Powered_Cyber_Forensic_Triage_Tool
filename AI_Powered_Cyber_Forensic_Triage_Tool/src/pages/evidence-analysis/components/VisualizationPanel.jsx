import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';

const VisualizationPanel = ({ visualizationData }) => {
  const [activeChart, setActiveChart] = useState('network');
  const [isLoading, setIsLoading] = useState(false);

  const chartTypes = [
    { id: 'network', label: 'Network Traffic', icon: 'Network' },
    { id: 'timeline', label: 'Email Timeline', icon: 'Mail' },
    { id: 'logs', label: 'System Logs', icon: 'FileText' },
    { id: 'correlation', label: 'Evidence Correlation', icon: 'GitBranch' }
  ];

  const COLORS = ['#1E3A8A', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#F97316'];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeChart]);

  const renderNetworkChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Volume */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Traffic Volume (Last 24h)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={visualizationData?.networkTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }} 
              />
              <Bar dataKey="inbound" fill="#1E3A8A" name="Inbound" />
              <Bar dataKey="outbound" fill="#F59E0B" name="Outbound" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Protocol Distribution */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Protocol Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={visualizationData?.protocolDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              >
                {visualizationData?.protocolDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Suspicious Connections */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Suspicious Connection Patterns</h4>
        <div className="space-y-3">
          {visualizationData?.suspiciousConnections?.map((connection, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  connection?.riskLevel === 'high' ? 'bg-error' : 
                  connection?.riskLevel === 'medium' ? 'bg-warning' : 'bg-accent'
                }`}></div>
                <div>
                  <p className="font-medium text-foreground">{connection?.source} → {connection?.destination}</p>
                  <p className="text-sm text-muted-foreground">{connection?.protocol} • {connection?.frequency} connections</p>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">{connection?.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimelineChart = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Email Activity Timeline</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visualizationData?.emailTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '6px'
              }} 
            />
            <Line type="monotone" dataKey="sent" stroke="#1E3A8A" strokeWidth={2} name="Sent" />
            <Line type="monotone" dataKey="received" stroke="#10B981" strokeWidth={2} name="Received" />
            <Line type="monotone" dataKey="suspicious" stroke="#EF4444" strokeWidth={2} name="Suspicious" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Email Forensic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visualizationData?.emailForensics?.map((email, index) => (
          <div key={index} className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Icon name="Mail" size={16} className="text-primary mr-2" />
                <div>
                  <p className="font-medium text-foreground text-sm">{email?.subject}</p>
                  <p className="text-xs text-muted-foreground">{email?.from} → {email?.to}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                email?.risk === 'high' ? 'bg-error/10 text-error' :
                email?.risk === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
              }`}>
                {email?.risk}
              </span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Timestamp: {email?.timestamp}</p>
              <p>Attachments: {email?.attachments}</p>
              <p>IP Origin: {email?.ipOrigin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogsChart = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">System Log Analysis</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={visualizationData?.systemLogs}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="category" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '6px'
              }} 
            />
            <Bar dataKey="normal" fill="#10B981" name="Normal" />
            <Bar dataKey="warning" fill="#F59E0B" name="Warning" />
            <Bar dataKey="error" fill="#EF4444" name="Error" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Log Pattern Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Critical Events</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {visualizationData?.criticalEvents?.map((event, index) => (
              <div key={index} className="flex items-start p-3 bg-surface rounded-md border border-border">
                <Icon name="AlertCircle" size={16} className="text-error mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{event?.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{event?.source}</span>
                    <span className="text-xs text-muted-foreground">{event?.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Access Patterns</h4>
          <div className="space-y-3">
            {visualizationData?.accessPatterns?.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
                <div className="flex items-center">
                  <Icon name="User" size={16} className="text-primary mr-3" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{pattern?.user}</p>
                    <p className="text-xs text-muted-foreground">{pattern?.resource}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{pattern?.attempts}</p>
                  <p className="text-xs text-muted-foreground">{pattern?.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCorrelationChart = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Evidence Correlation Matrix</h4>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={visualizationData?.correlationMatrix}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="x" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis dataKey="y" stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '6px'
              }}
              formatter={(value, name, props) => [
                `${props?.payload?.evidence1} ↔ ${props?.payload?.evidence2}`,
                `Correlation: ${value}%`
              ]}
            />
            <Scatter dataKey="correlation" fill="#1E3A8A" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visualizationData?.correlationDetails?.map((correlation, index) => (
          <div key={index} className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Icon name="GitBranch" size={16} className="text-secondary mr-2" />
                <span className="font-medium text-foreground text-sm">{correlation?.type}</span>
              </div>
              <span className="text-sm font-medium text-primary">{correlation?.strength}%</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Evidence A:</span>
                <span className="text-foreground">{correlation?.evidenceA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Evidence B:</span>
                <span className="text-foreground">{correlation?.evidenceB}</span>
              </div>
              <div className="mt-3 p-2 bg-surface rounded border border-border">
                <p className="text-xs text-foreground">{correlation?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChartContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Loading visualization...</span>
          </div>
        </div>
      );
    }

    switch (activeChart) {
      case 'network': return renderNetworkChart();
      case 'timeline': return renderTimelineChart();
      case 'logs': return renderLogsChart();
      case 'correlation': return renderCorrelationChart();
      default: return renderNetworkChart();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Interactive Visualizations</h3>
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <span className="text-sm text-muted-foreground">D3.js Integration</span>
          </div>
        </div>
        
        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2">
          {chartTypes?.map((chart) => (
            <button
              key={chart?.id}
              onClick={() => setActiveChart(chart?.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium forensic-transition ${
                activeChart === chart?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={chart?.icon} size={16} className="mr-2" />
              {chart?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderChartContent()}
      </div>
    </div>
  );
};

export default VisualizationPanel;