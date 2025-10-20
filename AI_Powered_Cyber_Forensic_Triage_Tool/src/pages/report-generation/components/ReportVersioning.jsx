import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportVersioning = ({ onVersionSelect, onApprovalAction }) => {
  const [activeTab, setActiveTab] = useState('versions');

  const reportVersions = [
  {
    id: 'v1.3',
    version: '1.3',
    status: 'current',
    author: 'Agent Sarah Mitchell',
    authorAvatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
    authorAvatarAlt: 'Professional headshot of Agent Sarah Mitchell with brown hair in navy blazer',
    dateCreated: '2024-10-20 14:30:00',
    changes: 'Updated AI analysis section with new anomaly detection results',
    approvals: [
    { name: 'Dr. James Wilson', role: 'Senior Analyst', status: 'approved', date: '2024-10-20 15:45:00' },
    { name: 'Director Lisa Chen', role: 'Division Head', status: 'pending', date: null }],

    comments: 2,
    fileSize: '4.2 MB'
  },
  {
    id: 'v1.2',
    version: '1.2',
    status: 'approved',
    author: 'Agent Sarah Mitchell',
    authorAvatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
    authorAvatarAlt: 'Professional headshot of Agent Sarah Mitchell with brown hair in navy blazer',
    dateCreated: '2024-10-19 16:20:00',
    changes: 'Added timeline reconstruction and network analysis sections',
    approvals: [
    { name: 'Dr. James Wilson', role: 'Senior Analyst', status: 'approved', date: '2024-10-19 17:30:00' },
    { name: 'Director Lisa Chen', role: 'Division Head', status: 'approved', date: '2024-10-20 09:15:00' }],

    comments: 5,
    fileSize: '3.8 MB'
  },
  {
    id: 'v1.1',
    version: '1.1',
    status: 'archived',
    author: 'Agent Michael Torres',
    authorAvatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    authorAvatarAlt: 'Professional headshot of Agent Michael Torres with short dark hair in dark suit',
    dateCreated: '2024-10-18 11:45:00',
    changes: 'Initial draft with case overview and preliminary evidence analysis',
    approvals: [
    { name: 'Dr. James Wilson', role: 'Senior Analyst', status: 'approved', date: '2024-10-18 14:20:00' }],

    comments: 8,
    fileSize: '2.1 MB'
  }];


  const approvalWorkflow = [
  {
    id: 'analyst-review',
    name: 'Senior Analyst Review',
    assignee: 'Dr. James Wilson',
    status: 'completed',
    completedDate: '2024-10-20 15:45:00',
    comments: 'Technical analysis verified. Methodology is sound.',
    required: true
  },
  {
    id: 'division-approval',
    name: 'Division Head Approval',
    assignee: 'Director Lisa Chen',
    status: 'pending',
    completedDate: null,
    comments: null,
    required: true
  },
  {
    id: 'legal-review',
    name: 'Legal Review',
    assignee: 'Legal Department',
    status: 'not-started',
    completedDate: null,
    comments: null,
    required: false
  },
  {
    id: 'final-approval',
    name: 'Final Approval',
    assignee: 'Chief Investigator',
    status: 'not-started',
    completedDate: null,
    comments: null,
    required: true
  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'current':return 'bg-primary text-primary-foreground';
      case 'approved':return 'bg-success text-success-foreground';
      case 'archived':return 'bg-muted text-muted-foreground';
      case 'completed':return 'bg-success text-success-foreground';
      case 'pending':return 'bg-warning text-warning-foreground';
      case 'not-started':return 'bg-muted text-muted-foreground';
      default:return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current':return 'FileEdit';
      case 'approved':return 'CheckCircle';
      case 'archived':return 'Archive';
      case 'completed':return 'CheckCircle';
      case 'pending':return 'Clock';
      case 'not-started':return 'Circle';
      default:return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Version Control</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage report versions and approval workflow
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="GitBranch"
            iconPosition="left"
            iconSize={16}>

            Create Version
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('versions')}
            className={`px-4 py-2 text-sm font-medium rounded-md forensic-transition ${
            activeTab === 'versions' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
            }>

            <Icon name="FileText" size={16} className="mr-2" />
            Versions
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`px-4 py-2 text-sm font-medium rounded-md forensic-transition ${
            activeTab === 'approval' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
            }>

            <Icon name="Users" size={16} className="mr-2" />
            Approval Workflow
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'versions' &&
        <div className="space-y-4">
            {reportVersions?.map((version) =>
          <div
            key={version?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/30 forensic-transition">

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                    src={version?.authorAvatar}
                    alt={version?.authorAvatarAlt}
                    className="w-10 h-10 rounded-full object-cover" />

                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-heading font-medium text-foreground">
                          Version {version?.version}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(version?.status)}`}>
                          <Icon name={getStatusIcon(version?.status)} size={12} className="mr-1" />
                          {version?.status?.charAt(0)?.toUpperCase() + version?.status?.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        By {version?.author} • {formatDate(version?.dateCreated)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{version?.fileSize}</span>
                    <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconSize={14}
                  onClick={() => onVersionSelect(version)}>

                      Download
                    </Button>
                    <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}>

                      Preview
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-foreground mb-3">{version?.changes}</p>

                {/* Approval Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {version?.approvals?.filter((a) => a?.status === 'approved')?.length}/{version?.approvals?.length} approved
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageCircle" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {version?.comments} comments
                      </span>
                    </div>
                  </div>

                  <div className="flex -space-x-2">
                    {version?.approvals?.map((approval, index) =>
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center ${
                  approval?.status === 'approved' ? 'bg-success' : 'bg-muted'}`
                  }
                  title={`${approval?.name} - ${approval?.status}`}>

                        <Icon
                    name={approval?.status === 'approved' ? 'Check' : 'Clock'}
                    size={10}
                    color="white" />

                      </div>
                )}
                  </div>
                </div>
              </div>
          )}
          </div>
        }

        {activeTab === 'approval' &&
        <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-heading font-medium text-foreground mb-2">Current Approval Status</h3>
              <p className="text-sm text-muted-foreground">
                Version 1.3 is currently pending approval from Division Head. 
                1 of 2 required approvals completed.
              </p>
            </div>

            {approvalWorkflow?.map((step, index) =>
          <div
            key={step?.id}
            className="flex items-start space-x-4 p-4 border border-border rounded-lg">

                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step?.status)}`}>
                    <Icon name={getStatusIcon(step?.status)} size={16} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground flex items-center">
                        {step?.name}
                        {step?.required &&
                    <span className="ml-2 text-xs bg-error/10 text-error px-2 py-0.5 rounded">
                            Required
                          </span>
                    }
                      </h4>
                      <p className="text-sm text-muted-foreground">Assigned to: {step?.assignee}</p>
                    </div>
                    
                    {step?.status === 'pending' &&
                <div className="flex items-center space-x-2">
                        <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onApprovalAction(step?.id, 'reject')}>

                          Reject
                        </Button>
                        <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onApprovalAction(step?.id, 'approve')}>

                          Approve
                        </Button>
                      </div>
                }
                  </div>

                  {step?.completedDate &&
              <p className="text-xs text-muted-foreground mb-2">
                      Completed: {formatDate(step?.completedDate)}
                    </p>
              }

                  {step?.comments &&
              <div className="bg-background border border-border rounded-md p-3 mt-2">
                      <p className="text-sm text-foreground">{step?.comments}</p>
                    </div>
              }
                </div>

                {index < approvalWorkflow?.length - 1 &&
            <div className="absolute left-8 mt-8 w-0.5 h-8 bg-border"></div>
            }
              </div>
          )}

            {/* Approval Actions */}
            <div className="bg-muted/30 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left" iconSize={14}>
                  Add Comment
                </Button>
                <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left" iconSize={14}>
                  Add Reviewer
                </Button>
                <Button variant="outline" size="sm" iconName="Bell" iconPosition="left" iconSize={14}>
                  Send Reminder
                </Button>
                <Button variant="outline" size="sm" iconName="History" iconPosition="left" iconSize={14}>
                  View History
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

};

export default ReportVersioning;