import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AnalysisTools = ({ onAnalysisStart, onExport }) => {
  const [activeToolset, setActiveToolset] = useState('detection');
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    fileType: '',
    dateRange: '',
    riskLevel: ''
  });
  const [customRules, setCustomRules] = useState([]);
  const [newRule, setNewRule] = useState({
    name: '',
    condition: '',
    action: ''
  });

  const toolsets = [
    { id: 'detection', label: 'Anomaly Detection', icon: 'Search' },
    { id: 'comparison', label: 'Evidence Comparison', icon: 'GitCompare' },
    { id: 'correlation', label: 'Cross-Case Analysis', icon: 'GitBranch' },
    { id: 'batch', label: 'Batch Processing', icon: 'Layers' }
  ];

  const fileTypeOptions = [
    { value: '', label: 'All File Types' },
    { value: 'image', label: 'Images' },
    { value: 'document', label: 'Documents' },
    { value: 'log', label: 'Log Files' },
    { value: 'email', label: 'Email Files' },
    { value: 'network', label: 'Network Captures' }
  ];

  const riskLevelOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const conditionOptions = [
    { value: 'file_size_exceeds', label: 'File size exceeds threshold' },
    { value: 'suspicious_extension', label: 'Suspicious file extension' },
    { value: 'unusual_timestamp', label: 'Unusual timestamp pattern' },
    { value: 'encrypted_content', label: 'Encrypted content detected' },
    { value: 'metadata_anomaly', label: 'Metadata anomaly found' }
  ];

  const actionOptions = [
    { value: 'flag_high_risk', label: 'Flag as high risk' },
    { value: 'quarantine', label: 'Quarantine evidence' },
    { value: 'notify_investigator', label: 'Notify investigator' },
    { value: 'auto_analyze', label: 'Trigger automatic analysis' }
  ];

  const handleAddRule = () => {
    if (newRule?.name && newRule?.condition && newRule?.action) {
      setCustomRules([...customRules, { ...newRule, id: Date.now() }]);
      setNewRule({ name: '', condition: '', action: '' });
    }
  };

  const handleRemoveRule = (ruleId) => {
    setCustomRules(customRules?.filter(rule => rule?.id !== ruleId));
  };

  const handleStartAnalysis = () => {
    const analysisConfig = {
      toolset: activeToolset,
      filters: filterSettings,
      batchMode: batchProcessing,
      customRules: customRules
    };
    onAnalysisStart(analysisConfig);
  };

  const renderDetectionTools = () => (
    <div className="space-y-6">
      {/* Filter Settings */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Analysis Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="File Type"
            options={fileTypeOptions}
            value={filterSettings?.fileType}
            onChange={(value) => setFilterSettings({...filterSettings, fileType: value})}
          />
          <Input
            label="Date Range"
            type="date"
            value={filterSettings?.dateRange}
            onChange={(e) => setFilterSettings({...filterSettings, dateRange: e?.target?.value})}
          />
          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filterSettings?.riskLevel}
            onChange={(value) => setFilterSettings({...filterSettings, riskLevel: value})}
          />
        </div>
      </div>

      {/* Custom Rules */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Custom Detection Rules</h4>
        
        {/* Add New Rule */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Input
            label="Rule Name"
            placeholder="Enter rule name"
            value={newRule?.name}
            onChange={(e) => setNewRule({...newRule, name: e?.target?.value})}
          />
          <Select
            label="Condition"
            options={conditionOptions}
            value={newRule?.condition}
            onChange={(value) => setNewRule({...newRule, condition: value})}
          />
          <Select
            label="Action"
            options={actionOptions}
            value={newRule?.action}
            onChange={(value) => setNewRule({...newRule, action: value})}
          />
          <div className="flex items-end">
            <Button
              onClick={handleAddRule}
              iconName="Plus"
              iconPosition="left"
              className="w-full"
            >
              Add Rule
            </Button>
          </div>
        </div>

        {/* Existing Rules */}
        {customRules?.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Active Rules</h5>
            {customRules?.map((rule) => (
              <div key={rule?.id} className="flex items-center justify-between p-3 bg-surface rounded-md border border-border">
                <div>
                  <p className="font-medium text-foreground text-sm">{rule?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {conditionOptions?.find(opt => opt?.value === rule?.condition)?.label} → {actionOptions?.find(opt => opt?.value === rule?.action)?.label}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRule(rule?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderComparisonTools = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Evidence Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Primary Evidence</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop evidence file here or click to browse</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Comparison Evidence</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop evidence file here or click to browse</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button iconName="GitCompare" iconPosition="left">
            Compare Evidence
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Comparison Methods</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface rounded-lg border border-border text-center">
            <Icon name="Hash" size={24} className="text-primary mx-auto mb-2" />
            <h5 className="font-medium text-foreground text-sm">Hash Comparison</h5>
            <p className="text-xs text-muted-foreground mt-1">MD5, SHA-256 verification</p>
          </div>
          <div className="p-4 bg-surface rounded-lg border border-border text-center">
            <Icon name="FileImage" size={24} className="text-primary mx-auto mb-2" />
            <h5 className="font-medium text-foreground text-sm">Metadata Analysis</h5>
            <p className="text-xs text-muted-foreground mt-1">EXIF, properties comparison</p>
          </div>
          <div className="p-4 bg-surface rounded-lg border border-border text-center">
            <Icon name="Binary" size={24} className="text-primary mx-auto mb-2" />
            <h5 className="font-medium text-foreground text-sm">Binary Diff</h5>
            <p className="text-xs text-muted-foreground mt-1">Byte-level comparison</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCorrelationTools = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Cross-Case Correlation</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
            <div className="flex items-center">
              <Icon name="FolderOpen" size={20} className="text-primary mr-3" />
              <div>
                <p className="font-medium text-foreground text-sm">Case #2024-001</p>
                <p className="text-xs text-muted-foreground">Financial Fraud Investigation</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Include</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
            <div className="flex items-center">
              <Icon name="FolderOpen" size={20} className="text-primary mr-3" />
              <div>
                <p className="font-medium text-foreground text-sm">Case #2024-003</p>
                <p className="text-xs text-muted-foreground">Data Breach Analysis</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Include</Button>
          </div>
        </div>
        
        <div className="mt-4">
          <Button iconName="GitBranch" iconPosition="left" className="w-full">
            Analyze Cross-Case Patterns
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Correlation Parameters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Similarity Threshold</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="75"
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Analysis Depth</label>
            <Select
              options={[
                { value: 'surface', label: 'Surface Level' },
                { value: 'deep', label: 'Deep Analysis' },
                { value: 'comprehensive', label: 'Comprehensive' }
              ]}
              value="deep"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBatchTools = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Batch Processing Queue</h4>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Icon name="Layers" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Drop multiple evidence files here</p>
          <p className="text-sm text-muted-foreground mb-4">Supports: Images, Documents, Logs, Network Captures</p>
          <Button iconName="Upload" iconPosition="left">
            Select Files for Batch Processing
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Processing Options</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground text-sm">Parallel Processing</p>
              <p className="text-xs text-muted-foreground">Process multiple files simultaneously</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={batchProcessing}
                onChange={(e) => setBatchProcessing(e?.target?.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Max Concurrent Jobs</label>
              <Select
                options={[
                  { value: '2', label: '2 Jobs' },
                  { value: '4', label: '4 Jobs' },
                  { value: '8', label: '8 Jobs' }
                ]}
                value="4"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Priority Level</label>
              <Select
                options={[
                  { value: 'low', label: 'Low Priority' },
                  { value: 'normal', label: 'Normal Priority' },
                  { value: 'high', label: 'High Priority' }
                ]}
                value="normal"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderToolContent = () => {
    switch (activeToolset) {
      case 'detection': return renderDetectionTools();
      case 'comparison': return renderComparisonTools();
      case 'correlation': return renderCorrelationTools();
      case 'batch': return renderBatchTools();
      default: return renderDetectionTools();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Analysis Tools</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export Results
            </Button>
            <Button
              onClick={handleStartAnalysis}
              iconName="Play"
              iconPosition="left"
            >
              Start Analysis
            </Button>
          </div>
        </div>
        
        {/* Tool Navigation */}
        <div className="flex flex-wrap gap-2">
          {toolsets?.map((toolset) => (
            <button
              key={toolset?.id}
              onClick={() => setActiveToolset(toolset?.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium forensic-transition ${
                activeToolset === toolset?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={toolset?.icon} size={16} className="mr-2" />
              {toolset?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderToolContent()}
      </div>
    </div>
  );
};

export default AnalysisTools;