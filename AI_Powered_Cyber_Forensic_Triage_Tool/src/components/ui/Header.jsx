import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Cases', path: '/investigation-dashboard', icon: 'FolderOpen' },
    { label: 'Analysis', path: '/evidence-analysis', icon: 'Search' },
    { label: 'Timeline', path: '/timeline-reconstruction', icon: 'Clock' },
    { label: 'Reports', path: '/report-generation', icon: 'FileText' }
  ];

  const secondaryNavItems = [
    { label: 'Administration', path: '/system-administration', icon: 'Settings' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100 forensic-shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                CyberForensic AI
              </h1>
              <span className="text-xs text-muted-foreground font-caption">
                Digital Investigation Platform
              </span>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground hover:bg-muted forensic-transition"
            >
              {item?.label}
            </Button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground hover:bg-muted forensic-transition"
            >
              More
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md forensic-shadow-lg z-200">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => {
                        handleNavigation(item?.path);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted forensic-transition"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground hover:bg-muted forensic-transition"
          >
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></span>
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="sm"
            iconName="User"
            iconPosition="left"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground hover:bg-muted forensic-transition"
          >
            Investigator
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
        >
          <Icon name="Menu" size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMoreMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-4 py-2 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => {
                  handleNavigation(item?.path);
                  setIsMoreMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md forensic-transition"
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;