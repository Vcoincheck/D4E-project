import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { HelpCircle, Clock, Users, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface GovernanceSetupStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function GovernanceSetupStep({ data, onUpdate }: GovernanceSetupStepProps) {
  const [formData, setFormData] = useState({
    quorumPercentage: data.quorumPercentage || [20],
    votingPeriodEpochs: data.votingPeriodEpochs || 2,
    votingPeriodCustom: data.votingPeriodCustom || '',
    votingPeriodType: data.votingPeriodType || 'preset', // 'preset' or 'custom'
    proposalThreshold: data.proposalThreshold || 1000,
    executionDelay: data.executionDelay || 1,
    executionDelayCustom: data.executionDelayCustom || '',
    executionDelayType: data.executionDelayType || 'preset', // 'preset' or 'custom'
    proposalBond: data.proposalBond || 100,
    enableDelegation: data.enableDelegation || true,
    enableVetoRights: data.enableVetoRights || false,
    emergencyProposals: data.emergencyProposals || false,
    proposalCategories: data.proposalCategories || [],
    ...data
  });

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const votingPeriodOptions = [
    { value: 1, label: '1 epoch' },
    { value: 2, label: '2 epochs' },
    { value: 3, label: '3 epochs' },
    { value: 4, label: '4 epochs' },
    { value: 5, label: '5 epochs' },
    { value: 'custom', label: 'Custom period' },
  ];

  const executionDelayOptions = [
    { value: 0, label: 'Immediate' },
    { value: 1, label: '1 epoch' },
    { value: 2, label: '2 epochs' },
    { value: 3, label: '3 epochs' },
    { value: 4, label: '4 epochs' },
    { value: 'custom', label: 'Custom delay' },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            These governance parameters can be changed later through DAO proposals, but choose carefully as they will define how your DAO operates initially.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Voting Requirements
            </CardTitle>
            <CardDescription>
              Define the basic requirements for proposal voting and participation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Quorum Percentage</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Minimum percentage of total tokens that must participate for a vote to be valid</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="px-3">
                  <Slider
                    value={formData.quorumPercentage}
                    onValueChange={(value) => handleInputChange('quorumPercentage', value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1%</span>
                    <span className="font-medium">{formData.quorumPercentage[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lower quorum makes it easier to pass proposals but may reduce legitimacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Proposal Threshold</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum tokens required to create a proposal</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData.proposalThreshold}
                      onChange={(e) => handleInputChange('proposalThreshold', parseInt(e.target.value))}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      tokens
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Proposal Bond</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ADA deposit required to create a proposal (returned if proposal passes)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData.proposalBond}
                      onChange={(e) => handleInputChange('proposalBond', parseInt(e.target.value))}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      ADA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timing Parameters
            </CardTitle>
            <CardDescription>
              Set the timing for voting periods and proposal execution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Voting Period</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How long members have to vote on proposals (1 epoch = ~5 days)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formData.votingPeriodType === 'custom' ? 'custom' : formData.votingPeriodEpochs.toString()}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      handleInputChange('votingPeriodType', 'custom');
                    } else {
                      handleInputChange('votingPeriodType', 'preset');
                      handleInputChange('votingPeriodEpochs', parseInt(value));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {votingPeriodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.votingPeriodType === 'custom' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Enter custom period (e.g., 7 epochs, 10 days, 2 weeks)"
                      value={formData.votingPeriodCustom}
                      onChange={(e) => handleInputChange('votingPeriodCustom', e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Execution Delay</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time delay between proposal passage and execution (1 epoch = ~5 days)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select
                  value={formData.executionDelayType === 'custom' ? 'custom' : formData.executionDelay.toString()}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      handleInputChange('executionDelayType', 'custom');
                    } else {
                      handleInputChange('executionDelayType', 'preset');
                      handleInputChange('executionDelay', parseInt(value));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {executionDelayOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.executionDelayType === 'custom' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Enter custom delay (e.g., 3 epochs, 5 days, 1 week)"
                      value={formData.executionDelayCustom}
                      onChange={(e) => handleInputChange('executionDelayCustom', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Advanced Features
            </CardTitle>
            <CardDescription>
              Configure additional governance features for your DAO.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Enable Delegation</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Allow token holders to delegate their voting power to others</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Members can delegate their voting power to trusted representatives
                  </p>
                </div>
                <Switch
                  checked={formData.enableDelegation}
                  onCheckedChange={(checked) => handleInputChange('enableDelegation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Emergency Proposals</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Allow emergency proposals with shorter voting periods</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable fast-track proposals for urgent matters
                  </p>
                </div>
                <Switch
                  checked={formData.emergencyProposals}
                  onCheckedChange={(checked) => handleInputChange('emergencyProposals', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Veto Rights</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Allow designated roles to veto proposals before execution</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Founder or security council can veto proposals
                  </p>
                </div>
                <Switch
                  checked={formData.enableVetoRights}
                  onCheckedChange={(checked) => handleInputChange('enableVetoRights', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
