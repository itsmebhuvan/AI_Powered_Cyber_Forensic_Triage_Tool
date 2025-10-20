import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TimelineComparison = ({ isOpen, onClose, onCompare }) => {
  const [selectedCases, setSelectedCases] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('overlay');

  // Mock case data for comparison
  const availableCases = [
    {
      id: 'case_001',
      name: 'Corporate Network Breach - TechCorp',
      date: '2024-10-15',
      events: 45,
      status: 'active'
    },
    {
      id: 'case_002',
      name: 'Ransomware Attack - HealthSystem',
      date: '2024-10-12',
      events: 67,
      status: 'closed'
    },
    {
      id: 'case_003',
      name: 'Data Exfiltration - FinanceBank',
      date: '2024-10-08',
      events: 32,
      status: 'active'
    },
    {
      id: 'case_004',
      name: 'Insider Threat - ManufacturingCo',
      date: '2024-10-05',
      events: 28,
      status: 'closed'
    }
  ];

  const comparisonModeOptions = [
    { value: 'overlay', label: 'Overlay Timelines' },
    { value: 'sidebyside', label: 'Side by Side' },
    { value: 'difference', label: 'Show Differences' },
    { value: 'correlation', label: 'Correlation Analysis' }
  ];

  const handleCaseSelection = (caseId) => {
    setSelectedCases(prev => {
      if (prev?.includes(caseId)) {
        return prev?.filter(id => id !== caseId);
      } else if (prev?.length < 3) {
        return [...prev, caseId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedCases?.length >= 2) {
      onCompare({
        cases: selectedCases,
        mode: comparisonMode
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Compare Timelines
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={16}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        <div className="p-4 space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Comparison Mode Selection */}
          <div className="space-y-2">
            <Select
              label="Comparison Mode"
              description="Choose how to display the timeline comparison"
              options={comparisonModeOptions}
              value={comparisonMode}
              onChange={setComparisonMode}
            />
          </div>

          {/* Case Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-foreground">
                Select Cases to Compare
              </h4>
              <span className="text-sm text-muted-foreground">
                {selectedCases?.length}/3 selected
              </span>
            </div>

            <div className="space-y-2">
              {availableCases?.map((case_) => (
                <div
                  key={case_?.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCases?.includes(case_?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                  }`}
                  onClick={() => handleCaseSelection(case_?.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedCases?.includes(case_?.id)
                          ? 'border-primary bg-primary' :'border-muted-foreground'
                      }`}>
                        {selectedCases?.includes(case_?.id) && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {case_?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {case_?.date} • {case_?.events} events
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      case_?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}>
                      {case_?.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Preview */}
          {selectedCases?.length >= 2 && (
            <div className="space-y-3">
              <h4 className="text-base font-medium text-foreground">
                Comparison Preview
              </h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    Selected Cases:
                  </div>
                  {selectedCases?.map((caseId) => {
                    const case_ = availableCases?.find(c => c?.id === caseId);
                    return (
                      <div key={caseId} className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{case_?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Options */}
          {selectedCases?.length >= 2 && (
            <div className="space-y-3">
              <h4 className="text-base font-medium text-foreground">
                Analysis Options
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-muted-foreground">Show event correlations</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-muted-foreground">Highlight patterns</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Normalize timestamps</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Show AI insights</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedCases?.length < 2 
              ? 'Select at least 2 cases to compare'
              : `Ready to compare ${selectedCases?.length} cases`
            }
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="GitCompare"
              iconPosition="left"
              iconSize={14}
              onClick={handleCompare}
              disabled={selectedCases?.length < 2}
            >
              Compare Timelines
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineComparison;