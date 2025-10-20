import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'evidence_upload':
        return 'Upload';
      case 'ai_detection':
        return 'Zap';
      case 'milestone':
        return 'Flag';
      case 'analysis_complete':
        return 'CheckCircle';
      case 'report_generated':
        return 'FileText';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'evidence_upload':
        return 'text-primary';
      case 'ai_detection':
        return 'text-warning';
      case 'milestone':
        return 'text-success';
      case 'analysis_complete':
        return 'text-success';
      case 'report_generated':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                
                {activity?.caseId && (
                  <div className="flex items-center mt-2">
                    <Icon name="FolderOpen" size={12} className="text-muted-foreground mr-1" />
                    <span className="text-xs font-mono text-muted-foreground">{activity?.caseId}</span>
                  </div>
                )}
                
                {activity?.metadata && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {activity?.metadata?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;