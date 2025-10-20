import React from 'react';
import Icon from '../../../components/AppIcon';

const EvidenceMetadata = ({ evidence }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10 border-success/20';
      case 'compromised': return 'text-error bg-error/10 border-error/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getIntegrityIcon = (status) => {
    switch (status) {
      case 'verified': return 'ShieldCheck';
      case 'compromised': return 'ShieldAlert';
      case 'pending': return 'Shield';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 forensic-shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">Evidence Metadata</h3>
        <div className={`flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(evidence?.integrityStatus)}`}>
          <Icon name={getIntegrityIcon(evidence?.integrityStatus)} size={16} className="mr-2" />
          {evidence?.integrityStatus?.charAt(0)?.toUpperCase() + evidence?.integrityStatus?.slice(1)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Information */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">File Name</label>
            <p className="text-foreground font-mono text-sm mt-1">{evidence?.fileName}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">File Type</label>
            <p className="text-foreground mt-1">{evidence?.fileType}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">File Size</label>
            <p className="text-foreground mt-1">{evidence?.fileSize}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Collection Date</label>
            <p className="text-foreground mt-1">{evidence?.collectionDate}</p>
          </div>
        </div>

        {/* Hash & Integrity */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">MD5 Hash</label>
            <div className="flex items-center mt-1">
              <p className="text-foreground font-mono text-xs bg-muted px-2 py-1 rounded flex-1 mr-2">
                {evidence?.md5Hash}
              </p>
              <Icon name="Copy" size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">SHA-256 Hash</label>
            <div className="flex items-center mt-1">
              <p className="text-foreground font-mono text-xs bg-muted px-2 py-1 rounded flex-1 mr-2">
                {evidence?.sha256Hash}
              </p>
              <Icon name="Copy" size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Chain of Custody ID</label>
            <p className="text-foreground font-mono mt-1">{evidence?.custodyId}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Collected By</label>
            <p className="text-foreground mt-1">{evidence?.collectedBy}</p>
          </div>
        </div>
      </div>
      {/* Evidence Source */}
      <div className="mt-6 pt-6 border-t border-border">
        <label className="text-sm font-medium text-muted-foreground">Source Information</label>
        <div className="mt-2 bg-muted rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-foreground">Device:</span>
              <p className="text-muted-foreground mt-1">{evidence?.sourceDevice}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Location:</span>
              <p className="text-muted-foreground mt-1">{evidence?.sourceLocation}</p>
            </div>
            <div>
              <span className="font-medium text-foreground">Method:</span>
              <p className="text-muted-foreground mt-1">{evidence?.collectionMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceMetadata;