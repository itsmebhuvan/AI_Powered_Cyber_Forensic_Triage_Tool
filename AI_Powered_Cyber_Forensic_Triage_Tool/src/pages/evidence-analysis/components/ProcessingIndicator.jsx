import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ processingJobs }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'processing': return 'text-primary bg-primary/10 border-primary/20';
      case 'queued': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader';
      case 'queued': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const calculateProgress = (job) => {
    if (job?.status === 'completed') return 100;
    if (job?.status === 'failed') return 0;
    if (job?.status === 'queued') return 0;
    
    const elapsed = (currentTime - new Date(job.startTime)) / 1000;
    const estimated = job?.estimatedDuration;
    return Math.min((elapsed / estimated) * 100, 95);
  };

  const activeJobs = processingJobs?.filter(job => job?.status === 'processing' || job?.status === 'queued');
  const completedJobs = processingJobs?.filter(job => job?.status === 'completed' || job?.status === 'failed');

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">Processing Status</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              <span className="text-sm text-muted-foreground">{activeJobs?.length} Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">{completedJobs?.length} Completed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Active Processing Jobs */}
        {activeJobs?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-4">Active Processing</h4>
            <div className="space-y-4">
              {activeJobs?.map((job) => {
                const progress = calculateProgress(job);
                return (
                  <div key={job?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <Icon 
                          name={getStatusIcon(job?.status)} 
                          size={20} 
                          className={`mr-3 ${job?.status === 'processing' ? 'animate-spin' : ''} ${
                            job?.status === 'processing' ? 'text-primary' : 'text-warning'
                          }`} 
                        />
                        <div>
                          <h5 className="font-medium text-foreground">{job?.fileName}</h5>
                          <p className="text-sm text-muted-foreground">{job?.analysisType}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(job?.status)}`}>
                        {job?.status?.charAt(0)?.toUpperCase() + job?.status?.slice(1)}
                      </div>
                    </div>
                    {job?.status === 'processing' && (
                      <>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-foreground">Progress</span>
                            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full forensic-transition"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Started:</span>
                            <p className="text-foreground">{new Date(job.startTime)?.toLocaleTimeString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Estimated Remaining:</span>
                            <p className="text-foreground">
                              {formatTimeRemaining(Math.max(0, job?.estimatedDuration - (currentTime - new Date(job.startTime)) / 1000))}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current Stage:</span>
                            <p className="text-foreground">{job?.currentStage}</p>
                          </div>
                        </div>
                      </>
                    )}
                    {job?.status === 'queued' && (
                      <div className="text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Queue Position:</span>
                          <span className="text-foreground font-medium">#{job?.queuePosition}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-muted-foreground">Estimated Start:</span>
                          <span className="text-foreground">{job?.estimatedStart}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Completed Jobs */}
        {completedJobs?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-4">Recent Completions</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {completedJobs?.slice(0, 5)?.map((job) => (
                <div key={job?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Icon 
                      name={getStatusIcon(job?.status)} 
                      size={16} 
                      className={`mr-3 ${job?.status === 'completed' ? 'text-success' : 'text-error'}`} 
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">{job?.fileName}</p>
                      <p className="text-xs text-muted-foreground">{job?.analysisType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{job?.completedAt}</p>
                    <p className="text-xs text-muted-foreground">
                      {job?.status === 'completed' ? `${job?.duration}` : 'Failed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Active Jobs */}
        {activeJobs?.length === 0 && completedJobs?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Zap" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No Active Processing</h4>
            <p className="text-sm text-muted-foreground">
              Start an analysis to see processing status and progress indicators here.
            </p>
          </div>
        )}

        {/* System Resources */}
        {activeJobs?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-foreground mb-4">System Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">CPU Usage</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Memory</span>
                  <span className="text-sm text-muted-foreground">4.2GB / 8GB</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Queue Capacity</span>
                  <span className="text-sm text-muted-foreground">{activeJobs?.length} / 10</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: `${(activeJobs?.length / 10) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingIndicator;