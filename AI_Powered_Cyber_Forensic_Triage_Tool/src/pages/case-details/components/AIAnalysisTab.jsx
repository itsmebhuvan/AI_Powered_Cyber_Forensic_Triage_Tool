import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AIAnalysisTab = ({ analysisData }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('anomalies');

  const riskScoreColor = (score) => {
    if (score >= 80) return 'text-error';
    if (score >= 60) return 'text-warning';
    return 'text-success';
  };

  const confidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
  };

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

  const analysisTypes = [
    { id: 'anomalies', label: 'Anomaly Detection', icon: 'AlertTriangle' },
    { id: 'patterns', label: 'Pattern Recognition', icon: 'TrendingUp' },
    { id: 'timeline', label: 'Timeline Analysis', icon: 'Clock' },
    { id: 'network', label: 'Network Analysis', icon: 'Network' }
  ];

  return (
    <div className="space-y-6">
      {/* AI Analysis Overview */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
              AI Analysis Results
            </h2>
            <p className="text-sm text-muted-foreground">
              Automated analysis completed on {analysisData?.lastAnalysis}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" iconName="RefreshCw" iconPosition="left">
              Re-analyze
            </Button>
            <Button variant="default" iconName="Download" iconPosition="left">
              Export Report
            </Button>
          </div>
        </div>

        {/* Analysis Type Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {analysisTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setSelectedAnalysis(type?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium forensic-transition ${
                selectedAnalysis === type?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              {type?.label}
            </button>
          ))}
        </div>

        {/* Overall Risk Score */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Risk Score</span>
              <Icon name="Shield" size={16} className={riskScoreColor(analysisData?.overallRisk)} />
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-2xl font-bold ${riskScoreColor(analysisData?.overallRisk)}`}>
                {analysisData?.overallRisk}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Anomalies Detected</span>
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              {analysisData?.anomaliesCount}
            </span>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Patterns Found</span>
              <Icon name="TrendingUp" size={16} className="text-success" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              {analysisData?.patternsCount}
            </span>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Confidence Level</span>
              <Icon name="Target" size={16} className={confidenceColor(analysisData?.confidence)} />
            </div>
            <span className={`text-2xl font-bold ${confidenceColor(analysisData?.confidence)}`}>
              {analysisData?.confidence}%
            </span>
          </div>
        </div>
      </div>
      {/* Anomaly Detection Results */}
      {selectedAnalysis === 'anomalies' && (
        <div className="bg-card rounded-lg p-6 forensic-shadow-card">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Anomaly Detection Results
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Anomaly Chart */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Anomaly Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analysisData?.anomalyDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                    >
                      {analysisData?.anomalyDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Anomaly List */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Critical Anomalies</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {analysisData?.criticalAnomalies?.map((anomaly) => (
                  <div key={anomaly?.id} className="border border-border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-foreground">{anomaly?.type}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        anomaly?.severity === 'High' ? 'bg-error text-error-foreground' :
                        anomaly?.severity === 'Medium' ? 'bg-warning text-warning-foreground' :
                        'bg-success text-success-foreground'
                      }`}>
                        {anomaly?.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{anomaly?.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Confidence: {anomaly?.confidence}%</span>
                      <span className="text-muted-foreground">{anomaly?.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pattern Recognition Results */}
      {selectedAnalysis === 'patterns' && (
        <div className="bg-card rounded-lg p-6 forensic-shadow-card">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Pattern Recognition Results
          </h3>
          
          <div className="space-y-6">
            {/* Pattern Frequency Chart */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Pattern Frequency Over Time</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysisData?.patternFrequency}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="frequency" stroke="#1E3A8A" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Identified Patterns */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Identified Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisData?.identifiedPatterns?.map((pattern) => (
                  <div key={pattern?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground">{pattern?.name}</h5>
                        <p className="text-sm text-muted-foreground">Occurrences: {pattern?.occurrences}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-3">{pattern?.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${confidenceColor(pattern?.confidence)}`}>
                        Confidence: {pattern?.confidence}%
                      </span>
                      <span className="text-muted-foreground">Last seen: {pattern?.lastSeen}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Timeline Analysis */}
      {selectedAnalysis === 'timeline' && (
        <div className="bg-card rounded-lg p-6 forensic-shadow-card">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Timeline Analysis
          </h3>
          
          <div className="space-y-6">
            {/* Activity Timeline Chart */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Activity Timeline</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisData?.timelineActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activity" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Events */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Events Identified</h4>
              <div className="space-y-3">
                {analysisData?.keyEvents?.map((event) => (
                  <div key={event?.id} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">{event?.title}</h5>
                        <span className="text-sm text-muted-foreground">{event?.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">Impact: {event?.impact}</span>
                        <span className={`font-medium ${confidenceColor(event?.confidence)}`}>
                          Confidence: {event?.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Network Analysis */}
      {selectedAnalysis === 'network' && (
        <div className="bg-card rounded-lg p-6 forensic-shadow-card">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Network Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Analysis */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Connection Analysis</h4>
              <div className="space-y-3">
                {analysisData?.networkConnections?.map((connection) => (
                  <div key={connection?.id} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-foreground">{connection?.ip}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        connection?.risk === 'High' ? 'bg-error text-error-foreground' :
                        connection?.risk === 'Medium' ? 'bg-warning text-warning-foreground' :
                        'bg-success text-success-foreground'
                      }`}>
                        {connection?.risk}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Location: {connection?.location}</div>
                      <div>Connections: {connection?.connections}</div>
                      <div>Last Activity: {connection?.lastActivity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Analysis */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Traffic Patterns</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisData?.trafficPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="protocol" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* AI Insights Summary */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Brain" size={20} />
          AI Insights Summary
        </h3>
        
        <div className="space-y-4">
          {analysisData?.aiInsights?.map((insight) => (
            <div key={insight?.id} className="border-l-4 border-primary pl-4">
              <h4 className="font-medium text-foreground mb-1">{insight?.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{insight?.description}</p>
              <div className="flex items-center gap-4 text-xs">
                <span className={`font-medium ${confidenceColor(insight?.confidence)}`}>
                  Confidence: {insight?.confidence}%
                </span>
                <span className="text-muted-foreground">Generated: {insight?.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisTab;