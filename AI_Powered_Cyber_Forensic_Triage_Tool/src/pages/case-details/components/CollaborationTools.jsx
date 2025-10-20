import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CollaborationTools = ({ collaborationData }) => {
  const [activeTab, setActiveTab] = useState('team');
  const [newNote, setNewNote] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  const statusColors = {
    'Online': 'bg-success',
    'Away': 'bg-warning',
    'Offline': 'bg-muted'
  };

  const taskStatusColors = {
    'Pending': 'bg-warning text-warning-foreground',
    'In Progress': 'bg-primary text-primary-foreground',
    'Completed': 'bg-success text-success-foreground',
    'Overdue': 'bg-error text-error-foreground'
  };

  const priorityColors = {
    'High': 'text-error',
    'Medium': 'text-warning',
    'Low': 'text-muted-foreground'
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      // In a real app, this would make an API call
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle?.trim() && newTaskAssignee) {
      // In a real app, this would make an API call
      console.log('Adding task:', { title: newTaskTitle, assignee: newTaskAssignee });
      setNewTaskTitle('');
      setNewTaskAssignee('');
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Header */}
      <div className="bg-card rounded-lg p-6 forensic-shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
              Team Collaboration
            </h2>
            <p className="text-sm text-muted-foreground">
              Coordinate investigation activities and share findings with team members
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" iconName="UserPlus" iconPosition="left">
              Invite Member
            </Button>
            <Button variant="default" iconName="Video" iconPosition="left">
              Start Meeting
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mt-6 bg-muted rounded-lg p-1">
          {[
            { id: 'team', label: 'Team Members', icon: 'Users' },
            { id: 'notes', label: 'Investigation Notes', icon: 'FileText' },
            { id: 'tasks', label: 'Tasks & Assignments', icon: 'CheckSquare' },
            { id: 'chat', label: 'Team Chat', icon: 'MessageSquare' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium forensic-transition ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Team Members Tab */}
      {activeTab === 'team' && (
        <div className="bg-card rounded-lg p-6 forensic-shadow-card">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Investigation Team ({collaborationData?.teamMembers?.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborationData?.teamMembers?.map((member) => (
              <div key={member?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Image
                      src={member?.avatar}
                      alt={member?.avatarAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${statusColors?.[member?.status]}`}></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{member?.name}</h4>
                    <p className="text-sm text-muted-foreground">{member?.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="text-foreground">{member?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="text-foreground">{member?.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cases:</span>
                    <span className="text-foreground">{member?.activeCases}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" iconName="MessageSquare" className="flex-1">
                    Message
                  </Button>
                  <Button variant="outline" size="sm" iconName="Phone">
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Investigation Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Add New Note */}
          <div className="bg-card rounded-lg p-6 forensic-shadow-card">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Add Investigation Note
            </h3>
            
            <div className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e?.target?.value)}
                placeholder="Enter your investigation notes, findings, or observations..."
                className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" iconName="Paperclip">
                    Attach File
                  </Button>
                  <Button variant="outline" size="sm" iconName="Image">
                    Add Image
                  </Button>
                </div>
                
                <Button 
                  variant="default" 
                  iconName="Plus" 
                  iconPosition="left"
                  onClick={handleAddNote}
                  disabled={!newNote?.trim()}
                >
                  Add Note
                </Button>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="bg-card rounded-lg forensic-shadow-card">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Investigation Notes ({collaborationData?.notes?.length})
              </h3>
            </div>
            
            <div className="divide-y divide-border">
              {collaborationData?.notes?.map((note) => (
                <div key={note?.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={note?.authorAvatar}
                      alt={note?.authorAvatarAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{note?.author}</h4>
                          <p className="text-sm text-muted-foreground">{note?.timestamp}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" iconName="Edit">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Trash2">
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-foreground mb-3">{note?.content}</p>
                      
                      {note?.attachments && note?.attachments?.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {note?.attachments?.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-muted rounded-lg text-sm">
                              <Icon name="Paperclip" size={14} />
                              <span>{attachment?.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <Icon name="ThumbsUp" size={14} />
                          <span>{note?.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <Icon name="MessageSquare" size={14} />
                          <span>{note?.replies}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <Icon name="Share2" size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Tasks & Assignments Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Add New Task */}
          <div className="bg-card rounded-lg p-6 forensic-shadow-card">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Create New Task
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Task Title"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e?.target?.value)}
                placeholder="Enter task description"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Assign To</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="">Select team member</option>
                  {collaborationData?.teamMembers?.map((member) => (
                    <option key={member?.id} value={member?.id}>{member?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="default" 
                iconName="Plus" 
                iconPosition="left"
                onClick={handleAddTask}
                disabled={!newTaskTitle?.trim() || !newTaskAssignee}
              >
                Create Task
              </Button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-card rounded-lg forensic-shadow-card">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Active Tasks ({collaborationData?.tasks?.length})
              </h3>
            </div>
            
            <div className="divide-y divide-border">
              {collaborationData?.tasks?.map((task) => (
                <div key={task?.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{task?.title}</h4>
                      <p className="text-sm text-muted-foreground">{task?.description}</p>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${taskStatusColors?.[task?.status]}`}>
                      {task?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Image
                          src={task?.assigneeAvatar}
                          alt={task?.assigneeAvatarAlt}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-foreground">{task?.assignee}</span>
                      </div>
                      
                      <span className={`font-medium ${priorityColors?.[task?.priority]}`}>
                        {task?.priority} Priority
                      </span>
                      
                      <span className="text-muted-foreground">Due: {task?.dueDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" iconName="Edit">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" iconName="MessageSquare">
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Team Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-card rounded-lg forensic-shadow-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Team Chat
            </h3>
          </div>
          
          <div className="h-96 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {collaborationData?.chatMessages?.map((message) => (
                <div key={message?.id} className="flex items-start gap-3">
                  <Image
                    src={message?.senderAvatar}
                    alt={message?.senderAvatarAlt}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm">{message?.sender}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground">{message?.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                />
                <Button variant="default" iconName="Send">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationTools;