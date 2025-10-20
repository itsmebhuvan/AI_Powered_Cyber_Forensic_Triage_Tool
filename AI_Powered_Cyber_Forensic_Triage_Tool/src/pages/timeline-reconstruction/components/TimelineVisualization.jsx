import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineVisualization = ({ 
  events, 
  selectedEvent, 
  onEventSelect, 
  filters, 
  zoomLevel,
  onZoomChange,
  playbackState,
  onPlaybackControl 
}) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Mock timeline events data
  const mockEvents = [
    {
      id: 'evt_001',
      timestamp: new Date('2024-10-20T08:30:00'),
      type: 'network_access',
      severity: 'high',
      title: 'Suspicious Network Access',
      description: 'Unauthorized access attempt from external IP 192.168.1.100',
      source: 'Network Logs',
      correlationId: 'corr_001',
      metadata: {
        ip: '192.168.1.100',
        port: '443',
        protocol: 'HTTPS'
      }
    },
    {
      id: 'evt_002',
      timestamp: new Date('2024-10-20T08:45:00'),
      type: 'file_access',
      severity: 'medium',
      title: 'File System Access',
      description: 'Sensitive file accessed: /etc/passwd',
      source: 'System Logs',
      correlationId: 'corr_001',
      metadata: {
        file: '/etc/passwd',
        user: 'unknown',
        permissions: 'read'
      }
    },
    {
      id: 'evt_003',
      timestamp: new Date('2024-10-20T09:15:00'),
      type: 'data_exfiltration',
      severity: 'critical',
      title: 'Data Exfiltration Detected',
      description: 'Large data transfer to external server detected',
      source: 'Network Monitor',
      correlationId: 'corr_002',
      metadata: {
        size: '2.5GB',
        destination: '203.0.113.5',
        protocol: 'FTP'
      }
    },
    {
      id: 'evt_004',
      timestamp: new Date('2024-10-20T09:30:00'),
      type: 'malware_detection',
      severity: 'critical',
      title: 'Malware Signature Match',
      description: 'Known malware signature detected in system memory',
      source: 'Antivirus Engine',
      correlationId: 'corr_003',
      metadata: {
        signature: 'Trojan.Win32.Agent',
        process: 'svchost.exe',
        pid: '1234'
      }
    },
    {
      id: 'evt_005',
      timestamp: new Date('2024-10-20T10:00:00'),
      type: 'system_shutdown',
      severity: 'medium',
      title: 'Unexpected System Shutdown',
      description: 'System shutdown without proper procedure',
      source: 'System Events',
      correlationId: 'corr_003',
      metadata: {
        reason: 'unexpected',
        uptime: '72h 15m',
        lastUser: 'admin'
      }
    }
  ];

  const eventTypes = {
    network_access: { color: '#3B82F6', icon: 'Wifi' },
    file_access: { color: '#10B981', icon: 'File' },
    data_exfiltration: { color: '#EF4444', icon: 'Upload' },
    malware_detection: { color: '#DC2626', icon: 'Shield' },
    system_shutdown: { color: '#F59E0B', icon: 'Power' }
  };

  const severityColors = {
    low: '#6B7280',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#DC2626'
  };

  useEffect(() => {
    const handleResize = () => {
      const container = svgRef?.current?.parentElement;
      if (container) {
        setDimensions({
          width: container?.clientWidth,
          height: 400
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef?.current || !mockEvents?.length) return;

    const svg = d3?.select(svgRef?.current);
    svg?.selectAll('*')?.remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = dimensions?.width - margin?.left - margin?.right;
    const height = dimensions?.height - margin?.top - margin?.bottom;

    const timeExtent = d3?.extent(mockEvents, d => d?.timestamp);
    const xScale = d3?.scaleTime()?.domain(timeExtent)?.range([0, width]);

    const yScale = d3?.scaleBand()?.domain(mockEvents?.map((_, i) => i))?.range([0, height])?.padding(0.2);

    const g = svg?.append('g')?.attr('transform', `translate(${margin?.left},${margin?.top})`);

    // Add background grid
    const xAxis = d3?.axisBottom(xScale)?.tickFormat(d3?.timeFormat('%H:%M'));
    
    g?.append('g')?.attr('class', 'x-axis')?.attr('transform', `translate(0,${height})`)?.call(xAxis)?.selectAll('text')?.style('fill', 'var(--color-muted-foreground)')?.style('font-size', '12px');

    // Add grid lines
    g?.selectAll('.grid-line')?.data(xScale?.ticks())?.enter()?.append('line')?.attr('class', 'grid-line')?.attr('x1', d => xScale(d))?.attr('x2', d => xScale(d))?.attr('y1', 0)?.attr('y2', height)?.style('stroke', 'var(--color-border)')?.style('stroke-dasharray', '2,2')?.style('opacity', 0.3);

    // Add timeline events
    const eventGroups = g?.selectAll('.event-group')?.data(mockEvents)?.enter()?.append('g')?.attr('class', 'event-group')?.attr('transform', (d, i) => `translate(${xScale(d?.timestamp)},${yScale(i)})`);

    // Event circles
    eventGroups?.append('circle')?.attr('r', 8)?.attr('cy', yScale?.bandwidth() / 2)?.style('fill', d => severityColors?.[d?.severity])?.style('stroke', '#fff')?.style('stroke-width', 2)?.style('cursor', 'pointer')?.on('mouseover', (event, d) => {
        setHoveredEvent(d);
      })?.on('mouseout', () => {
        setHoveredEvent(null);
      })?.on('click', (event, d) => {
        onEventSelect(d);
      });

    // Event labels
    eventGroups?.append('text')?.attr('x', 15)?.attr('y', yScale?.bandwidth() / 2)?.attr('dy', '0.35em')?.style('fill', 'var(--color-foreground)')?.style('font-size', '12px')?.style('font-weight', '500')?.text(d => d?.title);

    // Correlation lines
    const correlations = d3?.group(mockEvents, d => d?.correlationId);
    correlations?.forEach((events, correlationId) => {
      if (events?.length > 1) {
        for (let i = 0; i < events?.length - 1; i++) {
          const event1 = events?.[i];
          const event2 = events?.[i + 1];
          const event1Index = mockEvents?.indexOf(event1);
          const event2Index = mockEvents?.indexOf(event2);

          g?.append('line')?.attr('x1', xScale(event1?.timestamp))?.attr('y1', yScale(event1Index) + yScale?.bandwidth() / 2)?.attr('x2', xScale(event2?.timestamp))?.attr('y2', yScale(event2Index) + yScale?.bandwidth() / 2)?.style('stroke', '#8B5CF6')?.style('stroke-width', 2)?.style('stroke-dasharray', '5,5')?.style('opacity', 0.6);
        }
      }
    });

  }, [dimensions, mockEvents, zoomLevel]);

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Timeline Visualization
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomIn"
              iconPosition="left"
              iconSize={14}
              onClick={() => onZoomChange(zoomLevel + 1)}
              disabled={zoomLevel >= 5}
            >
              Zoom In
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomOut"
              iconPosition="left"
              iconSize={14}
              onClick={() => onZoomChange(zoomLevel - 1)}
              disabled={zoomLevel <= 1}
            >
              Zoom Out
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={playbackState?.isPlaying ? "default" : "outline"}
            size="sm"
            iconName={playbackState?.isPlaying ? "Pause" : "Play"}
            iconSize={14}
            onClick={() => onPlaybackControl('toggle')}
          >
            {playbackState?.isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={14}
            onClick={() => onPlaybackControl('reset')}
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Timeline SVG */}
      <div className="relative">
        <svg
          ref={svgRef}
          width={dimensions?.width}
          height={dimensions?.height}
          className="w-full"
        />

        {/* Hover Tooltip */}
        {hoveredEvent && (
          <div className="absolute bg-popover border border-border rounded-lg p-3 shadow-lg z-10 pointer-events-none"
               style={{ 
                 left: '50%', 
                 top: '20px',
                 transform: 'translateX(-50%)'
               }}>
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">
                {hoveredEvent?.title}
              </div>
              <div className="text-muted-foreground mb-2">
                {hoveredEvent?.timestamp?.toLocaleTimeString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Source: {hoveredEvent?.source}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Timeline Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-foreground">Event Types:</span>
            {Object.entries(eventTypes)?.map(([type, config]) => (
              <div key={type} className="flex items-center space-x-2">
                <Icon name={config?.icon} size={14} color={config?.color} />
                <span className="text-xs text-muted-foreground capitalize">
                  {type?.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">Severity:</span>
            {Object.entries(severityColors)?.map(([severity, color]) => (
              <div key={severity} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;