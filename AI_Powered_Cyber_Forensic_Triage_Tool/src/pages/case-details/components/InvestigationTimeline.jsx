import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvestigationTimeline = ({ timelineData }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  const eventTypes = {
    'Evidence Collection': { icon: 'Archive', color: 'bg-primary text-primary-foreground' },
    'Analysis': { icon: 'Search', color: 'bg-accent text-accent-foreground' },
    'Interview': { icon: 'MessageSquare', color: 'bg-success text-success-foreground' },
    'System Event': { icon: 'Server', color: 'bg-warning text-warning-foreground' },
    'Legal Action': { icon: 'Scale', color: 'bg-error text-error-foreground' },
    'Report': { icon: 'FileText', color: 'bg-secondary text-secondary-foreground' }
  };

  const filteredEvents = timelineData?.filter(event => {
    if (filterType !== 'all' && event?.type !== filterType) return false;
    if (timeRange !== 'all') {
      const eventDate = new Date(event.timestamp);
      const now = new Date();
      const daysDiff = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));
      
      if (timeRange === '7days' && daysDiff > 7) return false;
      if (timeRange === '30days' && daysDiff > 30) return false;
      if (timeRange === '90days' && daysDiff > 90) return false;
    }
    return true;
  });

  const sortedEvents = [...filteredEvents]?.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
              Investigation Timeline
            </h2>
            <p className="text-sm text-muted-foreground">
              Chronological view of all investigation activities and milestones
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Events</option>
              {Object.keys(eventTypes)?.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Timeline
            </Button>
          </div>
        </div>
      </div>
      {/* Timeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(eventTypes)?.map(([type, config]) => {
          const count = timelineData?.filter(event => event?.type === type)?.length;
          return (
            <div key={type} className="bg-card rounded-lg p-4 forensic-shadow-card">
              <div className="flex items-center justify-between mb-2">
                <Icon name={config?.icon} size={20} className="text-muted-foreground" />
                <span className="text-2xl font-bold text-foreground">{count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          );
        })}
      </div>
      {/* Timeline Events */}
      <div className="bg-card rounded-lg forensic-shadow-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Timeline Events ({sortedEvents?.length})
            </h3>
            <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
              Add Event
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {sortedEvents?.map((event, index) => (
                <div key={event?.id} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${eventTypes?.[event?.type]?.color || 'bg-muted text-muted-foreground'}`}>
                    <Icon name={eventTypes?.[event?.type]?.icon || 'Circle'} size={20} />
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 forensic-transition"
                      onClick={() => setSelectedEvent(selectedEvent === event?.id ? null : event?.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{event?.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{formatDate(event?.timestamp)}</p>
                          <p className="text-xs text-muted-foreground">{getRelativeTime(event?.timestamp)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">By: {event?.officer}</span>
                          {event?.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event?.priority === 'High' ? 'bg-error text-error-foreground' :
                              event?.priority === 'Medium' ? 'bg-warning text-warning-foreground' :
                              'bg-success text-success-foreground'
                            }`}>
                              {event?.priority}
                            </span>
                          )}
                        </div>
                        
                        <Icon 
                          name={selectedEvent === event?.id ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-muted-foreground" 
                        />
                      </div>
                    </div>
                    
                    {/* Expanded Event Details */}
                    {selectedEvent === event?.id && (
                      <div className="mt-4 bg-background rounded-lg p-4 border border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium text-muted-foreground mb-2">Event Details</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Event ID:</span>
                                  <span className="font-mono text-foreground">{event?.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Duration:</span>
                                  <span className="text-foreground">{event?.duration || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Location:</span>
                                  <span className="text-foreground">{event?.location || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span className="text-foreground">{event?.status}</span>
                                </div>
                              </div>
                            </div>
                            
                            {event?.attachments && event?.attachments?.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-muted-foreground mb-2">Attachments</h5>
                                <div className="space-y-2">
                                  {event?.attachments?.map((attachment, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                                      <span className="text-foreground">{attachment?.name}</span>
                                      <span className="text-muted-foreground">({attachment?.size})</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            {event?.notes && (
                              <div>
                                <h5 className="text-sm font-medium text-muted-foreground mb-2">Notes</h5>
                                <p className="text-sm text-foreground bg-muted rounded-lg p-3">
                                  {event?.notes}
                                </p>
                              </div>
                            )}
                            
                            {event?.relatedEvidence && event?.relatedEvidence?.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-muted-foreground mb-2">Related Evidence</h5>
                                <div className="space-y-2">
                                  {event?.relatedEvidence?.map((evidence, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <Icon name="Link" size={14} className="text-muted-foreground" />
                                      <span className="text-foreground">{evidence}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" size="sm" iconName="Edit">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" iconName="MessageSquare">
                                Add Note
                              </Button>
                              <Button variant="outline" size="sm" iconName="Paperclip">
                                Attach File
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-4 flex-col gap-2">
            <Icon name="Plus" size={24} />
            <span>Add Milestone</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex-col gap-2">
            <Icon name="Calendar" size={24} />
            <span>Schedule Event</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex-col gap-2">
            <Icon name="Users" size={24} />
            <span>Assign Task</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex-col gap-2">
            <Icon name="Bell" size={24} />
            <span>Set Reminder</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestigationTimeline;