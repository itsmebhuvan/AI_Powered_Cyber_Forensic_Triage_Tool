import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportOptions = ({ onExport, isExporting }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf-standard');
  const [exportSettings, setExportSettings] = useState({
    includeMetadata: true,
    includeWatermark: true,
    passwordProtect: false,
    password: '',
    includeAppendices: true,
    compressionLevel: 'medium'
  });

  const exportFormats = [
    {
      id: 'pdf-standard',
      name: 'PDF (Standard)',
      icon: 'FileText',
      description: 'Standard PDF format for general distribution and archival',
      features: ['Searchable text', 'Embedded fonts', 'Print-ready'],
      fileSize: '~2-5 MB',
      compatibility: 'Universal'
    },
    {
      id: 'pdf-encrypted',
      name: 'PDF (Encrypted)',
      icon: 'Lock',
      description: 'Password-protected PDF with 256-bit AES encryption',
      features: ['Password protection', 'Copy protection', 'Print restrictions'],
      fileSize: '~2-5 MB',
      compatibility: 'PDF readers with encryption support'
    },
    {
      id: 'docx',
      name: 'Word Document',
      icon: 'FileEdit',
      description: 'Editable Microsoft Word document for collaboration',
      features: ['Fully editable', 'Track changes', 'Comments support'],
      fileSize: '~1-3 MB',
      compatibility: 'Microsoft Word 2016+'
    },
    {
      id: 'html-interactive',
      name: 'Interactive Web Report',
      icon: 'Globe',
      description: 'HTML report with interactive charts and navigation',
      features: ['Interactive elements', 'Responsive design', 'Search functionality'],
      fileSize: '~5-10 MB',
      compatibility: 'Modern web browsers'
    },
    {
      id: 'json-data',
      name: 'Structured Data (JSON)',
      icon: 'Database',
      description: 'Machine-readable JSON format for API integration',
      features: ['API compatible', 'Structured data', 'Lightweight'],
      fileSize: '~100-500 KB',
      compatibility: 'Any JSON parser'
    }
  ];

  const distributionOptions = [
    {
      id: 'download',
      name: 'Direct Download',
      icon: 'Download',
      description: 'Download file directly to your device'
    },
    {
      id: 'email',
      name: 'Email Distribution',
      icon: 'Mail',
      description: 'Send report via secure email'
    },
    {
      id: 'secure-link',
      name: 'Secure Link',
      icon: 'Link',
      description: 'Generate time-limited secure download link'
    },
    {
      id: 'archive',
      name: 'Case Archive',
      icon: 'Archive',
      description: 'Save to case management system'
    }
  ];

  const handleExport = (distributionMethod) => {
    const exportConfig = {
      format: selectedFormat,
      settings: exportSettings,
      distribution: distributionMethod,
      timestamp: new Date()?.toISOString()
    };
    onExport(exportConfig);
  };

  const handleSettingChange = (setting, value) => {
    setExportSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="bg-surface rounded-lg border border-border forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Export Options</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure export settings and distribution method
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-muted px-3 py-1.5 rounded-lg">
              <span className="text-xs font-medium text-muted-foreground">
                Last exported: 2 hours ago
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Format Selection */}
        <div>
          <h3 className="text-md font-heading font-medium text-foreground mb-4">
            Export Format
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats?.map((format) => (
              <div
                key={format?.id}
                onClick={() => setSelectedFormat(format?.id)}
                className={`p-4 rounded-lg border cursor-pointer forensic-transition ${
                  selectedFormat === format?.id
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    selectedFormat === format?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon name={format?.icon} size={18} />
                  </div>
                  {selectedFormat === format?.id && (
                    <Icon name="CheckCircle" size={18} className="text-primary" />
                  )}
                </div>

                <h4 className="font-medium text-foreground mb-2">{format?.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{format?.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">File Size:</span>
                    <span className="text-foreground font-medium">{format?.fileSize}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Compatibility:</span>
                    <span className="text-foreground font-medium">{format?.compatibility}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {format?.features?.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-background text-muted-foreground px-2 py-1 rounded border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Settings */}
        <div>
          <h3 className="text-md font-heading font-medium text-foreground mb-4">
            Export Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Include Metadata</label>
                  <p className="text-xs text-muted-foreground">Add case information and timestamps</p>
                </div>
                <button
                  onClick={() => handleSettingChange('includeMetadata', !exportSettings?.includeMetadata)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full forensic-transition ${
                    exportSettings?.includeMetadata ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white forensic-transition ${
                      exportSettings?.includeMetadata ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Watermark</label>
                  <p className="text-xs text-muted-foreground">Add confidentiality watermark</p>
                </div>
                <button
                  onClick={() => handleSettingChange('includeWatermark', !exportSettings?.includeWatermark)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full forensic-transition ${
                    exportSettings?.includeWatermark ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white forensic-transition ${
                      exportSettings?.includeWatermark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Include Appendices</label>
                  <p className="text-xs text-muted-foreground">Add supporting documents</p>
                </div>
                <button
                  onClick={() => handleSettingChange('includeAppendices', !exportSettings?.includeAppendices)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full forensic-transition ${
                    exportSettings?.includeAppendices ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white forensic-transition ${
                      exportSettings?.includeAppendices ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {(selectedFormat === 'pdf-encrypted' || exportSettings?.passwordProtect) && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Password Protection
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={exportSettings?.password}
                    onChange={(e) => handleSettingChange('password', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Compression Level
                </label>
                <select
                  value={exportSettings?.compressionLevel}
                  onChange={(e) => handleSettingChange('compressionLevel', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Low (Best Quality)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Smallest Size)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Options */}
        <div>
          <h3 className="text-md font-heading font-medium text-foreground mb-4">
            Distribution Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {distributionOptions?.map((option) => (
              <Button
                key={option?.id}
                variant="outline"
                className="h-auto p-4 flex-col items-start text-left"
                onClick={() => handleExport(option?.id)}
                disabled={isExporting}
              >
                <div className="flex items-center w-full mb-2">
                  <Icon name={option?.icon} size={18} className="text-primary mr-2" />
                  <span className="font-medium text-foreground">{option?.name}</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  {option?.description}
                </p>
              </Button>
            ))}
          </div>
        </div>

        {/* Export Progress */}
        {isExporting && (
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Generating Report...</span>
              <span className="text-sm text-muted-foreground">73%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-primary h-2 rounded-full forensic-transition" style={{ width: '73%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Processing evidence analysis sections...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportOptions;