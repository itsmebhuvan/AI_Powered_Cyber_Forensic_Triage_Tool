import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EvidenceMetadata from './components/EvidenceMetadata';
import AIAnalysisResults from './components/AIAnalysisResults';
import VisualizationPanel from './components/VisualizationPanel';
import AnalysisTools from './components/AnalysisTools';
import ProcessingIndicator from './components/ProcessingIndicator';
import EvidenceTagging from './components/EvidenceTagging';

const EvidenceAnalysis = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [activePanel, setActivePanel] = useState('metadata');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock evidence data
  const evidenceData = {
    id: "EVD-2024-001-047",
    fileName: "suspicious_email_attachment.pdf",
    fileType: "PDF Document",
    fileSize: "2.4 MB",
    collectionDate: "10/18/2024 14:32:15",
    md5Hash: "d41d8cd98f00b204e9800998ecf8427e",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    custodyId: "COC-2024-001-047",
    collectedBy: "Agent Sarah Mitchell",
    integrityStatus: "verified",
    sourceDevice: "Dell Laptop - CORP-LT-4521",
    sourceLocation: "Finance Department - Floor 3",
    collectionMethod: "Forensic Imaging",
    tags: ["Suspicious", "Email", "Financial"],
    notes: [
      {
        id: 1,
        content: "Initial analysis reveals embedded JavaScript code that attempts to access local storage. Requires deeper examination for potential data exfiltration attempts.",
        category: "analysis",
        timestamp: "2024-10-18T14:45:00Z",
        investigator: "Dr. James Wilson"
      },
      {
        id: 2,
        content: "Evidence collected from CFO workstation during routine security audit. User reported receiving unexpected email with this attachment.",
        category: "evidence",
        timestamp: "2024-10-18T14:32:00Z",
        investigator: "Agent Sarah Mitchell"
      }
    ],
    timeline: [
      { action: "Evidence collected", user: "Agent Sarah Mitchell", timestamp: "10/18/2024 14:32", icon: "Download" },
      { action: "Hash verification completed", user: "System", timestamp: "10/18/2024 14:35", icon: "Shield" },
      { action: "AI analysis initiated", user: "Dr. James Wilson", timestamp: "10/18/2024 14:40", icon: "Brain" },
      { action: "Tagged as suspicious", user: "Dr. James Wilson", timestamp: "10/18/2024 14:45", icon: "Tag" }
    ]
  };

  // Mock AI analysis results
  const analysisResults = {
    anomalies: [
      {
        id: 1,
        title: "Embedded Malicious JavaScript",
        description: "Suspicious JavaScript code detected in PDF metadata",
        riskLevel: "critical",
        confidence: 94,
        detectedAt: "10/18/2024 14:42:33",
        details: `The PDF contains obfuscated JavaScript code that attempts to:\n• Access browser local storage\n• Establish connection to external domain (malicious-site.com)\n• Download additional payload from remote server\n• Modify system registry entries for persistence`
      },
      {
        id: 2,
        title: "Unusual File Creation Timestamp",
        description: "File creation time inconsistent with email timestamp",
        riskLevel: "medium",
        confidence: 78,
        detectedAt: "10/18/2024 14:43:15",
        details: "PDF creation timestamp (10/15/2024 03:22:17) predates the email send time by 3 days, suggesting pre-planned attack or file reuse from previous campaigns."
      }
    ],
    patterns: [
      {
        id: 1,
        name: "Phishing Campaign Pattern",
        type: "Email-based Attack",
        frequency: 12,
        strength: 87,
        description: "This evidence matches known patterns from the 'Operation GoldenEagle' phishing campaign targeting financial institutions. Similar JavaScript obfuscation techniques and payload delivery methods identified."
      },
      {
        id: 2,
        name: "APT Group Signature",
        type: "Advanced Persistent Threat",
        frequency: 5,
        strength: 72,
        description: "Code structure and encryption methods consistent with APT-29 (Cozy Bear) group tactics. Metadata manipulation techniques match previous incidents attributed to this threat actor."
      }
    ],
    behavioral: [
      {
        id: 1,
        behavior: "Automated Email Distribution",
        category: "Communication Pattern",
        suspicionLevel: "high",
        timeframe: "10/15/2024 - 10/18/2024",
        frequency: "47 emails in 72 hours",
        deviation: "2300% above normal",
        analysis: "Email account showed highly unusual sending patterns with identical attachments sent to multiple financial department employees across different organizations."
      },
      {
        id: 2,
        behavior: "Off-Hours System Access",
        category: "Access Pattern",
        suspicionLevel: "medium",
        timeframe: "10/16/2024 02:00 - 06:00",
        frequency: "Multiple login attempts",
        deviation: "Outside normal business hours",
        analysis: "System logs show repeated access attempts during maintenance window when security monitoring is typically reduced."
      }
    ],
    correlations: [
      {
        id: 1,
        title: "Cross-Case Evidence Match",
        type: "File Hash Correlation",
        strength: 96,
        relatedEvidence: ["Case #2024-003", "Case #2024-007", "Case #2024-012"],
        description: "Identical SHA-256 hash found in three other active investigations, suggesting coordinated attack campaign targeting multiple organizations simultaneously."
      },
      {
        id: 2,
        title: "Network Infrastructure Overlap",
        type: "IP Address Correlation",
        strength: 84,
        relatedEvidence: ["Network Logs", "DNS Records", "Firewall Alerts"],
        description: "Command and control server IP (192.168.1.100) matches infrastructure used in previous APT campaigns. Domain registration patterns indicate same threat actor group."
      }
    ]
  };

  // Mock visualization data
  const visualizationData = {
    networkTraffic: [
      { hour: '00:00', inbound: 120, outbound: 80 },
      { hour: '04:00', inbound: 95, outbound: 65 },
      { hour: '08:00', inbound: 340, outbound: 280 },
      { hour: '12:00', inbound: 450, outbound: 380 },
      { hour: '16:00', inbound: 520, outbound: 420 },
      { hour: '20:00', inbound: 280, outbound: 220 }
    ],
    protocolDistribution: [
      { name: 'HTTPS', value: 45 },
      { name: 'HTTP', value: 25 },
      { name: 'SMTP', value: 15 },
      { name: 'FTP', value: 10 },
      { name: 'Other', value: 5 }
    ],
    suspiciousConnections: [
      { source: '192.168.1.45', destination: '203.0.113.5', protocol: 'HTTPS', frequency: 47, riskLevel: 'high', timestamp: '14:32:15' },
      { source: '10.0.0.23', destination: '198.51.100.8', protocol: 'HTTP', frequency: 23, riskLevel: 'medium', timestamp: '14:28:42' },
      { source: '172.16.0.12', destination: '203.0.113.12', protocol: 'SMTP', frequency: 12, riskLevel: 'medium', timestamp: '14:25:33' }
    ],
    emailTimeline: [
      { time: '08:00', sent: 12, received: 45, suspicious: 2 },
      { time: '10:00', sent: 18, received: 67, suspicious: 5 },
      { time: '12:00', sent: 25, received: 89, suspicious: 8 },
      { time: '14:00', sent: 34, received: 123, suspicious: 15 },
      { time: '16:00', sent: 28, received: 98, suspicious: 12 },
      { time: '18:00', sent: 15, received: 56, suspicious: 3 }
    ],
    emailForensics: [
      { subject: "Urgent: Account Verification Required", from: "security@bank-alert.com", to: "cfo@company.com", risk: "high", timestamp: "14:32:15", attachments: 1, ipOrigin: "203.0.113.5" },
      { subject: "Invoice #INV-2024-1047", from: "billing@supplier.net", to: "accounts@company.com", risk: "medium", timestamp: "14:28:42", attachments: 1, ipOrigin: "198.51.100.8" },
      { subject: "Meeting Agenda - Board Review", from: "assistant@company.com", to: "board@company.com", risk: "low", timestamp: "14:25:33", attachments: 0, ipOrigin: "192.168.1.45" }
    ],
    systemLogs: [
      { category: 'Authentication', normal: 450, warning: 23, error: 5 },
      { category: 'File Access', normal: 1200, warning: 45, error: 12 },
      { category: 'Network', normal: 890, warning: 67, error: 8 },
      { category: 'System', normal: 340, warning: 15, error: 3 }
    ],
    criticalEvents: [
      { message: "Multiple failed login attempts detected", source: "Authentication Service", timestamp: "14:30:22" },
      { message: "Suspicious file execution blocked", source: "Endpoint Protection", timestamp: "14:32:45" },
      { message: "Unauthorized network connection attempt", source: "Firewall", timestamp: "14:35:12" },
      { message: "Privilege escalation attempt detected", source: "Security Monitor", timestamp: "14:38:33" }
    ],
    accessPatterns: [
      { user: "john.doe@company.com", resource: "Financial Database", attempts: 47, timeframe: "Last 24h" },
      { user: "admin@company.com", resource: "System Configuration", attempts: 23, timeframe: "Last 12h" },
      { user: "guest_user", resource: "Public Files", attempts: 156, timeframe: "Last 6h" }
    ],
    correlationMatrix: [
      { x: 10, y: 20, correlation: 85, evidence1: "Email Attachment", evidence2: "Network Logs" },
      { x: 25, y: 35, correlation: 72, evidence1: "System Logs", evidence2: "File Access" },
      { x: 40, y: 15, correlation: 94, evidence1: "DNS Records", evidence2: "Firewall Logs" },
      { x: 55, y: 45, correlation: 67, evidence1: "User Activity", evidence2: "Authentication Logs" }
    ],
    correlationDetails: [
      { type: "Temporal Correlation", evidenceA: "Email Receipt", evidenceB: "System Alert", strength: 94, description: "Both events occurred within 2-minute window, suggesting automated response to email processing." },
      { type: "Network Correlation", evidenceA: "Outbound Connection", evidenceB: "DNS Query", strength: 87, description: "DNS resolution immediately preceded suspicious outbound connection to same domain." },
      { type: "File Correlation", evidenceA: "PDF Attachment", evidenceB: "Temp File Creation", strength: 92, description: "Temporary files created match embedded resources from PDF attachment analysis." }
    ]
  };

  // Mock processing jobs
  const processingJobs = [
    {
      id: 1,
      fileName: "network_capture_10-18.pcap",
      analysisType: "Network Traffic Analysis",
      status: "processing",
      startTime: new Date(Date.now() - 300000),
      estimatedDuration: 600,
      currentStage: "Deep packet inspection"
    },
    {
      id: 2,
      fileName: "system_logs_batch.zip",
      analysisType: "Log Pattern Analysis",
      status: "queued",
      queuePosition: 2,
      estimatedStart: "15:45"
    },
    {
      id: 3,
      fileName: "email_headers.eml",
      analysisType: "Email Forensics",
      status: "completed",
      completedAt: "14:25",
      duration: "3m 42s"
    },
    {
      id: 4,
      fileName: "registry_dump.reg",
      analysisType: "Registry Analysis",
      status: "failed",
      completedAt: "14:18",
      duration: "Failed after 1m 23s"
    }
  ];

  const panels = [
    { id: 'metadata', label: 'Evidence Details', icon: 'FileSearch' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
    { id: 'visualization', label: 'Visualizations', icon: 'BarChart3' },
    { id: 'tools', label: 'Analysis Tools', icon: 'Settings' },
    { id: 'processing', label: 'Processing Status', icon: 'Zap' },
    { id: 'tagging', label: 'Organization', icon: 'Tag' }
  ];

  useEffect(() => {
    setSelectedEvidence(evidenceData);
  }, []);

  const handleAnalysisStart = (config) => {
    setIsAnalyzing(true);
    console.log('Starting analysis with config:', config);
    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleExport = () => {
    console.log('Exporting analysis results...');
  };

  const handleTagUpdate = (updatedTags) => {
    setSelectedEvidence(prev => ({
      ...prev,
      tags: updatedTags
    }));
  };

  const handleNoteAdd = (newNote) => {
    setSelectedEvidence(prev => ({
      ...prev,
      notes: [...(prev?.notes || []), newNote]
    }));
  };

  const renderPanelContent = () => {
    if (!selectedEvidence) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Evidence Selected</h3>
            <p className="text-muted-foreground">Select evidence from the case to begin analysis</p>
          </div>
        </div>
      );
    }

    switch (activePanel) {
      case 'metadata':
        return <EvidenceMetadata evidence={selectedEvidence} />;
      case 'analysis':
        return <AIAnalysisResults analysisData={analysisResults} />;
      case 'visualization':
        return <VisualizationPanel visualizationData={visualizationData} />;
      case 'tools':
        return <AnalysisTools onAnalysisStart={handleAnalysisStart} onExport={handleExport} />;
      case 'processing':
        return <ProcessingIndicator processingJobs={processingJobs} />;
      case 'tagging':
        return (
          <EvidenceTagging 
            evidence={selectedEvidence} 
            onTagUpdate={handleTagUpdate}
            onNoteAdd={handleNoteAdd}
          />
        );
      default:
        return <EvidenceMetadata evidence={selectedEvidence} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 forensic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Evidence Analysis</h1>
                <p className="text-muted-foreground mt-1">
                  AI-powered examination and pattern detection for digital evidence
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/case-details')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Case
                </Button>
                <Button
                  onClick={() => navigate('/timeline-reconstruction')}
                  iconName="Clock"
                  iconPosition="left"
                >
                  Timeline View
                </Button>
                <Button
                  onClick={() => navigate('/report-generation')}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Analysis Status Bar */}
          {isAnalyzing && (
            <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-3"></div>
                <div>
                  <p className="font-medium text-primary">Analysis in Progress</p>
                  <p className="text-sm text-primary/80">Processing evidence with AI detection algorithms...</p>
                </div>
              </div>
            </div>
          )}

          {/* Panel Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 bg-muted rounded-lg p-2">
              {panels?.map((panel) => (
                <button
                  key={panel?.id}
                  onClick={() => setActivePanel(panel?.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium forensic-transition ${
                    activePanel === panel?.id
                      ? 'bg-surface text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
                  }`}
                >
                  <Icon name={panel?.icon} size={16} className="mr-2" />
                  {panel?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="space-y-6">
            {renderPanelContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EvidenceAnalysis;