import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigTab = () => {
  const [activeSection, setActiveSection] = useState('evidence');
  const [testingConnection, setTestingConnection] = useState(false);

  const configSections = [
    { id: 'evidence', label: 'Evidence Processing', icon: 'Database' },
    { id: 'ai', label: 'AI Models', icon: 'Brain' },
    { id: 'anomaly', label: 'Anomaly Detection', icon: 'AlertTriangle' },
    { id: 'integrations', label: 'External Tools', icon: 'Plug' }
  ];

  const evidenceSettings = {
    maxFileSize: "500",
    supportedFormats: ["PDF", "DOCX", "XLSX", "CSV", "JSON", "XML", "LOG"],
    processingThreads: "8",
    storageLocation: "/var/forensic/evidence",
    backupEnabled: true,
    encryptionLevel: "AES-256",
    retentionPeriod: "7"
  };

  const aiModels = [
    {
      id: 1,
      name: "Anomaly Detection Model v2.1",
      type: "Classification",
      status: "Active",
      accuracy: "94.2%",
      lastTrained: "2024-10-15",
      parameters: {
        threshold: "0.85",
        learningRate: "0.001",
        batchSize: "32"
      }
    },
    {
      id: 2,
      name: "Pattern Recognition Engine",
      type: "Deep Learning",
      status: "Training",
      accuracy: "91.8%",
      lastTrained: "2024-10-18",
      parameters: {
        threshold: "0.80",
        learningRate: "0.0005",
        batchSize: "64"
      }
    },
    {
      id: 3,
      name: "Timeline Reconstruction AI",
      type: "Sequential",
      status: "Inactive",
      accuracy: "88.5%",
      lastTrained: "2024-10-10",
      parameters: {
        threshold: "0.75",
        learningRate: "0.002",
        batchSize: "16"
      }
    }
  ];

  const externalTools = [
    {
      id: 1,
      name: "Volatility Framework",
      type: "Memory Analysis",
      status: "Connected",
      endpoint: "https://volatility.api.local",
      lastSync: "2 minutes ago",
      version: "3.2.1"
    },
    {
      id: 2,
      name: "Autopsy Digital Forensics",
      type: "Disk Analysis",
      status: "Connected",
      endpoint: "https://autopsy.forensic.local",
      lastSync: "5 minutes ago",
      version: "4.21.0"
    },
    {
      id: 3,
      name: "YARA Rule Engine",
      type: "Malware Detection",
      status: "Disconnected",
      endpoint: "https://yara.security.local",
      lastSync: "2 hours ago",
      version: "4.3.2"
    }
  ];

  const handleTestConnection = async (toolId) => {
    setTestingConnection(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingConnection(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': case'Connected': return 'text-success bg-success/10 border-success/20';
      case 'Training': return 'text-warning bg-warning/10 border-warning/20';
      case 'Inactive': case'Disconnected': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const renderEvidenceProcessing = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Maximum File Size (MB)"
            type="number"
            value={evidenceSettings?.maxFileSize}
            description="Maximum size for individual evidence files"
          />
          <Input
            label="Processing Threads"
            type="number"
            value={evidenceSettings?.processingThreads}
            description="Number of concurrent processing threads"
          />
          <Input
            label="Storage Location"
            type="text"
            value={evidenceSettings?.storageLocation}
            description="Primary evidence storage directory"
          />
        </div>
        <div className="space-y-4">
          <Select
            label="Encryption Level"
            value={evidenceSettings?.encryptionLevel}
            options={[
              { value: 'AES-128', label: 'AES-128' },
              { value: 'AES-192', label: 'AES-192' },
              { value: 'AES-256', label: 'AES-256' }
            ]}
          />
          <Input
            label="Retention Period (Years)"
            type="number"
            value={evidenceSettings?.retentionPeriod}
            description="Evidence retention period in years"
          />
          <div className="space-y-3">
            <Checkbox
              label="Enable Automatic Backup"
              checked={evidenceSettings?.backupEnabled}
            />
            <Checkbox
              label="Enable Real-time Integrity Checking"
              checked
            />
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Supported File Formats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {evidenceSettings?.supportedFormats?.map((format) => (
            <div key={format} className="flex items-center justify-between p-2 bg-surface rounded border border-border">
              <span className="text-sm font-medium text-foreground">{format}</span>
              <Checkbox checked />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAIModels = () => (
    <div className="space-y-6">
      {aiModels?.map((model) => (
        <div key={model?.id} className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-medium text-foreground">{model?.name}</h4>
              <p className="text-sm text-muted-foreground">{model?.type} • Last trained: {model?.lastTrained}</p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(model?.status)}`}>
              {model?.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-muted/50 rounded p-3">
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <p className="text-lg font-semibold text-foreground">{model?.accuracy}</p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="text-xs text-muted-foreground">Threshold</p>
              <p className="text-lg font-semibold text-foreground">{model?.parameters?.threshold}</p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="text-xs text-muted-foreground">Batch Size</p>
              <p className="text-lg font-semibold text-foreground">{model?.parameters?.batchSize}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Detection Threshold"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={model?.parameters?.threshold}
            />
            <Input
              label="Learning Rate"
              type="number"
              step="0.0001"
              value={model?.parameters?.learningRate}
            />
            <Input
              label="Batch Size"
              type="number"
              value={model?.parameters?.batchSize}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" iconName="Play" iconPosition="left" iconSize={14}>
              Start Training
            </Button>
            <Button variant="outline" size="sm" iconName="TestTube" iconPosition="left" iconSize={14}>
              Test Model
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
              Export Config
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExternalTools = () => (
    <div className="space-y-6">
      {externalTools?.map((tool) => (
        <div key={tool?.id} className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-medium text-foreground">{tool?.name}</h4>
              <p className="text-sm text-muted-foreground">{tool?.type} • Version {tool?.version}</p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool?.status)}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                tool?.status === 'Connected' ? 'bg-success' : 'bg-error'
              }`}></div>
              {tool?.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="API Endpoint"
              type="url"
              value={tool?.endpoint}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Sync</label>
              <p className="text-sm text-muted-foreground">{tool?.lastSync}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
              loading={testingConnection}
              onClick={() => handleTestConnection(tool?.id)}
            >
              Test Connection
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={14}>
              Sync Now
            </Button>
            <Button variant="outline" size="sm" iconName="Settings" iconPosition="left" iconSize={14}>
              Configure
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        variant="default"
        iconName="Plus"
        iconPosition="left"
        iconSize={16}
        className="w-full"
      >
        Add External Tool Integration
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">System Configuration</h3>
          <p className="text-sm text-muted-foreground">Configure platform settings and integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" iconName="Download" iconPosition="left" iconSize={16}>
            Export Config
          </Button>
          <Button variant="default" iconName="Save" iconPosition="left" iconSize={16}>
            Save Changes
          </Button>
        </div>
      </div>
      {/* Configuration Sections */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {configSections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg forensic-transition ${
              activeSection === section?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={section?.icon} size={16} className="mr-2" />
            {section?.label}
          </button>
        ))}
      </div>
      {/* Configuration Content */}
      <div className="bg-surface rounded-lg border border-border p-6">
        {activeSection === 'evidence' && renderEvidenceProcessing()}
        {activeSection === 'ai' && renderAIModels()}
        {activeSection === 'anomaly' && renderEvidenceProcessing()}
        {activeSection === 'integrations' && renderExternalTools()}
      </div>
    </div>
  );
};

export default SystemConfigTab;