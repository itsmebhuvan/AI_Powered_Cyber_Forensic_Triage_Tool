import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserManagementTab from './components/UserManagementTab';
import SystemConfigTab from './components/SystemConfigTab';
import PerformanceMonitoringTab from './components/PerformanceMonitoringTab';
import SecurityManagementTab from './components/SecurityManagementTab';

const SystemAdministration = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const adminTabs = [
    { 
      id: 'users', 
      label: 'User Management', 
      icon: 'Users',
      description: 'Manage investigator accounts and permissions'
    },
    { 
      id: 'config', 
      label: 'System Configuration', 
      icon: 'Settings',
      description: 'Configure platform settings and integrations'
    },
    { 
      id: 'performance', 
      label: 'Performance Monitoring', 
      icon: 'Activity',
      description: 'Monitor system metrics and performance'
    },
    { 
      id: 'security', 
      label: 'Security Management', 
      icon: 'Shield',
      description: 'Security events and compliance monitoring'
    }
  ];

  const systemStats = {
    totalUsers: 24,
    activeInvestigations: 12,
    systemUptime: "99.8%",
    storageUsed: "67%",
    lastBackup: "2 hours ago",
    securityAlerts: 3
  };

  const quickActions = [
    { 
      label: 'Create User Account', 
      icon: 'UserPlus', 
      action: () => console.log('Create user'),
      variant: 'default'
    },
    { 
      label: 'System Backup', 
      icon: 'HardDrive', 
      action: () => console.log('System backup'),
      variant: 'outline'
    },
    { 
      label: 'Security Scan', 
      icon: 'Shield', 
      action: () => console.log('Security scan'),
      variant: 'outline'
    },
    { 
      label: 'Export Logs', 
      icon: 'Download', 
      action: () => console.log('Export logs'),
      variant: 'outline'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'config':
        return <SystemConfigTab />;
      case 'performance':
        return <PerformanceMonitoringTab />;
      case 'security':
        return <SecurityManagementTab />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className={`forensic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">System Administration</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive platform configuration and user management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Refresh
                </Button>
                <Button
                  variant="default"
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={16}
                >
                  System Settings
                </Button>
              </div>
            </div>

            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="FolderOpen" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Cases</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.activeInvestigations}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.systemUptime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="HardDrive" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Storage</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.storageUsed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Database" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Backup</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.lastBackup}</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-error" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alerts</p>
                    <p className="text-lg font-semibold text-foreground">{systemStats?.securityAlerts}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface rounded-lg border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={action?.variant}
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={16}
                    onClick={action?.action}
                    className="justify-start"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            {/* Desktop Tabs */}
            <div className="hidden md:flex space-x-1 border-b border-border">
              {adminTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium rounded-t-lg forensic-transition ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} className="mr-2" />
                  {tab?.label}
                </button>
              ))}
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-2">
              {adminTabs?.map((tab) => (
                <div key={tab?.id} className="bg-surface rounded-lg border border-border">
                  <button
                    onClick={() => setActiveTab(activeTab === tab?.id ? '' : tab?.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center">
                      <Icon name={tab?.icon} size={18} className="mr-3 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">{tab?.label}</h3>
                        <p className="text-sm text-muted-foreground">{tab?.description}</p>
                      </div>
                    </div>
                    <Icon 
                      name={activeTab === tab?.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </button>
                  {activeTab === tab?.id && (
                    <div className="border-t border-border p-4">
                      {renderTabContent()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content - Desktop Only */}
          <div className="hidden md:block">
            <div className="bg-surface rounded-lg border border-border p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdministration;