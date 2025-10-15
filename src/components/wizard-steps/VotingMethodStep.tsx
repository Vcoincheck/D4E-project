import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { HelpCircle, Users, Shield, TrendingUp, Plus, X } from 'lucide-react';
import { Badge } from '../ui/badge';

interface VotingMethodStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function VotingMethodStep({ data, onUpdate }: VotingMethodStepProps) {
  const [formData, setFormData] = useState({
    proposalSubmissionType: data.proposalSubmissionType || 'anyone',
    tokenHoldingPercentage: data.tokenHoldingPercentage || [5],
    whitelistAddresses: data.whitelistAddresses || [],
    ...data
  });

  const [whitelistModalOpen, setWhitelistModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const addWhitelistAddress = () => {
    if (newAddress.trim() && !formData.whitelistAddresses.includes(newAddress.trim())) {
      const updatedAddresses = [...formData.whitelistAddresses, newAddress.trim()];
      handleInputChange('whitelistAddresses', updatedAddresses);
      setNewAddress('');
    }
  };

  const removeWhitelistAddress = (addressToRemove: string) => {
    const updatedAddresses = formData.whitelistAddresses.filter((addr: string) => addr !== addressToRemove);
    handleInputChange('whitelistAddresses', updatedAddresses);
  };

  const submissionOptions = [
    {
      id: 'anyone',
      title: 'Anyone Can Submit',
      description: 'Any member of the DAO can submit proposals without restrictions.',
      icon: Users,
      recommended: true
    },
    {
      id: 'owner-team',
      title: 'Only Owner Team',
      description: 'Only the DAO creators and designated team members can submit proposals.',
      icon: Shield,
      recommended: false
    },
    {
      id: 'whitelist',
      title: 'Whitelist',
      description: 'Pre-approved members can submit proposals. Addresses can be added via platform account, ADA handle, or wallet address.',
      icon: Users,
      recommended: false
    },
    {
      id: 'big-holder',
      title: 'Big Holder',
      description: 'Members holding a minimum percentage of tokens can submit proposals.',
      icon: TrendingUp,
      recommended: false
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Submit Proposal Requirements
            </CardTitle>
            <CardDescription>
              Define the basic requirements for proposal voting and participation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.proposalSubmissionType}
              onValueChange={(value) => handleInputChange('proposalSubmissionType', value)}
              className="space-y-4"
            >
              {submissionOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.id}
                    className="relative flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                          {option.title}
                        </Label>
                        {option.recommended && (
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Whitelist Configuration */}
        {formData.proposalSubmissionType === 'whitelist' && (
          <Card>
            <CardHeader>
              <CardTitle>Whitelist Configuration</CardTitle>
              <CardDescription>
                Add addresses that are allowed to submit proposals. You can add platform accounts, ADA handles, or wallet addresses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog open={whitelistModalOpen} onOpenChange={setWhitelistModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Add Whitelist Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Whitelist Address</DialogTitle>
                      <DialogDescription>
                        Enter a platform account, ADA handle, or wallet address to allow proposal submission.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="e.g., @username, $adahandle, addr1..."
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addWhitelistAddress} className="flex-1">
                          Add Address
                        </Button>
                        <Button variant="outline" onClick={() => setWhitelistModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {formData.whitelistAddresses.length > 0 && (
                  <div className="space-y-2">
                    <Label>Whitelisted Addresses ({formData.whitelistAddresses.length})</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.whitelistAddresses.map((address: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <span className="text-sm font-mono">{address}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeWhitelistAddress(address)}
                            className="h-6 w-6"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Token Holding Percentage Configuration */}
        {formData.proposalSubmissionType === 'big-holder' && (
          <Card>
            <CardHeader>
              <CardTitle>Token Holding Requirements</CardTitle>
              <CardDescription>
                Set the minimum percentage of tokens a member must hold to submit proposals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Minimum Token Holding Percentage</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of total token supply that must be held to submit proposals</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="px-3">
                  <Slider
                    value={formData.tokenHoldingPercentage}
                    onValueChange={(value) => handleInputChange('tokenHoldingPercentage', value)}
                    max={25}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1%</span>
                    <span className="font-medium">{formData.tokenHoldingPercentage[0]}%</span>
                    <span>25%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lower percentages make it easier to submit proposals but may reduce quality control.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Summary</CardTitle>
            <CardDescription>
              Review your proposal submission requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Submission Method:</span>
                <Badge variant="outline">
                  {submissionOptions.find(opt => opt.id === formData.proposalSubmissionType)?.title}
                </Badge>
              </div>
              
              {formData.proposalSubmissionType === 'whitelist' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Whitelisted Addresses:</span>
                  <Badge variant="secondary">{formData.whitelistAddresses.length} addresses</Badge>
                </div>
              )}
              
              {formData.proposalSubmissionType === 'big-holder' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Minimum Token Holding:</span>
                  <Badge variant="secondary">{formData.tokenHoldingPercentage[0]}%</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
