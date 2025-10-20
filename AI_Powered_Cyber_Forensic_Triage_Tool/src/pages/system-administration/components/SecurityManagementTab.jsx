import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityManagementTab = () => {
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [logFilter, setLogFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-10-20 10:15:23",
      user: "Dr. Sarah Chen",
      action: "Evidence Upload",
      resource: "Case #2024-001",
      ipAddress: "192.168.1.45",
      status: "Success",
      severity: "Info",
      details: "Uploaded digital evidence file: suspicious_email.eml"
    },
    {
      id: 2,
      timestamp: "2024-10-20 10:12:18",
      user: "Detective Mike Rodriguez",
      action: "User Permission Change",
      resource: "Agent Lisa Thompson",
      ipAddress: "192.168.1.32",
      status: "Success",
      severity: "Warning",
      details: "Modified user permissions: Added Timeline Reconstruction access"
    },
    {
      id: 3,
      timestamp: "2024-10-20 10:08:45",
      user: "System",
      action: "Failed Login Attempt",
      resource: "Authentication System",
      ipAddress: "203.45.67.89",
      status: "Failed",
      severity: "Critical",
      details: "Multiple failed login attempts detected from external IP"
    },
    {
      id: 4,
      timestamp: "2024-10-20 10:05:12",
      user: "Agent Lisa Thompson",
      action: "Report Generation",
      resource: "Case #2024-003",
      ipAddress: "192.168.1.78",
      status: "Success",
      severity: "Info",
      details: "Generated forensic analysis report for timeline reconstruction"
    },
    {
      id: 5,
      timestamp: "2024-10-20 09:58:33",
      user: "Specialist James Park",
      action: "System Configuration",
      resource: "AI Model Settings",
      ipAddress: "192.168.1.91",
      status: "Success",
      severity: "Warning",
      details: "Modified anomaly detection threshold from 0.85 to 0.80"
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: "Breach Attempt",
      severity: "Critical",
      description: "Unauthorized access attempt detected from external IP address",
      timestamp: "5 minutes ago",
      source: "203.45.67.89",
      status: "Active",
      affectedSystems: ["Authentication", "Evidence Database"]
    },
    {
      id: 2,
      type: "Suspicious Activity",
      severity: "High",
      description: "Unusual data access pattern detected for user account",
      timestamp: "23 minutes ago",
      source: "Internal User",
      status: "Investigating",
      affectedSystems: ["Case Management"]
    },
    {
      id: 3,
      type: "Policy Violation",
      severity: "Medium",
      description: "Evidence file accessed outside of business hours",
      timestamp: "2 hours ago",
      source: "192.168.1.156",
      status: "Resolved",
      affectedSystems: ["Evidence Storage"]
    }
  ];

  const complianceReports = [
    {
      id: 1,
      name: "GDPR Compliance Report",
      type: "Privacy",
      status: "Compliant",
      lastAudit: "2024-10-15",
      nextAudit: "2025-01-15",
      score: 98
    },
    {
      id: 2,
      name: "ISO 27001 Security Assessment",
      type: "Security",
      status: "Compliant",
      lastAudit: "2024-09-30",
      nextAudit: "2024-12-30",
      score: 95
    },
    {
      id: 3,
      name: "Chain of Custody Validation",
      type: "Evidence",
      status: "Minor Issues",
      lastAudit: "2024-10-18",
      nextAudit: "2024-11-18",
      score: 87
    }
  ];

  const integrityChecks = [
    {
      id: 1,
      resource: "Evidence Database",
      status: "Verified",
      lastCheck: "2024-10-20 09:30:00",
      hashMatches: 2847,
      hashMismatches: 0,
      checksum: "SHA-256"
    },
    {
      id: 2,
      resource: "Case Files Archive",
      status: "Verified",
      lastCheck: "2024-10-20 08:45:00",
      hashMatches: 1523,
      hashMismatches: 0,
      checksum: "SHA-256"
    },
    {
      id: 3,
      resource: "System Logs",
      status: "Warning",
      lastCheck: "2024-10-20 10:00:00",
      hashMatches: 892,
      hashMismatches: 2,
      checksum: "SHA-256"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'success', label: 'Successful Actions' },
    { value: 'failed', label: 'Failed Actions' },
    { value: 'critical', label: 'Critical Events' },
    { value: 'warning', label: 'Warnings' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.resource?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesFilter = logFilter === 'all' || 
                         (logFilter === 'success' && log?.status === 'Success') ||
                         (logFilter === 'failed' && log?.status === 'Failed') ||
                         (logFilter === 'critical' && log?.severity === 'Critical') ||
                         (logFilter === 'warning' && log?.severity === 'Warning');
    
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-error bg-error/10 border-error/20';
      case 'High': return 'text-error bg-error/10 border-error/20';
      case 'Warning': case'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': case'Verified': case'Compliant': case'Resolved': return 'text-success bg-success/10 border-success/20';
      case 'Active': case'Warning': case'Minor Issues': return 'text-warning bg-warning/10 border-warning/20';
      case 'Failed': case'Investigating': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const handleLogSelect = (logId) => {
    setSelectedLogs(prev => 
      prev?.includes(logId) 
        ? prev?.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Security Management</h3>
          <p className="text-sm text-muted-foreground">Monitor security events and compliance status</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" iconName="Shield" iconPosition="left" iconSize={16}>
            Security Scan
          </Button>
          <Button variant="outline" iconName="Download" iconPosition="left" iconSize={16}>
            Export Logs
          </Button>
        </div>
      </div>
      {/* Security Alerts */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Active Security Alerts</h4>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left" iconSize={14}>
            Alert Settings
          </Button>
        </div>
        
        <div className="space-y-3">
          {securityAlerts?.map((alert) => (
            <div key={alert?.id} className={`p-4 rounded-lg border ${getSeverityColor(alert?.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} />
                    <h5 className="font-medium">{alert?.type}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(alert?.status)}`}>
                      {alert?.status}
                    </span>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{alert?.description}</p>
                  <div className="flex items-center space-x-4 text-xs opacity-75">
                    <span>Source: {alert?.source}</span>
                    <span>Time: {alert?.timestamp}</span>
                    <span>Systems: {alert?.affectedSystems?.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Audit Trail */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Audit Trail</h4>
          <div className="flex items-center gap-3">
            <Input
              type="search"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-64"
            />
            <Select
              placeholder="Filter logs"
              options={filterOptions}
              value={logFilter}
              onChange={setLogFilter}
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedLogs?.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {selectedLogs?.length} log{selectedLogs?.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left" iconSize={14}>
                  Export Selected
                </Button>
                <Button variant="outline" size="sm" iconName="Archive" iconPosition="left" iconSize={14}>
                  Archive
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                  <Checkbox
                    checked={selectedLogs?.length === filteredLogs?.length && filteredLogs?.length > 0}
                    indeterminate={selectedLogs?.length > 0 && selectedLogs?.length < filteredLogs?.length}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setSelectedLogs(filteredLogs?.map(log => log?.id));
                      } else {
                        setSelectedLogs([]);
                      }
                    }}
                  />
                </th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Action</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Resource</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs?.map((log) => (
                <tr key={log?.id} className="border-b border-border hover:bg-muted/30 forensic-transition">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedLogs?.includes(log?.id)}
                      onChange={() => handleLogSelect(log?.id)}
                    />
                  </td>
                  <td className="p-3 text-sm text-foreground font-mono">{log?.timestamp}</td>
                  <td className="p-3 text-sm text-foreground">{log?.user}</td>
                  <td className="p-3 text-sm text-foreground">{log?.action}</td>
                  <td className="p-3 text-sm text-foreground">{log?.resource}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log?.status)}`}>
                      {log?.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground font-mono">{log?.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Evidence Integrity & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evidence Integrity */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">Evidence Integrity Monitoring</h4>
          <div className="space-y-4">
            {integrityChecks?.map((check) => (
              <div key={check?.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{check?.resource}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(check?.status)}`}>
                    {check?.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Check</p>
                    <p className="font-medium text-foreground font-mono">{check?.lastCheck}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Checksum</p>
                    <p className="font-medium text-foreground">{check?.checksum}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hash Matches</p>
                    <p className="font-medium text-success">{check?.hashMatches}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mismatches</p>
                    <p className={`font-medium ${check?.hashMismatches > 0 ? 'text-error' : 'text-success'}`}>
                      {check?.hashMismatches}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" iconName="RefreshCw" iconPosition="left" iconSize={16} className="w-full">
              Run Integrity Check
            </Button>
          </div>
        </div>

        {/* Compliance Reports */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">Compliance Reports</h4>
          <div className="space-y-4">
            {complianceReports?.map((report) => (
              <div key={report?.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{report?.name}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(report?.status)}`}>
                    {report?.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{report?.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Score</p>
                    <p className="font-medium text-foreground">{report?.score}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Audit</p>
                    <p className="font-medium text-foreground">{report?.lastAudit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Next Audit</p>
                    <p className="font-medium text-foreground">{report?.nextAudit}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" iconName="FileText" iconPosition="left" iconSize={16} className="w-full">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityManagementTab;