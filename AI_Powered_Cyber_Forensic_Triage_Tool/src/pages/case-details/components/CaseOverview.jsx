import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CaseOverview = ({ caseData }) => {
  const statusColors = {
    'Active': 'bg-success text-success-foreground',
    'Under Review': 'bg-warning text-warning-foreground',
    'Closed': 'bg-muted text-muted-foreground',
    'Critical': 'bg-error text-error-foreground'
  };

  const priorityColors = {
    'High': 'text-error',
    'Medium': 'text-warning',
    'Low': 'text-muted-foreground'
  };

  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                {caseData?.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors?.[caseData?.status]}`}>
                {caseData?.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Case ID</p>
                <p className="font-mono text-sm font-medium text-foreground">{caseData?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className={`text-sm font-medium ${priorityColors?.[caseData?.priority]}`}>
                  {caseData?.priority}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium text-foreground">{caseData?.createdDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium text-foreground">{caseData?.lastUpdated}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 forensic-transition">
              <Icon name="FileText" size={16} />
              Generate Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted forensic-transition">
              <Icon name="Share2" size={16} />
              Share Case
            </button>
          </div>
        </div>
      </div>
      {/* Crime Details */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} />
          Crime Details
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Crime Type</h3>
              <p className="text-foreground">{caseData?.crimeType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
              <p className="text-foreground">{caseData?.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Incident Date</h3>
              <p className="text-foreground">{caseData?.incidentDate}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-foreground text-sm leading-relaxed">{caseData?.description}</p>
          </div>
        </div>
      </div>
      {/* Suspect Information */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="User" size={20} />
          Suspect Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseData?.suspects?.map((suspect) => (
            <div key={suspect?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={suspect?.photo}
                  alt={suspect?.photoAlt}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground">{suspect?.name}</h4>
                  <p className="text-sm text-muted-foreground">{suspect?.status}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="text-foreground">{suspect?.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Known Aliases:</span>
                  <span className="text-foreground">{suspect?.aliases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Known Location:</span>
                  <span className="text-foreground">{suspect?.lastLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Victim Information */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Victim Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseData?.victims?.map((victim) => (
            <div key={victim?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{victim?.name}</h4>
                  <p className="text-sm text-muted-foreground">{victim?.type}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Contact: </span>
                  <span className="text-foreground">{victim?.contact}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Impact: </span>
                  <span className="text-foreground">{victim?.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseOverview;