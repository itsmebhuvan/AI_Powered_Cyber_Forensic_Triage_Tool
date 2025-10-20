import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventDetailsPanel = ({ selectedEvent, onClose, onAddAnnotation, onMarkCritical }) => {
  if (!selectedEvent) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 text-center">
        <Icon name="Clock" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Select Timeline Event
        </h3>
        <p className="text-muted-foreground">
          Click on any event in the timeline to view detailed information and analysis.
        </p>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })?.format(timestamp);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-muted-foreground bg-muted',
      medium: 'text-warning-foreground bg-warning/10 border-warning/20',
      high: 'text-error-foreground bg-error/10 border-error/20',
      critical: 'text-error-foreground bg-error/20 border-error/30'
    };
    return colors?.[severity] || colors?.low;
  };

  const getTypeIcon = (type) => {
    const icons = {
      network_access: 'Wifi',
      file_access: 'File',
      data_exfiltration: 'Upload',
      malware_detection: 'Shield',
      system_shutdown: 'Power'
    };
    return icons?.[type] || 'AlertCircle';
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getTypeIcon(selectedEvent?.type)} 
            size={20} 
            className="text-primary" 
          />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Event Details
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          iconSize={16}
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      {/* Event Information */}
      <div className="p-4 space-y-4">
        {/* Title and Severity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-foreground">
              {selectedEvent?.title}
            </h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getSeverityColor(selectedEvent?.severity)}`}>
              {selectedEvent?.severity?.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedEvent?.description}
          </p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Timestamp:</span>
          <span className="text-muted-foreground font-mono">
            {formatTimestamp(selectedEvent?.timestamp)}
          </span>
        </div>

        {/* Source */}
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Database" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Source:</span>
          <span className="text-muted-foreground">
            {selectedEvent?.source}
          </span>
        </div>

        {/* Correlation ID */}
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Link" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Correlation ID:</span>
          <span className="text-muted-foreground font-mono">
            {selectedEvent?.correlationId}
          </span>
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Metadata:</span>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="space-y-2">
              {Object.entries(selectedEvent?.metadata)?.map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium text-foreground capitalize">
                    {key?.replace('_', ' ')}:
                  </span>
                  <span className="text-muted-foreground font-mono">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">AI Analysis:</span>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-foreground">
              This event shows characteristics of a coordinated attack pattern. The timing and correlation with other events suggest automated tooling was used. Recommend immediate investigation of related network traffic and system logs.
            </p>
          </div>
        </div>

        {/* Related Evidence */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="FileSearch" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Related Evidence:</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'network_log_20241020.pcap', type: 'Network Capture', size: '45.2 MB' },
              { name: 'system_events.evtx', type: 'System Log', size: '12.8 MB' },
              { name: 'memory_dump_083000.dmp', type: 'Memory Dump', size: '2.1 GB' }
            ]?.map((evidence, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="File" size={14} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {evidence?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {evidence?.type} • {evidence?.size}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconSize={14}
                  className="text-muted-foreground hover:text-foreground"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
            onClick={onAddAnnotation}
            className="flex-1"
          >
            Add Note
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Star"
            iconPosition="left"
            iconSize={14}
            onClick={onMarkCritical}
            className="flex-1"
          >
            Mark Critical
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPanel;