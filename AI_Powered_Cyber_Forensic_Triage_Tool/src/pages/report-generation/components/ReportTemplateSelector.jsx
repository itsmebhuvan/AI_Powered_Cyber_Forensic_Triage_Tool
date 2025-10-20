import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const reportTemplates = [
    {
      id: 'comprehensive-investigation',
      name: 'Comprehensive Investigation Report',
      description: 'Complete forensic analysis report with all evidence sections, timeline reconstruction, and AI insights for court proceedings.',
      category: 'Court Submission',
      sections: ['Executive Summary', 'Case Overview', 'Evidence Analysis', 'Timeline Reconstruction', 'AI Findings', 'Conclusions', 'Appendices'],
      estimatedPages: '15-25',
      icon: 'FileText',
      isRecommended: true
    },
    {
      id: 'law-enforcement-brief',
      name: 'Law Enforcement Brief',
      description: 'Concise report format designed for law enforcement agencies with key findings and actionable intelligence.',
      category: 'Law Enforcement',
      sections: ['Executive Summary', 'Key Findings', 'Evidence Summary', 'Recommendations', 'Next Steps'],
      estimatedPages: '5-10',
      icon: 'Shield',
      isRecommended: false
    },
    {
      id: 'technical-analysis',
      name: 'Technical Analysis Report',
      description: 'Detailed technical documentation for cybersecurity teams with in-depth analysis methodologies and technical findings.',
      category: 'Technical Documentation',
      sections: ['Methodology', 'Technical Findings', 'System Analysis', 'Network Forensics', 'Malware Analysis', 'Technical Appendix'],
      estimatedPages: '20-35',
      icon: 'Code',
      isRecommended: false
    },
    {
      id: 'incident-response',
      name: 'Incident Response Summary',
      description: 'Rapid response report template for immediate incident documentation and preliminary findings.',
      category: 'Incident Response',
      sections: ['Incident Overview', 'Initial Findings', 'Containment Actions', 'Evidence Preservation', 'Immediate Recommendations'],
      estimatedPages: '3-8',
      icon: 'AlertTriangle',
      isRecommended: false
    },
    {
      id: 'expert-witness',
      name: 'Expert Witness Report',
      description: 'Specialized format for expert witness testimony with detailed methodology and professional opinions.',
      category: 'Legal Testimony',
      sections: ['Expert Qualifications', 'Case Assignment', 'Methodology', 'Analysis Results', 'Professional Opinion', 'Supporting Evidence'],
      estimatedPages: '10-20',
      icon: 'Scale',
      isRecommended: false
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance focused report for audit requirements and compliance verification.',
      category: 'Compliance',
      sections: ['Audit Scope', 'Compliance Assessment', 'Findings Summary', 'Risk Analysis', 'Remediation Plan', 'Certification'],
      estimatedPages: '12-18',
      icon: 'CheckCircle',
      isRecommended: false
    }
  ];

  const categories = [...new Set(reportTemplates.map(template => template.category))];

  const filteredTemplates = reportTemplates?.filter(template =>
    template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-surface rounded-lg border border-border forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Report Templates</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a template to structure your forensic report
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Custom Template
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      <div className="p-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories?.map((category) => (
            <button
              key={category}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted forensic-transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates?.map((template) => (
            <div
              key={template?.id}
              onClick={() => onTemplateSelect(template)}
              className={`relative p-4 rounded-lg border cursor-pointer forensic-transition ${
                selectedTemplate?.id === template?.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              {template?.isRecommended && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Recommended
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedTemplate?.id === template?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon name={template?.icon} size={20} />
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {template?.estimatedPages} pages
                </span>
              </div>

              <h3 className="font-heading font-medium text-foreground mb-2 text-sm">
                {template?.name}
              </h3>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {template?.description}
              </p>

              <div className="mb-3">
                <span className="text-xs font-medium text-foreground">Sections:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template?.sections?.slice(0, 3)?.map((section, index) => (
                    <span
                      key={index}
                      className="text-xs bg-background text-muted-foreground px-2 py-0.5 rounded border"
                    >
                      {section}
                    </span>
                  ))}
                  {template?.sections?.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{template?.sections?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">
                  {template?.category}
                </span>
                {selectedTemplate?.id === template?.id && (
                  <Icon name="CheckCircle" size={16} className="text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or create a custom template
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTemplateSelector;