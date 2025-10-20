import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EvidenceTagging = ({ evidence, onTagUpdate, onNoteAdd }) => {
  const [newTag, setNewTag] = useState('');
  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  const predefinedTags = [
    { name: 'Suspicious', color: 'bg-error/10 text-error border-error/20' },
    { name: 'Verified', color: 'bg-success/10 text-success border-success/20' },
    { name: 'Encrypted', color: 'bg-warning/10 text-warning border-warning/20' },
    { name: 'Malware', color: 'bg-error/10 text-error border-error/20' },
    { name: 'Network', color: 'bg-primary/10 text-primary border-primary/20' },
    { name: 'Email', color: 'bg-accent/10 text-accent border-accent/20' },
    { name: 'Financial', color: 'bg-secondary/10 text-secondary border-secondary/20' },
    { name: 'Personal', color: 'bg-muted text-muted-foreground border-border' }
  ];

  const categories = [
    { value: 'evidence', label: 'Evidence Classification' },
    { value: 'analysis', label: 'Analysis Notes' },
    { value: 'investigation', label: 'Investigation Progress' },
    { value: 'legal', label: 'Legal Considerations' }
  ];

  const handleAddTag = (tagName) => {
    if (tagName && !evidence?.tags?.includes(tagName)) {
      const updatedTags = [...evidence?.tags, tagName];
      onTagUpdate(updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = evidence?.tags?.filter(tag => tag !== tagToRemove);
    onTagUpdate(updatedTags);
  };

  const handleAddNote = () => {
    if (newNote?.trim() && selectedCategory) {
      const note = {
        id: Date.now(),
        content: newNote?.trim(),
        category: selectedCategory,
        timestamp: new Date()?.toISOString(),
        investigator: 'Current User'
      };
      onNoteAdd(note);
      setNewNote('');
      setSelectedCategory('');
      setShowNoteForm(false);
    }
  };

  const getTagColor = (tagName) => {
    const predefined = predefinedTags?.find(tag => tag?.name === tagName);
    return predefined ? predefined?.color : 'bg-muted text-muted-foreground border-border';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'evidence': return 'FileSearch';
      case 'analysis': return 'Brain';
      case 'investigation': return 'Search';
      case 'legal': return 'Scale';
      default: return 'FileText';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'evidence': return 'text-primary';
      case 'analysis': return 'text-accent';
      case 'investigation': return 'text-secondary';
      case 'legal': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg forensic-shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Evidence Organization</h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Current Tags */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Tags</h4>
            <span className="text-sm text-muted-foreground">{evidence?.tags?.length} applied</span>
          </div>
          
          {evidence?.tags?.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {evidence?.tags?.map((tag, index) => (
                <div key={index} className={`flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${getTagColor(tag)}`}>
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:opacity-70 forensic-transition"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">No tags applied yet</p>
          )}

          {/* Add Custom Tag */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add custom tag..."
              value={newTag}
              onChange={(e) => setNewTag(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleAddTag(newTag)}
              className="flex-1"
            />
            <Button
              onClick={() => handleAddTag(newTag)}
              iconName="Plus"
              disabled={!newTag?.trim()}
            >
              Add
            </Button>
          </div>

          {/* Predefined Tags */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Quick Tags</h5>
            <div className="flex flex-wrap gap-2">
              {predefinedTags?.map((tag) => (
                <button
                  key={tag?.name}
                  onClick={() => handleAddTag(tag?.name)}
                  disabled={evidence?.tags?.includes(tag?.name)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium forensic-transition ${
                    evidence?.tags?.includes(tag?.name) 
                      ? 'opacity-50 cursor-not-allowed' :'hover:opacity-80'
                  } ${tag?.color}`}
                >
                  {tag?.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Investigation Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Investigation Notes</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNoteForm(!showNoteForm)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Note
            </Button>
          </div>

          {/* Add Note Form */}
          {showNoteForm && (
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories?.map((category) => (
                      <button
                        key={category?.value}
                        onClick={() => setSelectedCategory(category?.value)}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium forensic-transition ${
                          selectedCategory === category?.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-surface text-muted-foreground hover:text-foreground border border-border'
                        }`}
                      >
                        <Icon name={getCategoryIcon(category?.value)} size={16} className="mr-2" />
                        {category?.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Input
                  label="Note Content"
                  placeholder="Enter your investigation note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e?.target?.value)}
                  className="w-full"
                />
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote?.trim() || !selectedCategory}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save Note
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowNoteForm(false);
                      setNewNote('');
                      setSelectedCategory('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Notes */}
          {evidence?.notes && evidence?.notes?.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {evidence?.notes?.map((note) => (
                <div key={note?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <Icon 
                        name={getCategoryIcon(note?.category)} 
                        size={16} 
                        className={`mr-2 ${getCategoryColor(note?.category)}`} 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {categories?.find(cat => cat?.value === note?.category)?.label}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.timestamp)?.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">{note?.content}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By: {note?.investigator}</span>
                    <div className="flex items-center space-x-2">
                      <button className="hover:text-foreground forensic-transition">
                        <Icon name="Edit" size={14} />
                      </button>
                      <button className="hover:text-error forensic-transition">
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No investigation notes yet</p>
            </div>
          )}
        </div>

        {/* Evidence Timeline */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Activity Timeline</h4>
          <div className="space-y-3">
            {evidence?.timeline && evidence?.timeline?.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Icon name={activity?.icon} size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{activity?.user}</span>
                    <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceTagging;