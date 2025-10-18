import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { HelpCircle, Plus, X, Users, Mail, Copy, UserPlus, Crown, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '../../ui/alert';

interface AddMembersStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

interface Member {
  address: string;
  email: string;
  role: string;
  tokenAllocation: number;
  name?: string;
}

export function AddMembersStep({ data, onUpdate }: AddMembersStepProps) {
  const [formData, setFormData] = useState({
    members: data.members || [],
    inviteMessage: data.inviteMessage || '',
    publicInvite: data.publicInvite || false,
    ...data
  });

  const [newMember, setNewMember] = useState<Member>({
    address: '',
    email: '',
    role: 'member',
    tokenAllocation: 100,
    name: ''
  });

  const roles = [
    { value: 'founder', label: 'Founder', icon: Crown, description: 'Full DAO control and admin rights' },
    { value: 'admin', label: 'Admin', icon: Shield, description: 'Administrative privileges and treasury access' },
    { value: 'moderator', label: 'Moderator', icon: UserPlus, description: 'Can moderate discussions and proposals' },
    { value: 'member', label: 'Member', icon: Users, description: 'Standard voting and participation rights' }
  ];

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const addMember = () => {
    if (newMember.address || newMember.email) {
      const updatedMembers = [...formData.members, { ...newMember, id: Date.now() }];
      handleInputChange('members', updatedMembers);
      setNewMember({
        address: '',
        email: '',
        role: 'member',
        tokenAllocation: 100,
        name: ''
      });
    }
  };

  const removeMember = (id: number) => {
    const updatedMembers = formData.members.filter((member: any) => member.id !== id);
    handleInputChange('members', updatedMembers);
  };

  const updateMember = (id: number, field: string, value: any) => {
    const updatedMembers = formData.members.map((member: any) =>
      member.id === id ? { ...member, [field]: value } : member
    );
    handleInputChange('members', updatedMembers);
  };

  const totalTokens = formData.members.reduce((sum: number, member: any) => sum + member.tokenAllocation, 0);

  const generateInviteLink = () => {
    return `https://dao-platform.io/join/your-dao-id?invite=${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Alert>
          <UserPlus className="h-4 w-4" />
          <AlertDescription>
            Adding members is optional during setup. You can always invite members after your DAO is deployed.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add Initial Members
            </CardTitle>
            <CardDescription>
              Invite initial members to your DAO and assign their roles and token allocations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-name">Name (Optional)</Label>
                  <Input
                    id="member-name"
                    placeholder="John Doe"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member-email">Email (Optional)</Label>
                  <Input
                    id="member-email"
                    type="email"
                    placeholder="john@example.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="member-address">Cardano Address</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Member's Cardano wallet address for receiving governance tokens</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="member-address"
                  placeholder="addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a52s2kxz9qfx69e"
                  value={newMember.address}
                  onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-role">Role</Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <div>
                                <div className="font-medium">{role.label}</div>
                                <div className="text-xs text-muted-foreground">{role.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="token-allocation">Token Allocation</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of governance tokens to allocate to this member</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="token-allocation"
                    type="number"
                    min="0"
                    value={newMember.tokenAllocation}
                    onChange={(e) => setNewMember({ ...newMember, tokenAllocation: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <Button onClick={addMember} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>
          </CardContent>
        </Card>

        {formData.members.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Member List</CardTitle>
              <CardDescription>
                Review and manage your initial DAO members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.members.map((member: any) => {
                  const roleInfo = roles.find(r => r.value === member.role);
                  const RoleIcon = roleInfo?.icon || Users;
                  
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                            {member.name ? member.name.charAt(0).toUpperCase() : 'M'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              {member.name && <span className="font-medium">{member.name}</span>}
                              <Badge variant="outline" className="gap-1">
                                <RoleIcon className="h-3 w-3" />
                                {roleInfo?.label}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {member.email && <span>{member.email} • </span>}
                              {member.tokenAllocation.toLocaleString()} tokens
                            </div>
                            {member.address && (
                              <div className="text-xs text-muted-foreground font-mono">
                                {member.address.slice(0, 20)}...{member.address.slice(-10)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Token Allocation:</span>
                    <span className="font-medium">{totalTokens.toLocaleString()} tokens</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Invitation Settings
            </CardTitle>
            <CardDescription>
              Customize the invitation message and sharing options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-message">Welcome Message</Label>
              <Textarea
                id="invite-message"
                placeholder="Welcome to our DAO! We're excited to have you join our community..."
                value={formData.inviteMessage}
                onChange={(e) => handleInputChange('inviteMessage', e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                This message will be included in invitation emails
              </p>
            </div>

            <div className="space-y-3">
              <Label>Public Invite Link</Label>
              <div className="flex gap-2">
                <Input
                  value={generateInviteLink()}
                  readOnly
                  className="flex-1"
                />
                <Button size="icon" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link to allow anyone to request to join your DAO
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
