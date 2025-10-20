import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TimelineControls = ({ 
  filters, 
  onFiltersChange, 
  onExport, 
  onCompareTimelines,
  onGenerateReport 
}) => {
  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'network_logs', label: 'Network Logs' },
    { value: 'system_logs', label: 'System Logs' },
    { value: 'network_monitor', label: 'Network Monitor' },
    { value: 'antivirus_engine', label: 'Antivirus Engine' },
    { value: 'system_events', label: 'System Events' }
  ];

  const eventTypeOptions = [
    { value: 'all', label: 'All Event Types' },
    { value: 'network_access', label: 'Network Access' },
    { value: 'file_access', label: 'File Access' },
    { value: 'data_exfiltration', label: 'Data Exfiltration' },
    { value: 'malware_detection', label: 'Malware Detection' },
    { value: 'system_shutdown', label: 'System Shutdown' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' },
    { value: 'csv', label: 'CSV Export' },
    { value: 'image', label: 'Timeline Image' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Filter Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-base font-heading font-medium text-foreground">
            Timeline Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <Input
              label="Start Date"
              type="datetime-local"
              value={filters?.startDate}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              className="text-sm"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="End Date"
              type="datetime-local"
              value={filters?.endDate}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              className="text-sm"
            />
          </div>

          {/* Source Filter */}
          <Select
            label="Evidence Source"
            options={sourceOptions}
            value={filters?.source}
            onChange={(value) => handleFilterChange('source', value)}
          />

          {/* Event Type Filter */}
          <Select
            label="Event Type"
            options={eventTypeOptions}
            value={filters?.eventType}
            onChange={(value) => handleFilterChange('eventType', value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Severity Filter */}
          <Select
            label="Severity Level"
            options={severityOptions}
            value={filters?.severity}
            onChange={(value) => handleFilterChange('severity', value)}
          />

          {/* Search */}
          <Input
            label="Search Events"
            type="search"
            placeholder="Search by title, description..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
          />

          {/* Correlation Filter */}
          <Input
            label="Correlation ID"
            type="text"
            placeholder="Filter by correlation ID"
            value={filters?.correlationId}
            onChange={(e) => handleFilterChange('correlationId', e?.target?.value)}
          />
        </div>
      </div>
      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
            onClick={() => onFiltersChange({
              startDate: '',
              endDate: '',
              source: 'all',
              eventType: 'all',
              severity: 'all',
              search: '',
              correlationId: ''
            })}
          >
            Reset Filters
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="GitCompare"
            iconPosition="left"
            iconSize={14}
            onClick={onCompareTimelines}
          >
            Compare Timelines
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
            onClick={onGenerateReport}
          >
            Generate Report
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Select
            options={exportOptions}
            value="pdf"
            onChange={(value) => onExport(value)}
            placeholder="Export as..."
          />
          
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            onClick={() => onExport('pdf')}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.source !== 'all' || filters?.eventType !== 'all' || filters?.severity !== 'all' || filters?.search || filters?.correlationId) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          
          {filters?.source !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              Source: {sourceOptions?.find(opt => opt?.value === filters?.source)?.label}
              <button
                onClick={() => handleFilterChange('source', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.eventType !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              Type: {eventTypeOptions?.find(opt => opt?.value === filters?.eventType)?.label}
              <button
                onClick={() => handleFilterChange('eventType', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.severity !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              Severity: {severityOptions?.find(opt => opt?.value === filters?.severity)?.label}
              <button
                onClick={() => handleFilterChange('severity', 'all')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.search && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              Search: "{filters?.search}"
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {filters?.correlationId && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              Correlation: {filters?.correlationId}
              <button
                onClick={() => handleFilterChange('correlationId', '')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineControls;