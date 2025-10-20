import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ filters, onFilterChange, onResetFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const investigatorOptions = [
    { value: 'all', label: 'All Investigators' },
    { value: 'sarah_chen', label: 'Sarah Chen' },
    { value: 'michael_rodriguez', label: 'Michael Rodriguez' },
    { value: 'david_kim', label: 'David Kim' },
    { value: 'emily_watson', label: 'Emily Watson' },
    { value: 'james_thompson', label: 'James Thompson' }
  ];

  const crimeTypeOptions = [
    { value: 'all', label: 'All Crime Types' },
    { value: 'cybercrime', label: 'Cybercrime' },
    { value: 'fraud', label: 'Fraud' },
    { value: 'data_breach', label: 'Data Breach' },
    { value: 'malware', label: 'Malware' },
    { value: 'phishing', label: 'Phishing' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 forensic-shadow-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Cases</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onResetFilters}
        >
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search cases..."
            value={filters?.search || ''}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <Select
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />
        
        <Select
          options={priorityOptions}
          value={filters?.priority || 'all'}
          onChange={(value) => onFilterChange('priority', value)}
          placeholder="Filter by priority"
        />
        
        <Select
          options={investigatorOptions}
          value={filters?.investigator || 'all'}
          onChange={(value) => onFilterChange('investigator', value)}
          placeholder="Filter by investigator"
        />
        
        <Select
          options={crimeTypeOptions}
          value={filters?.crimeType || 'all'}
          onChange={(value) => onFilterChange('crimeType', value)}
          placeholder="Filter by crime type"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Showing {filters?.resultCount || 0} of {filters?.totalCount || 0} cases</span>
          {Object.values(filters)?.some(value => value && value !== 'all' && value !== '') && (
            <span className="flex items-center">
              <Icon name="Filter" size={14} className="mr-1" />
              Filters active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
