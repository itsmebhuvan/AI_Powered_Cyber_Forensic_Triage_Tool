import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineWidget = ({ timelineData }) => {
  const [selectedCase, setSelectedCase] = useState(null);

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'evidence_collection':
        return 'bg-primary';
      case 'analysis':
        return 'bg-warning';
      case 'investigation':
        return 'bg-accent';
      case 'reporting':
        return 'bg-success';
      case 'completed':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'evidence_collection':
        return 'Upload';
      case 'analysis':
        return 'Search';
      case 'investigation':
        return 'Microscope';
      case 'reporting':
        return 'FileText';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Investigation Timeline</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {timelineData?.map((caseTimeline) => (
            <div key={caseTimeline?.caseId} className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {caseTimeline?.caseId}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {caseTimeline?.crimeType}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {caseTimeline?.progress}% Complete
                </span>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${caseTimeline?.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  {caseTimeline?.milestones?.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setSelectedCase(selectedCase === `${caseTimeline?.caseId}-${index}` ? null : `${caseTimeline?.caseId}-${index}`)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone?.completed 
                          ? getPhaseColor(milestone?.phase) + 'text-white' :'bg-muted text-muted-foreground'
                      } transition-all duration-200 hover:scale-110`}>
                        <Icon name={getPhaseIcon(milestone?.phase)} size={14} />
                      </div>
                      
                      <span className="text-xs text-muted-foreground mt-1 text-center">
                        {milestone?.name}
                      </span>
                      
                      {milestone?.date && (
                        <span className="text-xs text-muted-foreground">
                          {milestone?.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedCase === `${caseTimeline?.caseId}-${caseTimeline?.milestones?.findIndex(m => m?.selected)}` && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">Milestone Details</p>
                      <p className="text-muted-foreground">
                        Current phase: Evidence analysis in progress with AI anomaly detection
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-muted-foreground">
                          Started: Oct 15, 2024
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Est. Completion: Oct 25, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
            View Detailed Timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineWidget;