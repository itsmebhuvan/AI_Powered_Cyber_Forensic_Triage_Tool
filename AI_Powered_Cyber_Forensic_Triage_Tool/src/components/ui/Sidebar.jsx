import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [activeSection, setActiveSection] = useState('cases');
  const [processingStatus, setProcessingStatus] = useState({
    active: true,
    progress: 67,
    operation: 'Evidence Analysis'
  });

  const navigationSections = [
    {
      id: 'cases',
      label: 'Cases',
      icon: 'FolderOpen',
      items: [
        { label: 'Investigation Dashboard', path: '/investigation-dashboard', icon: 'LayoutDashboard' },
        { label: 'Case Details', path: '/case-details', icon: 'FileSearch' }
      ],
      badge: { count: 3, type: 'active' }
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: 'Search',
      items: [
        { label: 'Evidence Analysis', path: '/evidence-analysis', icon: 'Microscope' },
        { label: 'Timeline Reconstruction', path: '/timeline-reconstruction', icon: 'Clock' }
      ],
      processing: processingStatus?.active
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'FileText',
      items: [
        { label: 'Report Generation', path: '/report-generation', icon: 'FileOutput' }
      ]
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: 'Settings',
      items: [
        { label: 'System Administration', path: '/system-administration', icon: 'Server' }
      ]
    }
  ];

  const alerts = [
    { id: 1, type: 'critical', message: 'Suspicious activity detected in Case #2024-001', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Evidence processing queue at 85% capacity', time: '15 min ago' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-100 forensic-transition ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-heading font-medium text-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Processing Status Monitor */}
        {processingStatus?.active && !isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{processingStatus?.operation}</span>
                <span className="text-xs text-muted-foreground">{processingStatus?.progress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full forensic-transition"
                  style={{ width: `${processingStatus?.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationSections?.map((section) => (
              <div key={section?.id}>
                <button
                  onClick={() => handleSectionClick(section?.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg forensic-transition ${
                    activeSection === section?.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon name={section?.icon} size={18} />
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium">{section?.label}</span>
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                      {section?.badge && (
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                          section?.badge?.type === 'active' ?'bg-accent text-accent-foreground' :'bg-muted text-muted-foreground'
                        }`}>
                          {section?.badge?.count}
                        </span>
                      )}
                      {section?.processing && (
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></div>
                      )}
                      <Icon 
                        name={activeSection === section?.id ? "ChevronDown" : "ChevronRight"} 
                        size={14} 
                      />
                    </div>
                  )}
                </button>

                {/* Subsection Items */}
                {activeSection === section?.id && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section?.items?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className="w-full flex items-center p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md forensic-transition"
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick Actions Toolbar */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={14}
                  className="text-xs"
                >
                  Upload
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                  className="text-xs"
                >
                  New Case
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Alert Notifications */}
        {!isCollapsed && alerts?.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Alerts
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {alerts?.map((alert) => (
                  <div
                    key={alert?.id}
                    className={`p-2 rounded-md text-xs ${
                      alert?.type === 'critical' ?'bg-error/10 text-error border border-error/20' :'bg-warning/10 text-warning border border-warning/20'
                    }`}
                  >
                    <p className="font-medium mb-1">{alert?.message}</p>
                    <span className="text-muted-foreground">{alert?.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Case Status Indicator */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">3</span>
              </div>
              {processingStatus?.active && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;