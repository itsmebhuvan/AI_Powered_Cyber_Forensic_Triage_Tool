import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentBuilder = ({ selectedTemplate, reportContent, onContentUpdate }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);

  const availableComponents = [
    {
      id: 'case-summary',
      name: 'Case Summary',
      icon: 'FileText',
      description: 'Overview of the investigation case',
      type: 'text'
    },
    {
      id: 'evidence-table',
      name: 'Evidence Table',
      icon: 'Table',
      description: 'Structured evidence listing',
      type: 'table'
    },
    {
      id: 'timeline-chart',
      name: 'Timeline Chart',
      icon: 'Clock',
      description: 'Visual timeline reconstruction',
      type: 'chart'
    },
    {
      id: 'ai-insights',
      name: 'AI Insights',
      icon: 'Brain',
      description: 'AI-generated analysis results',
      type: 'ai'
    },
    {
      id: 'network-diagram',
      name: 'Network Diagram',
      icon: 'Network',
      description: 'Network topology visualization',
      type: 'diagram'
    },
    {
      id: 'statistical-chart',
      name: 'Statistical Chart',
      icon: 'BarChart3',
      description: 'Data analysis charts',
      type: 'chart'
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      icon: 'Images',
      description: 'Evidence screenshots and images',
      type: 'media'
    },
    {
      id: 'code-snippet',
      name: 'Code Snippet',
      icon: 'Code',
      description: 'Malware or script analysis',
      type: 'code'
    }
  ];

  const sampleContent = {
    'case-summary': `**Case ID:** CYBER-2024-001\n**Investigation Type:** Advanced Persistent Threat (APT)\n**Date Initiated:** October 15, 2024\n**Lead Investigator:** Agent Sarah Mitchell\n\nThis investigation involves a sophisticated cyber attack targeting the financial services sector. Initial indicators suggest a state-sponsored threat actor with advanced capabilities and persistent access to the target network.`,
    'ai-insights': `**Anomaly Detection Results:**\n• 47 suspicious network connections identified\n• 12 unauthorized privilege escalations detected\n• 8 potential data exfiltration events\n• 3 malware variants discovered\n\n**Risk Assessment:** HIGH\n**Confidence Level:** 94%\n\n**Recommended Actions:**\n1. Immediate network isolation of affected systems\n2. Comprehensive malware analysis\n3. User access audit and privilege review`,
    'evidence-table': [
      { id: 'EV001', type: 'Network Log', source: 'Firewall', timestamp: '2024-10-15 14:23:17', status: 'Verified' },
      { id: 'EV002', type: 'System Image', source: 'Workstation-07', timestamp: '2024-10-15 15:45:32', status: 'Processing' },
      { id: 'EV003', type: 'Email Archive', source: 'Exchange Server', timestamp: '2024-10-16 09:12:45', status: 'Verified' }
    ]
  };

  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, sectionIndex) => {
    e?.preventDefault();
    if (draggedItem) {
      const newContent = {
        ...reportContent,
        sections: reportContent?.sections?.map((section, index) => {
          if (index === sectionIndex) {
            return {
              ...section,
              components: [...(section?.components || []), {
                id: `${draggedItem?.id}-${Date.now()}`,
                type: draggedItem?.type,
                name: draggedItem?.name,
                content: sampleContent?.[draggedItem?.id] || `Sample ${draggedItem?.name} content`
              }]
            };
          }
          return section;
        })
      };
      onContentUpdate(newContent);
      setDraggedItem(null);
    }
  };

  const removeComponent = (sectionIndex, componentIndex) => {
    const newContent = {
      ...reportContent,
      sections: reportContent?.sections?.map((section, index) => {
        if (index === sectionIndex) {
          return {
            ...section,
            components: section?.components?.filter((_, idx) => idx !== componentIndex)
          };
        }
        return section;
      })
    };
    onContentUpdate(newContent);
  };

  if (!selectedTemplate) {
    return (
      <div className="bg-surface rounded-lg border border-border forensic-shadow-card p-8 text-center">
        <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Select a Template
        </h3>
        <p className="text-muted-foreground">
          Choose a report template to start building your content
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Content Builder</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Drag components to build your report sections
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Save" iconPosition="left" iconSize={16}>
              Save Draft
            </Button>
            <Button variant="default" size="sm" iconName="Eye" iconPosition="left" iconSize={16}>
              Preview
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-96">
        {/* Component Library */}
        <div className="w-64 border-r border-border p-4 overflow-y-auto">
          <h3 className="text-sm font-heading font-medium text-foreground mb-4">
            Available Components
          </h3>
          <div className="space-y-2">
            {availableComponents?.map((component) => (
              <div
                key={component?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                className="p-3 border border-border rounded-lg cursor-grab hover:border-primary/50 hover:bg-muted/50 forensic-transition active:cursor-grabbing"
              >
                <div className="flex items-center mb-2">
                  <Icon name={component?.icon} size={16} className="text-primary mr-2" />
                  <span className="text-sm font-medium text-foreground">{component?.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{component?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {reportContent?.sections?.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={`border-2 border-dashed rounded-lg p-4 forensic-transition ${
                  activeSection === sectionIndex 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, sectionIndex)}
                onClick={() => setActiveSection(sectionIndex)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-medium text-foreground">
                    {section?.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Icon name="Settings" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Icon name="GripVertical" size={14} />
                    </Button>
                  </div>
                </div>

                {/* Section Components */}
                <div className="space-y-3">
                  {section?.components?.map((component, componentIndex) => (
                    <div
                      key={component?.id}
                      className="bg-background border border-border rounded-md p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon name="FileText" size={14} className="text-primary mr-2" />
                          <span className="text-sm font-medium text-foreground">
                            {component?.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Icon name="Edit" size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-error hover:text-error"
                            onClick={() => removeComponent(sectionIndex, componentIndex)}
                          >
                            <Icon name="Trash2" size={12} />
                          </Button>
                        </div>
                      </div>
                      
                      {component?.type === 'text' && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          {typeof component?.content === 'string' ? component?.content?.substring(0, 100) +'...' :'Text content preview'
                          }
                        </div>
                      )}
                      
                      {component?.type === 'table' && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          📊 Evidence table with {Array.isArray(component?.content) ? component?.content?.length : 3} entries
                        </div>
                      )}
                      
                      {component?.type === 'chart' && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded flex items-center">
                          <Icon name="BarChart3" size={16} className="mr-2" />
                          Interactive chart visualization
                        </div>
                      )}
                    </div>
                  )) || (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Plus" size={24} className="mx-auto mb-2" />
                      <p className="text-sm">Drop components here</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBuilder;