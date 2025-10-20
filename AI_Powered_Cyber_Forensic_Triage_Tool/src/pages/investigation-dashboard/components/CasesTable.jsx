import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CasesTable = ({ cases, onCaseSelect, onQuickAction }) => {
  const [selectedCases, setSelectedCases] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'lastActivity', direction: 'desc' });

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'on hold':
        return 'bg-muted text-muted-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleCaseSelection = (caseId) => {
    setSelectedCases(prev => 
      prev?.includes(caseId) 
        ? prev?.filter(id => id !== caseId)
        : [...prev, caseId]
    );
  };

  const sortedCases = [...cases]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Active Cases</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => onQuickAction('upload')}
            >
              Upload Evidence
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onQuickAction('new-case')}
            >
              New Case
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedCases(cases?.map(c => c?.id));
                    } else {
                      setSelectedCases([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('caseId')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Case ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('crimeType')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Crime Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Priority</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Investigator</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Last Activity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="w-24 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCases?.map((case_item) => (
              <tr
                key={case_item?.id}
                className="border-b border-border hover:bg-muted/30 cursor-pointer"
                onClick={() => onCaseSelect(case_item?.id)}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedCases?.includes(case_item?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleCaseSelection(case_item?.id);
                    }}
                  />
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">{case_item?.caseId}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={case_item?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{case_item?.crimeType}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_item?.status)}`}>
                    {case_item?.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_item?.priority)}`}>
                    {case_item?.priority}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {case_item?.investigator?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{case_item?.investigator}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{case_item?.lastActivity}</span>
                </td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onCaseSelect(case_item?.id);
                    }}
                  >
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CasesTable;