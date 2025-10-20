import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TimelineVisualization from './components/TimelineVisualization';
import EventDetailsPanel from './components/EventDetailsPanel';
import TimelineControls from './components/TimelineControls';
import PatternAnalysis from './components/PatternAnalysis';
import TimelineComparison from './components/TimelineComparison';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TimelineReconstruction = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    currentTime: 0,
    speed: 1
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    source: 'all',
    eventType: 'all',
    severity: 'all',
    search: '',
    correlationId: ''
  });

  // Mock current case data
  const currentCase = {
    id: 'case_2024_001',
    name: 'Corporate Network Breach Investigation',
    status: 'active',
    investigator: 'Agent Sarah Chen',
    created: '2024-10-20',
    lastUpdated: '2024-10-20T10:15:08',
    totalEvents: 156,
    criticalEvents: 12,
    timespan: '2024-10-20 08:30 - 10:15'
  };

  // Mock events data for TimelineVisualization component
  const events = [
    {
      id: 'evt_001',
      timestamp: '2024-10-20T08:30:15',
      type: 'network_access',
      severity: 'medium',
      source: 'firewall',
      description: 'Suspicious login attempt detected'
    },
    {
      id: 'evt_002', 
      timestamp: '2024-10-20T09:15:32',
      type: 'file_access',
      severity: 'high',
      source: 'endpoint',
      description: 'Unauthorized file access detected'
    }
  ];

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handlePlaybackControl = (action) => {
    switch (action) {
      case 'toggle':
        setPlaybackState(prev => ({
          ...prev,
          isPlaying: !prev?.isPlaying
        }));
        break;
      case 'reset':
        setPlaybackState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0
        }));
        break;
      default:
        break;
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting timeline as ${format}`);
    // Mock export functionality
  };

  const handleCompareTimelines = () => {
    setShowComparison(true);
  };

  const handleGenerateReport = () => {
    window.location.href = '/report-generation';
  };

  const handlePatternSelect = (pattern) => {
    console.log('Selected pattern:', pattern);
  };

  const handleCreateRule = () => {
    console.log('Creating new detection rule');
  };

  const handleAddAnnotation = () => {
    console.log('Adding annotation to event:', selectedEvent?.id);
  };

  const handleMarkCritical = () => {
    console.log('Marking event as critical:', selectedEvent?.id);
  };

  const handleComparisonSubmit = (comparisonData) => {
    console.log('Comparing timelines:', comparisonData);
    // Mock comparison logic
  };

  const tabs = [
    { id: 'timeline', label: 'Timeline View', icon: 'Clock' },
    { id: 'patterns', label: 'Pattern Analysis', icon: 'TrendingUp' },
    { id: 'correlations', label: 'Correlations', icon: 'GitBranch' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Clock" size={24} className="text-primary" />
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Timeline Reconstruction
                </h1>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Case: {currentCase?.name}</span>
                <span>•</span>
                <span>Events: {currentCase?.totalEvents}</span>
                <span>•</span>
                <span>Timespan: {currentCase?.timespan}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={14}
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={14}
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Timeline Controls */}
          <TimelineControls
            filters={filters}
            onFiltersChange={setFilters}
            onExport={handleExport}
            onCompareTimelines={handleCompareTimelines}
            onGenerateReport={handleGenerateReport}
          />

          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Primary Timeline View */}
            <div className="xl:col-span-2 space-y-6">
              {activeTab === 'timeline' && (
                <TimelineVisualization
                  events={events}
                  selectedEvent={selectedEvent}
                  onEventSelect={handleEventSelect}
                  filters={filters}
                  zoomLevel={zoomLevel}
                  onZoomChange={setZoomLevel}
                  playbackState={playbackState}
                  onPlaybackControl={handlePlaybackControl}
                />
              )}

              {activeTab === 'patterns' && (
                <PatternAnalysis
                  onPatternSelect={handlePatternSelect}
                  onCreateRule={handleCreateRule}
                />
              )}

              {activeTab === 'correlations' && (
                <div className="bg-surface border border-border rounded-lg p-8 text-center">
                  <Icon name="GitBranch" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    Correlation Analysis
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced correlation analysis between timeline events and evidence sources.
                  </p>
                  <Button variant="outline" iconName="Play" iconPosition="left" iconSize={14}>
                    Start Analysis
                  </Button>
                </div>
              )}
            </div>

            {/* Event Details Panel */}
            <div className="space-y-6">
              <EventDetailsPanel
                selectedEvent={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onAddAnnotation={handleAddAnnotation}
                onMarkCritical={handleMarkCritical}
              />

              {/* Quick Stats */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-base font-heading font-medium text-foreground mb-4">
                  Investigation Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Events</span>
                    <span className="font-medium text-foreground">{currentCase?.totalEvents}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Critical Events</span>
                    <span className="font-medium text-error">{currentCase?.criticalEvents}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Patterns Detected</span>
                    <span className="font-medium text-warning">4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Evidence Sources</span>
                    <span className="font-medium text-foreground">5</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-base font-heading font-medium text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={14}
                    onClick={handleGenerateReport}
                    className="w-full justify-start"
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => handleExport('pdf')}
                    className="w-full justify-start"
                  >
                    Export Timeline
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full justify-start"
                  >
                    Share Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Timeline Comparison Modal */}
      <TimelineComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onCompare={handleComparisonSubmit}
      />
    </div>
  );
};

export default TimelineReconstruction;