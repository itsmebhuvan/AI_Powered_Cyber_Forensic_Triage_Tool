import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatternAnalysis = ({ onPatternSelect, onCreateRule }) => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  // Mock pattern analysis data
  const detectedPatterns = [
    {
      id: 'pattern_001',
      name: 'Credential Stuffing Attack',
      confidence: 95,
      occurrences: 12,
      timespan: '08:30 - 09:15',
      description: 'Repeated login attempts with different credentials from same IP range',
      indicators: [
        'Multiple failed authentication attempts',
        'Sequential IP addresses (192.168.1.100-112)',
        'Consistent timing intervals (30-45 seconds)',
        'Common username patterns'
      ],
      severity: 'high',
      recommendation: 'Implement rate limiting and IP blocking for suspicious authentication patterns'
    },
    {
      id: 'pattern_002',
      name: 'Data Exfiltration Sequence',
      confidence: 88,
      occurrences: 3,
      timespan: '09:15 - 10:00',
      description: 'Systematic file access followed by large data transfers',
      indicators: [
        'Sequential file system access',
        'Large outbound data transfers',
        'Compression activities detected',
        'External server connections'
      ],
      severity: 'critical',
      recommendation: 'Immediate network isolation and forensic imaging of affected systems'
    },
    {
      id: 'pattern_003',
      name: 'Privilege Escalation Chain',
      confidence: 76,
      occurrences: 5,
      timespan: '08:45 - 09:30',
      description: 'Progressive elevation of user privileges through system vulnerabilities',
      indicators: [
        'Service account compromise',
        'Registry modifications',
        'Administrative tool usage',
        'System service manipulation'
      ],
      severity: 'high',
      recommendation: 'Review and patch system vulnerabilities, audit service account permissions'
    },
    {
      id: 'pattern_004',
      name: 'Lateral Movement Pattern',
      confidence: 82,
      occurrences: 8,
      timespan: '09:00 - 10:15',
      description: 'Systematic network reconnaissance and host-to-host movement',
      indicators: [
        'Network scanning activities',
        'SMB/RDP connection attempts',
        'Cross-system authentication',
        'Remote command execution'
      ],
      severity: 'high',
      recommendation: 'Segment network and monitor east-west traffic for anomalous patterns'
    }
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-muted-foreground bg-muted',
      medium: 'text-warning-foreground bg-warning/10 border-warning/20',
      high: 'text-error-foreground bg-error/10 border-error/20',
      critical: 'text-error-foreground bg-error/20 border-error/30'
    };
    return colors?.[severity] || colors?.low;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success bg-success/10';
    if (confidence >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const handlePatternClick = (pattern) => {
    setSelectedPattern(selectedPattern?.id === pattern?.id ? null : pattern);
    onPatternSelect(pattern);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Pattern Analysis
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          onClick={onCreateRule}
        >
          Create Rule
        </Button>
      </div>
      {/* Patterns List */}
      <div className="divide-y divide-border">
        {detectedPatterns?.map((pattern) => (
          <div key={pattern?.id} className="p-4 hover:bg-muted/30 cursor-pointer transition-colors"
               onClick={() => handlePatternClick(pattern)}>
            <div className="space-y-3">
              {/* Pattern Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="text-base font-medium text-foreground">
                    {pattern?.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getSeverityColor(pattern?.severity)}`}>
                    {pattern?.severity?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${getConfidenceColor(pattern?.confidence)}`}>
                    {pattern?.confidence}% confidence
                  </span>
                  <Icon 
                    name={selectedPattern?.id === pattern?.id ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {/* Pattern Summary */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="RotateCw" size={14} />
                  <span>{pattern?.occurrences} occurrences</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{pattern?.timespan}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {pattern?.description}
              </p>

              {/* Expanded Details */}
              {selectedPattern?.id === pattern?.id && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  {/* Indicators */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Key Indicators:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pattern?.indicators?.map((indicator, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="CheckCircle" size={14} className="text-success" />
                          <span className="text-muted-foreground">{indicator}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">Recommendation:</h5>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <p className="text-sm text-foreground">
                        {pattern?.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View Events
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Shield"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Create Alert
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Add to Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pattern Statistics */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {detectedPatterns?.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Patterns Detected
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-error">
              {detectedPatterns?.filter(p => p?.severity === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Critical Patterns
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {detectedPatterns?.filter(p => p?.severity === 'high')?.length}
            </div>
            <div className="text-xs text-muted-foreground">
              High Risk Patterns
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-primary">
              {Math.round(detectedPatterns?.reduce((acc, p) => acc + p?.confidence, 0) / detectedPatterns?.length)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Avg Confidence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternAnalysis;