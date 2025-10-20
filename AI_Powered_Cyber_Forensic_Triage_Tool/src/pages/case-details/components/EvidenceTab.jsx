import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceTab = ({ evidenceData }) => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const evidenceTypes = {
    'Digital Device': { icon: 'Smartphone', color: 'text-primary' },
    'Network Log': { icon: 'Network', color: 'text-accent' },
    'Email': { icon: 'Mail', color: 'text-success' },
    'Document': { icon: 'FileText', color: 'text-warning' },
    'Image': { icon: 'Image', color: 'text-error' },
    'Video': { icon: 'Video', color: 'text-secondary' }
  };

  const statusColors = {
    'Processing': 'bg-warning text-warning-foreground',
    'Analyzed': 'bg-success text-success-foreground',
    'Pending': 'bg-muted text-muted-foreground',
    'Failed': 'bg-error text-error-foreground'
  };

  const filteredEvidence = evidenceData?.filter(item => 
    filterType === 'all' || item?.type === filterType
  );

  const sortedEvidence = [...filteredEvidence]?.sort((a, b) => {
    if (sortBy === 'date') return new Date(b.collectedDate) - new Date(a.collectedDate);
    if (sortBy === 'name') return a?.name?.localeCompare(b?.name);
    if (sortBy === 'size') return b?.size - a?.size;
    return 0;
  });

  const handleEvidenceClick = (evidence) => {
    setSelectedEvidence(selectedEvidence?.id === evidence?.id ? null : evidence);
  };

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Evidence Controls */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
              >
                <option value="all">All Types</option>
                {Object.keys(evidenceTypes)?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
              >
                <option value="date">Date Collected</option>
                <option value="name">Name</option>
                <option value="size">File Size</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" iconName="Upload" iconPosition="left">
              Upload Evidence
            </Button>
            <Button variant="default" iconName="Download" iconPosition="left">
              Export All
            </Button>
          </div>
        </div>
      </div>
      {/* Evidence Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 forensic-shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Evidence</p>
              <p className="text-2xl font-bold text-foreground">{evidenceData?.length}</p>
            </div>
            <Icon name="Archive" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 forensic-shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Analyzed</p>
              <p className="text-2xl font-bold text-success">
                {evidenceData?.filter(e => e?.status === 'Analyzed')?.length}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 forensic-shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold text-warning">
                {evidenceData?.filter(e => e?.status === 'Processing')?.length}
              </p>
            </div>
            <Icon name="Clock" size={24} className="text-warning" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 forensic-shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Size</p>
              <p className="text-2xl font-bold text-foreground">
                {formatFileSize(evidenceData?.reduce((sum, e) => sum + e?.size, 0))}
              </p>
            </div>
            <Icon name="HardDrive" size={24} className="text-accent" />
          </div>
        </div>
      </div>
      {/* Evidence List */}
      <div className="bg-card rounded-lg forensic-shadow-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Digital Evidence ({sortedEvidence?.length})
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          {sortedEvidence?.map((evidence) => (
            <div key={evidence?.id} className="p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleEvidenceClick(evidence)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon 
                      name={evidenceTypes?.[evidence?.type]?.icon || 'File'} 
                      size={20} 
                      className={evidenceTypes?.[evidence?.type]?.color || 'text-muted-foreground'} 
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">{evidence?.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{evidence?.type}</span>
                      <span>{formatFileSize(evidence?.size)}</span>
                      <span>Collected: {evidence?.collectedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors?.[evidence?.status]}`}>
                    {evidence?.status}
                  </span>
                  <Icon 
                    name={selectedEvidence?.id === evidence?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {/* Evidence Details */}
              {selectedEvidence?.id === evidence?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Chain of Custody</h5>
                        <div className="space-y-2">
                          {evidence?.chainOfCustody?.map((entry, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-foreground">{entry?.officer}</span>
                              <span className="text-muted-foreground">-</span>
                              <span className="text-muted-foreground">{entry?.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Hash Verification</h5>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="font-mono text-xs text-foreground break-all">{evidence?.hash}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Icon name="Shield" size={14} className="text-success" />
                            <span className="text-xs text-success">Integrity Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">Processing Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Source Location:</span>
                            <span className="text-foreground">{evidence?.sourceLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Collection Method:</span>
                            <span className="text-foreground">{evidence?.collectionMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Processing Time:</span>
                            <span className="text-foreground">{evidence?.processingTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" iconName="Eye">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" iconName="Download">
                          Download
                        </Button>
                        <Button variant="outline" size="sm" iconName="Share2">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvidenceTab;