import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIAnalysisResults = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('anomalies');

  const tabs = [
    { id: 'anomalies', label: 'Anomaly Detection', icon: 'AlertTriangle' },
    { id: 'patterns', label: 'Pattern Analysis', icon: 'TrendingUp' },
    { id: 'behavioral', label: 'Behavioral Analysis', icon: 'Brain' },
    { id: 'correlations', label: 'Correlations', icon: 'GitBranch' }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConfidenceBar = (confidence) => {
    const width = Math.min(confidence, 100);
    const color = confidence >= 80 ? 'bg-success' : confidence >= 60 ? 'bg-warning' : 'bg-error';
    return (
      <div className="w-full bg-muted rounded-full h-2">
        <div className={`h-2 rounded-full ${color} forensic-transition`} style={{ width: `${width}%` }}></div>
      </div>
    );
  };

  const renderAnomalies = () => (
    <div className="space-y-4">
      {analysisData?.anomalies?.map((anomaly) => (
        <div key={anomaly?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 forensic-transition">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <Icon name="AlertTriangle" size={20} className="text-warning mr-3" />
              <div>
                <h4 className="font-medium text-foreground">{anomaly?.title}</h4>
                <p className="text-sm text-muted-foreground">{anomaly?.description}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getRiskColor(anomaly?.riskLevel)}`}>
              {anomaly?.riskLevel?.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Confidence Score</label>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-foreground mr-2">{anomaly?.confidence}%</span>
                {getConfidenceBar(anomaly?.confidence)}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Detection Time</label>
              <p className="text-sm text-foreground mt-1">{anomaly?.detectedAt}</p>
            </div>
          </div>
          
          <div className="bg-muted rounded-md p-3">
            <p className="text-sm text-foreground">{anomaly?.details}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatterns = () => (
    <div className="space-y-4">
      {analysisData?.patterns?.map((pattern) => (
        <div key={pattern?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Icon name="TrendingUp" size={20} className="text-primary mr-3" />
              <div>
                <h4 className="font-medium text-foreground">{pattern?.name}</h4>
                <p className="text-sm text-muted-foreground">{pattern?.type}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">{pattern?.frequency} occurrences</span>
          </div>
          
          <div className="mb-3">
            <label className="text-xs font-medium text-muted-foreground">Pattern Strength</label>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-foreground mr-2">{pattern?.strength}%</span>
              {getConfidenceBar(pattern?.strength)}
            </div>
          </div>
          
          <p className="text-sm text-foreground bg-muted rounded-md p-3">{pattern?.description}</p>
        </div>
      ))}
    </div>
  );

  const renderBehavioral = () => (
    <div className="space-y-4">
      {analysisData?.behavioral?.map((behavior) => (
        <div key={behavior?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <Icon name="Brain" size={20} className="text-accent mr-3" />
              <div>
                <h4 className="font-medium text-foreground">{behavior?.behavior}</h4>
                <p className="text-sm text-muted-foreground">{behavior?.category}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getRiskColor(behavior?.suspicionLevel)}`}>
              {behavior?.suspicionLevel?.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Timeline</label>
              <p className="text-foreground mt-1">{behavior?.timeframe}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Frequency</label>
              <p className="text-foreground mt-1">{behavior?.frequency}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Deviation</label>
              <p className="text-foreground mt-1">{behavior?.deviation}</p>
            </div>
          </div>
          
          <p className="text-sm text-foreground bg-muted rounded-md p-3">{behavior?.analysis}</p>
        </div>
      ))}
    </div>
  );

  const renderCorrelations = () => (
    <div className="space-y-4">
      {analysisData?.correlations?.map((correlation) => (
        <div key={correlation?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Icon name="GitBranch" size={20} className="text-secondary mr-3" />
              <div>
                <h4 className="font-medium text-foreground">{correlation?.title}</h4>
                <p className="text-sm text-muted-foreground">{correlation?.type}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">{correlation?.strength}% match</span>
          </div>
          
          <div className="mb-3">
            <label className="text-xs font-medium text-muted-foreground">Related Evidence</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {correlation?.relatedEvidence?.map((evidence, index) => (
                <span key={index} className="px-2 py-1 bg-muted text-xs rounded-md text-foreground">
                  {evidence}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-foreground bg-muted rounded-md p-3">{correlation?.description}</p>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'anomalies': return renderAnomalies();
      case 'patterns': return renderPatterns();
      case 'behavioral': return renderBehavioral();
      case 'correlations': return renderCorrelations();
      default: return renderAnomalies();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">AI Analysis Results</h3>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium forensic-transition ${
                activeTab === tab?.id
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AIAnalysisResults;