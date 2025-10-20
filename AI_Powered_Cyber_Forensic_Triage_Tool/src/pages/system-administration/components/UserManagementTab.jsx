import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const users = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    email: "s.chen@cyberforensic.gov",
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer",
    role: "Senior Forensic Analyst",
    department: "Digital Crimes Unit",
    status: "Active",
    lastActive: "2 minutes ago",
    casesAssigned: 8,
    permissions: ["Evidence Analysis", "Report Generation", "Case Management"],
    joinDate: "2022-03-15"
  },
  {
    id: 2,
    name: "Detective Mike Rodriguez",
    email: "m.rodriguez@cyberforensic.gov",
    avatar: "https://images.unsplash.com/photo-1645034648304-6e07d766b2a3",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in dark suit and tie",
    role: "Lead Investigator",
    department: "Cybercrime Division",
    status: "Active",
    lastActive: "15 minutes ago",
    casesAssigned: 12,
    permissions: ["Full Access", "User Management", "System Configuration"],
    joinDate: "2021-08-22"
  },
  {
    id: 3,
    name: "Agent Lisa Thompson",
    email: "l.thompson@cyberforensic.gov",
    avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39",
    avatarAlt: "Professional headshot of Caucasian woman with blonde hair in white blouse",
    role: "Junior Analyst",
    department: "Digital Crimes Unit",
    status: "Away",
    lastActive: "2 hours ago",
    casesAssigned: 4,
    permissions: ["Evidence Analysis", "Timeline Reconstruction"],
    joinDate: "2023-01-10"
  },
  {
    id: 4,
    name: "Specialist James Park",
    email: "j.park@cyberforensic.gov",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with glasses and short black hair in gray suit",
    role: "Technical Specialist",
    department: "IT Security",
    status: "Inactive",
    lastActive: "3 days ago",
    casesAssigned: 0,
    permissions: ["System Monitoring", "Technical Support"],
    joinDate: "2022-11-05"
  }];


  const departments = [
  { value: '', label: 'All Departments' },
  { value: 'Digital Crimes Unit', label: 'Digital Crimes Unit' },
  { value: 'Cybercrime Division', label: 'Cybercrime Division' },
  { value: 'IT Security', label: 'IT Security' },
  { value: 'Forensic Lab', label: 'Forensic Lab' }];


  const roles = [
  { value: '', label: 'All Roles' },
  { value: 'Senior Forensic Analyst', label: 'Senior Forensic Analyst' },
  { value: 'Lead Investigator', label: 'Lead Investigator' },
  { value: 'Junior Analyst', label: 'Junior Analyst' },
  { value: 'Technical Specialist', label: 'Technical Specialist' }];


  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesDepartment = !selectedDepartment || user?.department === selectedDepartment;
    const matchesRole = !selectedRole || user?.role === selectedRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
    prev?.includes(userId) ?
    prev?.filter((id) => id !== userId) :
    [...prev, userId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':return 'text-success bg-success/10 border-success/20';
      case 'Away':return 'text-warning bg-warning/10 border-warning/20';
      case 'Inactive':return 'text-muted-foreground bg-muted border-border';
      default:return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage investigator accounts and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}>

            Export Users
          </Button>
          <Button
            variant="default"
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
            onClick={() => setShowCreateModal(true)}>

            Add User
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="md:col-span-2" />

          <Select
            placeholder="Filter by department"
            options={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment} />

          <Select
            placeholder="Filter by role"
            options={roles}
            value={selectedRole}
            onChange={setSelectedRole} />

        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 &&
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" iconName="Mail" iconPosition="left" iconSize={14}>
                Send Message
              </Button>
              <Button variant="outline" size="sm" iconName="Settings" iconPosition="left" iconSize={14}>
                Bulk Edit
              </Button>
              <Button variant="destructive" size="sm" iconName="UserX" iconPosition="left" iconSize={14}>
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      }
      {/* Users Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < filteredUsers?.length}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setSelectedUsers(filteredUsers?.map((user) => user?.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }} />

                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role & Department</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cases</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) =>
              <tr key={user?.id} className="border-b border-border hover:bg-muted/30 forensic-transition">
                  <td className="p-4">
                    <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleUserSelect(user?.id)} />

                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                      src={user?.avatar}
                      alt={user?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{user?.role}</p>
                      <p className="text-sm text-muted-foreground">{user?.department}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    user?.status === 'Active' ? 'bg-success' :
                    user?.status === 'Away' ? 'bg-warning' : 'bg-muted-foreground'}`
                    }></div>
                      {user?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">{user?.casesAssigned}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{user?.lastActive}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-error hover:text-error">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers?.length} of {users?.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft" iconPosition="left" iconSize={14}>
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right" iconSize={14}>
            Next
          </Button>
        </div>
      </div>
      {/* Create User Modal */}
      {showCreateModal &&
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-200 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border forensic-shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">Add New User</h3>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCreateModal(false)}>

                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                required />

                <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                required />

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                label="Role"
                placeholder="Select role"
                options={roles?.slice(1)}
                required />

                <Select
                label="Department"
                placeholder="Select department"
                options={departments?.slice(1)}
                required />

              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Checkbox label="Evidence Analysis" />
                  <Checkbox label="Report Generation" />
                  <Checkbox label="Case Management" />
                  <Checkbox label="Timeline Reconstruction" />
                  <Checkbox label="System Monitoring" />
                  <Checkbox label="User Management" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}>

                Cancel
              </Button>
              <Button variant="default">
                Create User
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default UserManagementTab;