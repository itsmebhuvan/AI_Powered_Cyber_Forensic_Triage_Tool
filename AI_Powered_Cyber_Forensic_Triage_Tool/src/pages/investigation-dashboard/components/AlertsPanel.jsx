import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts, onAlertAction }) => {
  const [filter, setFilter] = useState('all');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'security':
        return 'Shield';
      case 'anomaly':
        return 'Zap';
      case 'system':
        return 'Server';
      case 'evidence':
        return 'FileSearch';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-error bg-error/5 text-error';
      case 'high':
        return 'border-l-warning bg-warning/5 text-warning';
      case 'medium':
        return 'border-l-accent bg-accent/5 text-accent';
      default:
        return 'border-l-muted bg-muted/5 text-muted-foreground';
    }
  };

  const filteredAlerts = alerts?.filter(alert => 
    filter === 'all' || alert?.severity === filter
  );

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Critical Alerts</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground"
            >
              <option value="all">All Alerts</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert?.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name={getAlertIcon(alert?.type)} size={18} />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      {alert?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert?.message}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                      {alert?.caseId && (
                        <span className="font-mono">{alert?.caseId}</span>
                      )}
                      <span className="capitalize">{alert?.severity}</span>
                    </div>
                    
                    {alert?.actions && (
                      <div className="flex items-center space-x-2 mt-3">
                        {alert?.actions?.map((action, index) => (
                          <Button
                            key={index}
                            variant={action?.primary ? "default" : "outline"}
                            size="xs"
                            onClick={() => onAlertAction(alert?.id, action?.type)}
                          >
                            {action?.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAlertAction(alert?.id, 'dismiss')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAlerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No alerts matching current filter</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;