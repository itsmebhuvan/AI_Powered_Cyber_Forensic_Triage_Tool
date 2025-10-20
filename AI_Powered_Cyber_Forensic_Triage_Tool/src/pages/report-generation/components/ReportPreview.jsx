import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreview = ({ selectedTemplate, reportContent, onExport }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showMetadata, setShowMetadata] = useState(false);

  const mockReportData = {
    caseId: 'CYBER-2024-001',
    title: 'Advanced Persistent Threat Investigation Report',
    investigator: 'Agent Sarah Mitchell',
    organization: 'Federal Cybersecurity Division',
    dateGenerated: new Date()?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    classification: 'CONFIDENTIAL',
    pageCount: 23,
    version: '1.2',
    approvalStatus: 'Pending Review'
  };

  const exportFormats = [
    { id: 'pdf-standard', name: 'PDF (Standard)', icon: 'FileText', description: 'Standard PDF for general distribution' },
    { id: 'pdf-encrypted', name: 'PDF (Encrypted)', icon: 'Lock', description: 'Password-protected PDF for secure sharing' },
    { id: 'docx', name: 'Word Document', icon: 'FileEdit', description: 'Editable Word document for collaboration' },
    { id: 'html', name: 'Web Report', icon: 'Globe', description: 'Interactive HTML report with navigation' }
  ];

  const handleExport = (format) => {
    onExport(format);
  };

  if (!selectedTemplate || !reportContent) {
    return (
      <div className="bg-surface rounded-lg border border-border forensic-shadow-card p-8 text-center">
        <Icon name="Eye" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Preview Available
        </h3>
        <p className="text-muted-foreground">
          Build your report content to see the preview
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Report Preview</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time preview of your forensic report
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Preview Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md forensic-transition ${
                  previewMode === 'desktop' ?'bg-surface text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Monitor" size={14} className="mr-1" />
                Desktop
              </button>
              <button
                onClick={() => setPreviewMode('print')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md forensic-transition ${
                  previewMode === 'print' ?'bg-surface text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Printer" size={14} className="mr-1" />
                Print
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="Info"
              iconPosition="left"
              iconSize={16}
              onClick={() => setShowMetadata(!showMetadata)}
            >
              Info
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex flex-wrap gap-2">
          {exportFormats?.map((format) => (
            <Button
              key={format?.id}
              variant="outline"
              size="sm"
              iconName={format?.icon}
              iconPosition="left"
              iconSize={14}
              onClick={() => handleExport(format)}
              className="text-xs"
            >
              {format?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex h-96">
        {/* Report Metadata Sidebar */}
        {showMetadata && (
          <div className="w-64 border-r border-border p-4 overflow-y-auto bg-muted/30">
            <h3 className="text-sm font-heading font-medium text-foreground mb-4">
              Report Metadata
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Case Information
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Case ID:</span>
                    <span className="text-xs font-medium text-foreground">{mockReportData?.caseId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Investigator:</span>
                    <span className="text-xs font-medium text-foreground">{mockReportData?.investigator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Classification:</span>
                    <span className="text-xs font-medium text-warning">{mockReportData?.classification}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Document Details
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Pages:</span>
                    <span className="text-xs font-medium text-foreground">{mockReportData?.pageCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Version:</span>
                    <span className="text-xs font-medium text-foreground">{mockReportData?.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Status:</span>
                    <span className="text-xs font-medium text-accent">{mockReportData?.approvalStatus}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Template Info
                </label>
                <div className="mt-2">
                  <p className="text-xs text-foreground font-medium">{selectedTemplate?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedTemplate?.estimatedPages} pages</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-background">
          <div className={`mx-auto bg-surface shadow-lg ${
            previewMode === 'desktop' ? 'max-w-4xl' : 'max-w-2xl'
          }`}>
            {/* Report Header */}
            <div className="p-8 border-b border-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Icon name="Shield" size={24} color="white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-heading font-bold text-foreground">
                        {mockReportData?.organization}
                      </h1>
                      <p className="text-sm text-muted-foreground">Digital Forensics Division</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {mockReportData?.title}
                  </h2>
                  <p className="text-muted-foreground">Case ID: {mockReportData?.caseId}</p>
                </div>
                
                <div className="text-right">
                  <div className="bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {mockReportData?.classification}
                  </div>
                  <p className="text-sm text-muted-foreground">Generated: {mockReportData?.dateGenerated}</p>
                  <p className="text-sm text-muted-foreground">Version: {mockReportData?.version}</p>
                </div>
              </div>
            </div>

            {/* Report Sections Preview */}
            <div className="p-8 space-y-8">
              {reportContent?.sections?.map((section, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    {index + 1}. {section?.name}
                  </h3>
                  
                  {section?.components?.map((component, componentIndex) => (
                    <div key={component?.id} className="mb-6">
                      <h4 className="text-md font-medium text-foreground mb-3 flex items-center">
                        <Icon name="FileText" size={16} className="mr-2 text-primary" />
                        {component?.name}
                      </h4>
                      
                      {component?.type === 'text' && (
                        <div className="prose prose-sm max-w-none">
                          <div className="bg-muted/30 p-4 rounded-lg border border-border">
                            <p className="text-sm text-foreground whitespace-pre-line">
                              {typeof component?.content === 'string' 
                                ? component?.content 
                                : 'Sample text content for preview'
                              }
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {component?.type === 'table' && (
                        <div className="bg-muted/30 p-4 rounded-lg border border-border">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left py-2 text-foreground font-medium">Evidence ID</th>
                                  <th className="text-left py-2 text-foreground font-medium">Type</th>
                                  <th className="text-left py-2 text-foreground font-medium">Source</th>
                                  <th className="text-left py-2 text-foreground font-medium">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-border">
                                  <td className="py-2 text-muted-foreground">EV001</td>
                                  <td className="py-2 text-muted-foreground">Network Log</td>
                                  <td className="py-2 text-muted-foreground">Firewall</td>
                                  <td className="py-2">
                                    <span className="bg-success/10 text-success px-2 py-1 rounded text-xs">
                                      Verified
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {component?.type === 'chart' && (
                        <div className="bg-muted/30 p-4 rounded-lg border border-border">
                          <div className="h-32 flex items-center justify-center">
                            <div className="text-center">
                              <Icon name="BarChart3" size={32} className="mx-auto text-primary mb-2" />
                              <p className="text-sm text-muted-foreground">Interactive Chart Placeholder</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )) || (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="FileText" size={32} className="mx-auto mb-2" />
                      <p className="text-sm">No content added to this section</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Report Footer */}
            <div className="p-8 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  <p>Generated by CyberForensic AI Platform</p>
                  <p>© {new Date()?.getFullYear()} Federal Cybersecurity Division</p>
                </div>
                <div className="text-right">
                  <p>Page 1 of {mockReportData?.pageCount}</p>
                  <p>Classification: {mockReportData?.classification}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;