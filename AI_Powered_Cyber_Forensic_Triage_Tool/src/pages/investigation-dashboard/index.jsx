import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import CasesTable from './components/CasesTable';
import ActivityFeed from './components/ActivityFeed';
import TimelineWidget from './components/TimelineWidget';
import AlertsPanel from './components/AlertsPanel';
import FilterControls from './components/FilterControls';

const InvestigationDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    investigator: 'all',
    crimeType: 'all',
    resultCount: 12,
    totalCount: 12
  });

  // Mock data for dashboard metrics
  const metrics = [
    {
      title: "Active Cases",
      value: "12",
      change: "+2 from last week",
      changeType: "increase",
      icon: "FolderOpen",
      color: "primary"
    },
    {
      title: "Pending Evidence",
      value: "8",
      change: "-3 from yesterday",
      changeType: "decrease",
      icon: "Upload",
      color: "warning"
    },
    {
      title: "Completed Analyses",
      value: "47",
      change: "+12 this week",
      changeType: "increase",
      icon: "CheckCircle",
      color: "success"
    },
    {
      title: "Critical Alerts",
      value: "3",
      change: "Requires attention",
      changeType: "neutral",
      icon: "AlertTriangle",
      color: "error"
    }
  ];

  // Mock data for active cases
  const cases = [
    {
      id: "case-001",
      caseId: "2024-001",
      crimeType: "Data Breach",
      status: "Active",
      priority: "Critical",
      investigator: "Sarah Chen",
      lastActivity: "2 hours ago",
      icon: "Shield"
    },
    {
      id: "case-002",
      caseId: "2024-002",
      crimeType: "Phishing Attack",
      status: "Pending",
      priority: "High",
      investigator: "Michael Rodriguez",
      lastActivity: "4 hours ago",
      icon: "Mail"
    },
    {
      id: "case-003",
      caseId: "2024-003",
      crimeType: "Malware Analysis",
      status: "Active",
      priority: "Medium",
      investigator: "David Kim",
      lastActivity: "1 day ago",
      icon: "Bug"
    },
    {
      id: "case-004",
      caseId: "2024-004",
      crimeType: "Financial Fraud",
      status: "On Hold",
      priority: "High",
      investigator: "Emily Watson",
      lastActivity: "2 days ago",
      icon: "CreditCard"
    },
    {
      id: "case-005",
      caseId: "2024-005",
      crimeType: "Identity Theft",
      status: "Active",
      priority: "Medium",
      investigator: "James Thompson",
      lastActivity: "3 hours ago",
      icon: "User"
    },
    {
      id: "case-006",
      caseId: "2024-006",
      crimeType: "Ransomware",
      status: "Completed",
      priority: "Critical",
      investigator: "Sarah Chen",
      lastActivity: "1 week ago",
      icon: "Lock"
    }
  ];

  // Mock data for recent activities
  const activities = [
    {
      id: "activity-001",
      type: "ai_detection",
      title: "AI Anomaly Detected",
      description: "Suspicious network traffic pattern identified in Case 2024-001",
      timestamp: new Date(Date.now() - 300000),
      caseId: "2024-001",
      metadata: ["High Risk", "Network Analysis"]
    },
    {
      id: "activity-002",
      type: "evidence_upload",
      title: "Evidence Uploaded",
      description: "Digital forensic image uploaded for malware analysis",
      timestamp: new Date(Date.now() - 900000),
      caseId: "2024-003",
      metadata: ["Disk Image", "256GB"]
    },
    {
      id: "activity-003",
      type: "milestone",
      title: "Investigation Milestone",
      description: "Timeline reconstruction completed for phishing case",
      timestamp: new Date(Date.now() - 1800000),
      caseId: "2024-002",
      metadata: ["Timeline", "Completed"]
    },
    {
      id: "activity-004",
      type: "analysis_complete",
      title: "Analysis Complete",
      description: "Email forensic analysis finished with 15 suspicious attachments found",
      timestamp: new Date(Date.now() - 3600000),
      caseId: "2024-004",
      metadata: ["Email Analysis", "15 Threats"]
    },
    {
      id: "activity-005",
      type: "report_generated",
      title: "Report Generated",
      description: "Comprehensive forensic report created for ransomware investigation",
      timestamp: new Date(Date.now() - 7200000),
      caseId: "2024-006",
      metadata: ["Final Report", "PDF"]
    }
  ];

  // Mock data for timeline widget
  const timelineData = [
    {
      caseId: "2024-001",
      crimeType: "Data Breach",
      progress: 75,
      milestones: [
        { name: "Evidence", phase: "evidence_collection", completed: true, date: "Oct 15" },
        { name: "Analysis", phase: "analysis", completed: true, date: "Oct 17" },
        { name: "Investigation", phase: "investigation", completed: false, date: "Oct 20" },
        { name: "Report", phase: "reporting", completed: false, date: "Oct 25" }
      ]
    },
    {
      caseId: "2024-002",
      crimeType: "Phishing Attack",
      progress: 60,
      milestones: [
        { name: "Evidence", phase: "evidence_collection", completed: true, date: "Oct 16" },
        { name: "Analysis", phase: "analysis", completed: true, date: "Oct 18" },
        { name: "Investigation", phase: "investigation", completed: false, date: "Oct 22" },
        { name: "Report", phase: "reporting", completed: false, date: "Oct 26" }
      ]
    },
    {
      caseId: "2024-003",
      crimeType: "Malware Analysis",
      progress: 40,
      milestones: [
        { name: "Evidence", phase: "evidence_collection", completed: true, date: "Oct 18" },
        { name: "Analysis", phase: "analysis", completed: false, date: "Oct 21" },
        { name: "Investigation", phase: "investigation", completed: false, date: "Oct 24" },
        { name: "Report", phase: "reporting", completed: false, date: "Oct 28" }
      ]
    }
  ];

  // Mock data for alerts
  const alerts = [
    {
      id: "alert-001",
      type: "critical",
      severity: "critical",
      title: "Suspicious Activity Detected",
      message: "Multiple failed login attempts detected from foreign IP addresses in Case 2024-001",
      timestamp: new Date(Date.now() - 120000),
      caseId: "2024-001",
      actions: [
        { type: "investigate", label: "Investigate", primary: true },
        { type: "block", label: "Block IP", primary: false }
      ]
    },
    {
      id: "alert-002",
      type: "system",
      severity: "high",
      title: "Evidence Processing Queue Full",
      message: "Evidence processing queue is at 95% capacity. Consider scaling resources.",
      timestamp: new Date(Date.now() - 900000),
      actions: [
        { type: "scale", label: "Scale Resources", primary: true },
        { type: "monitor", label: "Monitor", primary: false }
      ]
    },
    {
      id: "alert-003",
      type: "anomaly",
      severity: "medium",
      title: "AI Model Confidence Low",
      message: "Anomaly detection model showing reduced confidence in recent analyses",
      timestamp: new Date(Date.now() - 1800000),
      caseId: "2024-003",
      actions: [
        { type: "retrain", label: "Retrain Model", primary: true }
      ]
    }
  ];

  const handleCaseSelect = (caseId) => {
    window.location.href = '/case-details';
  };

  const handleQuickAction = (action) => {
    if (action === 'upload') {
      console.log('Opening evidence upload dialog');
    } else if (action === 'new-case') {
      console.log('Creating new case');
    }
  };

  const handleAlertAction = (alertId, actionType) => {
    console.log(`Alert ${alertId} action: ${actionType}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      investigator: 'all',
      crimeType: 'all',
      resultCount: 12,
      totalCount: 12
    });
  };

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
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Investigation Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor active cases, track investigation progress, and manage forensic analysis workflows
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Cases Table - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <CasesTable
                cases={cases}
                onCaseSelect={handleCaseSelect}
                onQuickAction={handleQuickAction}
              />
            </div>

            {/* Activity Feed - Takes 1 column on xl screens */}
            <div>
              <ActivityFeed activities={activities} />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Timeline Widget */}
            <TimelineWidget timelineData={timelineData} />

            {/* Alerts Panel */}
            <AlertsPanel
              alerts={alerts}
              onAlertAction={handleAlertAction}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestigationDashboard;