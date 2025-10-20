import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ReportTemplateSelector from './components/ReportTemplateSelector';
import ContentBuilder from './components/ContentBuilder';
import ReportPreview from './components/ReportPreview';
import ExportOptions from './components/ExportOptions';
import ReportVersioning from './components/ReportVersioning';

const ReportGeneration = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportContent, setReportContent] = useState({ sections: [] });
  const [isExporting, setIsExporting] = useState(false);
  const [aiGenerationProgress, setAiGenerationProgress] = useState(0);
  const [showAiGeneration, setShowAiGeneration] = useState(false);

  // Initialize report content when template is selected
  useEffect(() => {
    if (selectedTemplate && reportContent?.sections?.length === 0) {
      const initialContent = {
        metadata: {
          templateId: selectedTemplate?.id,
          templateName: selectedTemplate?.name,
          createdDate: new Date()?.toISOString(),
          lastModified: new Date()?.toISOString()
        },
        sections: selectedTemplate?.sections?.map((sectionName, index) => ({
          id: `section-${index}`,
          name: sectionName,
          components: []
        }))
      };
      setReportContent(initialContent);
    }
  }, [selectedTemplate, reportContent?.sections?.length]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveTab('builder');
  };

  const handleContentUpdate = (newContent) => {
    setReportContent({
      ...newContent,
      metadata: {
        ...newContent?.metadata,
        lastModified: new Date()?.toISOString()
      }
    });
  };

  const handleExport = (exportConfig) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real application, this would trigger the actual export
      console.log('Exporting report with config:', exportConfig);
    }, 3000);
  };

  const handleAiGeneration = () => {
    setShowAiGeneration(true);
    setAiGenerationProgress(0);
    
    // Simulate AI generation progress
    const interval = setInterval(() => {
      setAiGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowAiGeneration(false);
          // Auto-populate content with AI-generated sections
          handleAiContentGeneration();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleAiContentGeneration = () => {
    if (!selectedTemplate) return;

    const aiGeneratedContent = {
      ...reportContent,
      sections: reportContent?.sections?.map((section, index) => {
        // Add AI-generated components based on section type
        const aiComponents = [];
        
        if (section?.name?.toLowerCase()?.includes('summary') || section?.name?.toLowerCase()?.includes('overview')) {
          aiComponents?.push({
            id: `ai-summary-${Date.now()}`,
            type: 'text',
            name: 'AI-Generated Case Summary',
            content: `**Executive Summary**\n\nThis investigation involves a sophisticated Advanced Persistent Threat (APT) targeting critical infrastructure systems. Our AI analysis has identified 47 distinct attack vectors, 12 compromised endpoints, and evidence of data exfiltration spanning a 3-month period.\n\n**Key Findings:**\n• Initial compromise via spear-phishing email on September 15, 2024\n• Lateral movement through network shares and RDP connections\n• Deployment of custom malware with C2 communication\n• Attempted access to sensitive financial databases\n\n**Risk Assessment:** HIGH - Immediate containment and remediation required`
          });
        }
        
        if (section?.name?.toLowerCase()?.includes('evidence')) {
          aiComponents?.push({
            id: `ai-evidence-${Date.now()}`,
            type: 'table',
            name: 'Evidence Analysis Summary',
            content: [
              { id: 'EV001', type: 'Network Logs', source: 'Firewall', hash: 'SHA256:a1b2c3...', status: 'Verified', aiConfidence: '98%' },
              { id: 'EV002', type: 'Malware Sample', source: 'Endpoint-07', hash: 'SHA256:d4e5f6...', status: 'Analyzed', aiConfidence: '95%' },
              { id: 'EV003', type: 'Memory Dump', source: 'Server-DB01', hash: 'SHA256:g7h8i9...', status: 'Processing', aiConfidence: '87%' }
            ]
          });
        }
        
        if (section?.name?.toLowerCase()?.includes('timeline')) {
          aiComponents?.push({
            id: `ai-timeline-${Date.now()}`,
            type: 'chart',
            name: 'AI-Reconstructed Attack Timeline',
            content: 'Interactive timeline showing 23 key events from initial compromise to detection'
          });
        }

        return {
          ...section,
          components: [...(section?.components || []), ...aiComponents]
        };
      })
    };

    setReportContent(aiGeneratedContent);
  };

  const handleVersionSelect = (version) => {
    console.log('Selected version:', version);
  };

  const handleApprovalAction = (stepId, action) => {
    console.log('Approval action:', stepId, action);
  };

  const navigationTabs = [
    { id: 'template', name: 'Template', icon: 'FileTemplate', description: 'Choose report format' },
    { id: 'builder', name: 'Content', icon: 'Edit', description: 'Build report sections' },
    { id: 'preview', name: 'Preview', icon: 'Eye', description: 'Review final report' },
    { id: 'export', name: 'Export', icon: 'Download', description: 'Generate and distribute' },
    { id: 'versions', name: 'Versions', icon: 'GitBranch', description: 'Manage versions' }
  ];

  const quickActions = [
    { name: 'New Case Report', icon: 'Plus', action: () => navigate('/case-details') },
    { name: 'Evidence Analysis', icon: 'Search', action: () => navigate('/evidence-analysis') },
    { name: 'Timeline View', icon: 'Clock', action: () => navigate('/timeline-reconstruction') },
    { name: 'Investigation Dashboard', icon: 'LayoutDashboard', action: () => navigate('/investigation-dashboard') }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 forensic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Report Generation
                </h1>
                <p className="text-muted-foreground">
                  Create comprehensive forensic reports with AI-powered insights and structured evidence presentation
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {selectedTemplate && (
                  <Button
                    variant="outline"
                    iconName="Sparkles"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleAiGeneration}
                    disabled={showAiGeneration}
                  >
                    {showAiGeneration ? 'Generating...' : 'AI Generate'}
                  </Button>
                )}
                
                <div className="flex items-center space-x-2">
                  {quickActions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      iconName={action?.icon}
                      iconSize={16}
                      onClick={action?.action}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {action?.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md forensic-transition ${
                    activeTab === tab?.id
                      ? 'bg-surface text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  disabled={tab?.id !== 'template' && !selectedTemplate}
                >
                  <Icon name={tab?.icon} size={16} className="mr-2" />
                  <div className="text-left">
                    <div>{tab?.name}</div>
                    <div className="text-xs opacity-70">{tab?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generation Progress */}
          {showAiGeneration && (
            <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Icon name="Sparkles" size={18} className="text-primary mr-2" />
                  <span className="font-medium text-foreground">AI Report Generation</span>
                </div>
                <span className="text-sm text-muted-foreground">{aiGenerationProgress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2 mb-2">
                <div 
                  className="bg-primary h-2 rounded-full forensic-transition"
                  style={{ width: `${aiGenerationProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Analyzing case data and generating comprehensive report sections...
              </p>
            </div>
          )}

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'template' && (
              <ReportTemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
              />
            )}

            {activeTab === 'builder' && (
              <ContentBuilder
                selectedTemplate={selectedTemplate}
                reportContent={reportContent}
                onContentUpdate={handleContentUpdate}
              />
            )}

            {activeTab === 'preview' && (
              <ReportPreview
                selectedTemplate={selectedTemplate}
                reportContent={reportContent}
                onExport={handleExport}
              />
            )}

            {activeTab === 'export' && (
              <ExportOptions
                onExport={handleExport}
                isExporting={isExporting}
              />
            )}

            {activeTab === 'versions' && (
              <ReportVersioning
                onVersionSelect={handleVersionSelect}
                onApprovalAction={handleApprovalAction}
              />
            )}
          </div>

          {/* Status Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
            <div className={`forensic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedTemplate ? selectedTemplate?.name : 'No template selected'}
                    </span>
                  </div>
                  
                  {reportContent?.sections?.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Layers" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {reportContent?.sections?.length} sections
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Last saved: {new Date()?.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Save" iconSize={16}>
                    Auto-save enabled
                  </Button>
                  {selectedTemplate && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      iconName="Share" 
                      iconPosition="left" 
                      iconSize={16}
                    >
                      Share Report
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportGeneration;