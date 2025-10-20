import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CaseOverview from './components/CaseOverview';
import EvidenceTab from './components/EvidenceTab';
import AIAnalysisTab from './components/AIAnalysisTab';
import InvestigationTimeline from './components/InvestigationTimeline';
import CollaborationTools from './components/CollaborationTools';

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock case data
  const caseData = {
    id: "CASE-2024-001",
    title: "Corporate Data Breach Investigation",
    status: "Active",
    priority: "High",
    createdDate: "Oct 15, 2024",
    lastUpdated: "Oct 20, 2024",
    crimeType: "Cybercrime - Data Breach",
    location: "TechCorp Headquarters, San Francisco, CA",
    incidentDate: "October 12, 2024",
    description: `Large-scale data breach affecting customer database containing personal information of over 50,000 users. Initial investigation suggests unauthorized access through compromised employee credentials and potential insider involvement. Evidence indicates sophisticated attack patterns with attempts to cover digital footprints.`,
    suspects: [
    {
      id: 1,
      name: "Marcus Chen",
      age: 34,
      status: "Person of Interest",
      aliases: "None Known",
      lastLocation: "San Francisco, CA",
      photo: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      photoAlt: "Professional headshot of Asian man with short black hair wearing dark suit"
    },
    {
      id: 2,
      name: "Sarah Williams",
      age: 28,
      status: "Under Investigation",
      aliases: "S. Wilson",
      lastLocation: "Oakland, CA",
      photo: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      photoAlt: "Professional headshot of woman with brown hair in business attire smiling"
    }],

    victims: [
    {
      id: 1,
      name: "TechCorp Inc.",
      type: "Primary Victim - Corporation",
      contact: "legal@techcorp.com",
      impact: "Data breach affecting 50,000+ customers, estimated $2.5M in damages"
    },
    {
      id: 2,
      name: "Customer Database Users",
      type: "Secondary Victims - Individuals",
      contact: "Via TechCorp Legal Department",
      impact: "Personal information compromised, potential identity theft risk"
    }]

  };

  // Mock evidence data
  const evidenceData = [
  {
    id: "EVD-001",
    name: "Server Access Logs",
    type: "Network Log",
    size: 2048576,
    status: "Analyzed",
    collectedDate: "Oct 13, 2024",
    sourceLocation: "TechCorp Main Server",
    collectionMethod: "Digital Forensic Imaging",
    processingTime: "2.5 hours",
    hash: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    chainOfCustody: [
    { officer: "Det. Johnson", timestamp: "Oct 13, 2024 09:15 AM" },
    { officer: "Forensic Tech Martinez", timestamp: "Oct 13, 2024 11:30 AM" },
    { officer: "Analyst Thompson", timestamp: "Oct 14, 2024 02:00 PM" }]

  },
  {
    id: "EVD-002",
    name: "Employee Workstation Image",
    type: "Digital Device",
    size: 536870912,
    status: "Processing",
    collectedDate: "Oct 14, 2024",
    sourceLocation: "Marcus Chen\'s Workstation",
    collectionMethod: "Bit-by-bit Imaging",
    processingTime: "In Progress",
    hash: "sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
    chainOfCustody: [
    { officer: "Det. Rodriguez", timestamp: "Oct 14, 2024 08:00 AM" },
    { officer: "Forensic Tech Kim", timestamp: "Oct 14, 2024 10:15 AM" }]

  },
  {
    id: "EVD-003",
    name: "Email Communications",
    type: "Email",
    size: 10485760,
    status: "Analyzed",
    collectedDate: "Oct 15, 2024",
    sourceLocation: "Corporate Email Server",
    collectionMethod: "Email Export",
    processingTime: "1.2 hours",
    hash: "sha256:c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
    chainOfCustody: [
    { officer: "Det. Wilson", timestamp: "Oct 15, 2024 01:30 PM" },
    { officer: "Analyst Davis", timestamp: "Oct 15, 2024 03:45 PM" }]

  },
  {
    id: "EVD-004",
    name: "Security Camera Footage",
    type: "Video",
    size: 1073741824,
    status: "Pending",
    collectedDate: "Oct 16, 2024",
    sourceLocation: "Building Security System",
    collectionMethod: "Digital Copy",
    processingTime: "Pending Analysis",
    hash: "sha256:d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3",
    chainOfCustody: [
    { officer: "Det. Brown", timestamp: "Oct 16, 2024 11:00 AM" }]

  }];


  // Mock AI analysis data
  const analysisData = {
    lastAnalysis: "Oct 20, 2024 08:30 AM",
    overallRisk: 85,
    anomaliesCount: 12,
    patternsCount: 8,
    confidence: 92,
    anomalyDistribution: [
    { name: "Unauthorized Access", value: 45 },
    { name: "Data Exfiltration", value: 30 },
    { name: "System Manipulation", value: 15 },
    { name: "Cover-up Attempts", value: 10 }],

    criticalAnomalies: [
    {
      id: 1,
      type: "Unusual Login Pattern",
      severity: "High",
      confidence: 95,
      description: "Multiple failed login attempts followed by successful access using compromised credentials",
      timestamp: "Oct 12, 2024 02:15 AM"
    },
    {
      id: 2,
      type: "Large Data Transfer",
      severity: "High",
      confidence: 88,
      description: "Abnormal data transfer volume detected during off-hours",
      timestamp: "Oct 12, 2024 03:22 AM"
    },
    {
      id: 3,
      type: "Log Deletion Attempt",
      severity: "Medium",
      confidence: 76,
      description: "Evidence of attempted log file manipulation and deletion",
      timestamp: "Oct 12, 2024 04:10 AM"
    }],

    patternFrequency: [
    { time: "00:00", frequency: 2 },
    { time: "02:00", frequency: 8 },
    { time: "04:00", frequency: 5 },
    { time: "06:00", frequency: 1 },
    { time: "08:00", frequency: 3 },
    { time: "10:00", frequency: 4 },
    { time: "12:00", frequency: 6 },
    { time: "14:00", frequency: 7 },
    { time: "16:00", frequency: 9 },
    { time: "18:00", frequency: 4 },
    { time: "20:00", frequency: 2 },
    { time: "22:00", frequency: 3 }],

    identifiedPatterns: [
    {
      id: 1,
      name: "Credential Stuffing Attack",
      occurrences: 15,
      confidence: 94,
      description: "Systematic attempt to gain unauthorized access using stolen credentials",
      lastSeen: "Oct 12, 2024"
    },
    {
      id: 2,
      name: "Data Exfiltration Pattern",
      occurrences: 8,
      confidence: 87,
      description: "Consistent pattern of large file transfers to external locations",
      lastSeen: "Oct 12, 2024"
    }],

    timelineActivity: [
    { hour: "00", activity: 12 },
    { hour: "01", activity: 8 },
    { hour: "02", activity: 25 },
    { hour: "03", activity: 18 },
    { hour: "04", activity: 6 },
    { hour: "05", activity: 3 },
    { hour: "06", activity: 15 },
    { hour: "07", activity: 22 },
    { hour: "08", activity: 35 },
    { hour: "09", activity: 28 }],

    keyEvents: [
    {
      id: 1,
      title: "Initial Breach Detected",
      description: "Automated security system detected unusual access patterns",
      timestamp: "Oct 12, 2024 02:15 AM",
      impact: "High",
      confidence: 98
    },
    {
      id: 2,
      title: "Data Exfiltration Confirmed",
      description: "Large volume data transfer to external IP address confirmed",
      timestamp: "Oct 12, 2024 03:22 AM",
      impact: "Critical",
      confidence: 95
    }],

    networkConnections: [
    {
      id: 1,
      ip: "192.168.1.100",
      location: "San Francisco, CA",
      connections: 45,
      risk: "High",
      lastActivity: "Oct 12, 2024"
    },
    {
      id: 2,
      ip: "203.45.67.89",
      location: "Unknown (VPN)",
      connections: 12,
      risk: "Critical",
      lastActivity: "Oct 12, 2024"
    }],

    trafficPatterns: [
    { protocol: "HTTP", volume: 1250 },
    { protocol: "HTTPS", volume: 2800 },
    { protocol: "FTP", volume: 450 },
    { protocol: "SSH", volume: 180 }],

    aiInsights: [
    {
      id: 1,
      title: "Coordinated Attack Pattern",
      description: "Evidence suggests a coordinated attack involving multiple threat vectors and insider knowledge",
      confidence: 89,
      timestamp: "Oct 20, 2024 08:30 AM"
    },
    {
      id: 2,
      title: "Advanced Persistent Threat Indicators",
      description: "Attack patterns consistent with APT groups, suggesting sophisticated threat actor",
      confidence: 76,
      timestamp: "Oct 20, 2024 08:30 AM"
    }]

  };

  // Mock timeline data
  const timelineData = [
  {
    id: 1,
    title: "Initial Breach Detection",
    description: "Automated security system triggered alert for unusual access patterns",
    type: "System Event",
    timestamp: "2024-10-12T02:15:00Z",
    officer: "System Alert",
    priority: "High",
    status: "Completed",
    duration: "Immediate",
    location: "TechCorp Data Center",
    notes: "Automated detection system identified multiple failed login attempts followed by successful unauthorized access.",
    attachments: [
    { name: "security_alert_001.log", size: "2.5 KB" },
    { name: "access_pattern_analysis.pdf", size: "1.2 MB" }],

    relatedEvidence: ["EVD-001", "EVD-003"]
  },
  {
    id: 2,
    title: "Evidence Collection - Server Logs",
    description: "Forensic imaging of server access logs and system files",
    type: "Evidence Collection",
    timestamp: "2024-10-13T09:15:00Z",
    officer: "Det. Johnson",
    priority: "High",
    status: "Completed",
    duration: "4 hours",
    location: "TechCorp Server Room",
    notes: "Complete forensic imaging performed on main database server. Chain of custody maintained throughout process.",
    attachments: [
    { name: "imaging_report.pdf", size: "856 KB" },
    { name: "hash_verification.txt", size: "1.1 KB" }],

    relatedEvidence: ["EVD-001"]
  },
  {
    id: 3,
    title: "Suspect Interview - Marcus Chen",
    description: "Initial interview with primary suspect regarding system access",
    type: "Interview",
    timestamp: "2024-10-14T14:30:00Z",
    officer: "Det. Rodriguez",
    priority: "High",
    status: "Completed",
    duration: "2 hours",
    location: "Police Station Interview Room 2",
    notes: "Suspect provided alibi for time of breach. Claims credentials were compromised. Requested legal representation.",
    attachments: [
    { name: "interview_transcript.pdf", size: "3.2 MB" },
    { name: "audio_recording.mp3", size: "45 MB" }],

    relatedEvidence: ["EVD-002"]
  },
  {
    id: 4,
    title: "AI Analysis Completed",
    description: "Automated analysis of digital evidence using AI pattern recognition",
    type: "Analysis",
    timestamp: "2024-10-15T16:45:00Z",
    officer: "AI System",
    priority: "Medium",
    status: "Completed",
    duration: "6 hours",
    location: "Digital Forensics Lab",
    notes: "AI analysis identified 12 anomalies and 8 distinct attack patterns. High confidence in coordinated attack theory.",
    attachments: [
    { name: "ai_analysis_report.pdf", size: "5.8 MB" },
    { name: "pattern_visualization.png", size: "2.1 MB" }],

    relatedEvidence: ["EVD-001", "EVD-002", "EVD-003"]
  },
  {
    id: 5,
    title: "Legal Consultation",
    description: "Consultation with prosecutor regarding evidence and potential charges",
    type: "Legal Action",
    timestamp: "2024-10-18T10:00:00Z",
    officer: "Det. Wilson",
    priority: "Medium",
    status: "Completed",
    duration: "1.5 hours",
    location: "District Attorney\'s Office",
    notes: "Prosecutor reviewed evidence package. Recommended additional digital forensics before filing charges.",
    attachments: [
    { name: "legal_memo.pdf", size: "1.8 MB" }],

    relatedEvidence: []
  },
  {
    id: 6,
    title: "Progress Report Generation",
    description: "Comprehensive progress report for case stakeholders",
    type: "Report",
    timestamp: "2024-10-20T08:30:00Z",
    officer: "Det. Johnson",
    priority: "Low",
    status: "In Progress",
    duration: "Ongoing",
    location: "Detective Bureau",
    notes: "Compiling comprehensive report including AI analysis results, evidence summary, and investigation timeline.",
    attachments: [],
    relatedEvidence: ["EVD-001", "EVD-002", "EVD-003", "EVD-004"]
  }];


  // Mock collaboration data
  const collaborationData = {
    teamMembers: [
    {
      id: 1,
      name: "Det. Sarah Johnson",
      role: "Lead Investigator",
      department: "Cybercrime Unit",
      experience: "8 years",
      activeCases: 3,
      status: "Online",
      avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      avatarAlt: "Professional headshot of woman with brown hair in business attire"
    },
    {
      id: 2,
      name: "Tech. Michael Rodriguez",
      role: "Digital Forensics Specialist",
      department: "Forensics Lab",
      experience: "5 years",
      activeCases: 2,
      status: "Online",
      avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      avatarAlt: "Professional headshot of Hispanic man with short dark hair in suit"
    },
    {
      id: 3,
      name: "Analyst Jennifer Kim",
      role: "Data Analyst",
      department: "Intelligence Unit",
      experience: "3 years",
      activeCases: 4,
      status: "Away",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Professional headshot of Asian woman with long black hair smiling"
    }],

    notes: [
    {
      id: 1,
      author: "Det. Sarah Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      authorAvatarAlt: "Professional headshot of woman with brown hair in business attire",
      content: `Initial analysis of server logs reveals sophisticated attack pattern. The perpetrator used legitimate credentials but accessed systems outside normal business hours. This suggests either insider involvement or compromised credentials.\n\nKey findings:\n- Multiple failed login attempts before successful access\n- Large data transfers during off-hours\n- Attempts to delete audit logs`,
      timestamp: "Oct 20, 2024 09:15 AM",
      likes: 3,
      replies: 2,
      attachments: [
      { name: "login_analysis.xlsx", size: "245 KB" }]

    },
    {
      id: 2,
      author: "Tech. Michael Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      authorAvatarAlt: "Professional headshot of Hispanic man with short dark hair in suit",
      content: "Forensic imaging of Marcus Chen's workstation is complete. Found evidence of remote access software and encrypted files that may contain exfiltrated data. Hash verification confirms data integrity. Proceeding with decryption analysis.",
      timestamp: "Oct 19, 2024 03:30 PM",
      likes: 2,
      replies: 1,
      attachments: []
    }],

    tasks: [
    {
      id: 1,
      title: "Complete network traffic analysis",
      description: "Analyze network logs for the 48-hour period surrounding the breach",
      assignee: "Analyst Jennifer Kim",
      assigneeAvatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      assigneeAvatarAlt: "Professional headshot of Asian woman with long black hair smiling",
      status: "In Progress",
      priority: "High",
      dueDate: "Oct 22, 2024"
    },
    {
      id: 2,
      title: "Interview secondary suspect",
      description: "Conduct formal interview with Sarah Williams regarding her system access",
      assignee: "Det. Sarah Johnson",
      assigneeAvatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      assigneeAvatarAlt: "Professional headshot of woman with brown hair in business attire",
      status: "Pending",
      priority: "High",
      dueDate: "Oct 21, 2024"
    },
    {
      id: 3,
      title: "Prepare evidence summary for prosecutor",
      description: "Compile comprehensive evidence package for legal review",
      assignee: "Det. Sarah Johnson",
      assigneeAvatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      assigneeAvatarAlt: "Professional headshot of woman with brown hair in business attire",
      status: "Completed",
      priority: "Medium",
      dueDate: "Oct 18, 2024"
    }],

    chatMessages: [
    {
      id: 1,
      sender: "Tech. Michael Rodriguez",
      senderAvatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      senderAvatarAlt: "Professional headshot of Hispanic man with short dark hair in suit",
      content: "Just finished the workstation imaging. Found some interesting encrypted files.",
      timestamp: "2024-10-20T14:30:00Z"
    },
    {
      id: 2,
      sender: "Det. Sarah Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
      senderAvatarAlt: "Professional headshot of woman with brown hair in business attire",
      content: "Great work! Can you prioritize the decryption? We need those files for tomorrow\'s meeting.",
      timestamp: "2024-10-20T14:32:00Z"
    },
    {
      id: 3,
      sender: "Analyst Jennifer Kim",
      senderAvatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      senderAvatarAlt: "Professional headshot of Asian woman with long black hair smiling",
      content: "I\'m seeing some unusual network patterns in the traffic analysis. Will have a full report by end of day.",
      timestamp: "2024-10-20T14:35:00Z"
    }]

  };

  const tabs = [
  { id: 'overview', label: 'Case Overview', icon: 'FileText' },
  { id: 'evidence', label: 'Evidence', icon: 'Archive' },
  { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
  { id: 'timeline', label: 'Timeline', icon: 'Clock' },
  { id: 'collaboration', label: 'Collaboration', icon: 'Users' }];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CaseOverview caseData={caseData} />;
      case 'evidence':
        return <EvidenceTab evidenceData={evidenceData} />;
      case 'analysis':
        return <AIAnalysisTab analysisData={analysisData} />;
      case 'timeline':
        return <InvestigationTimeline timelineData={timelineData} />;
      case 'collaboration':
        return <CollaborationTools collaborationData={collaborationData} />;
      default:
        return <CaseOverview caseData={caseData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`pt-16 forensic-transition ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => window.history?.back()}>

                Back to Dashboard
              </Button>
              <div className="w-px h-6 bg-border"></div>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Investigation Dashboard</span>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground font-medium">Case Details</span>
              </nav>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {caseData?.title}
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive case management and investigation coordination
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" iconName="Share2" iconPosition="left">
                  Share Case
                </Button>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Data
                </Button>
                <Button variant="default" iconName="FileText" iconPosition="left">
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg forensic-shadow-card mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 forensic-transition ${
                activeTab === tab?.id ?
                'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
                }>

                  <Icon name={tab?.icon} size={16} />
                  {tab?.label}
                </button>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>);

};

export default CaseDetails;