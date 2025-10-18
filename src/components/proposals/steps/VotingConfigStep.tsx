import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Vote, Clock, Users, Settings } from 'lucide-react';

interface VotingConfigStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function VotingConfigStep({ data, onUpdate }: VotingConfigStepProps) {
  const [formData, setFormData] = useState({
    votingType: data.votingType || '',
    votingDuration: data.votingDuration || '7',
    quorumRequired: data.quorumRequired || '20',
    passThreshold: data.passThreshold || '50',
    allowDelegation: data.allowDelegation || false,
    enableDiscussion: data.enableDiscussion || true,
    votingOptions: data.votingOptions || [],
    customOptions: data.customOptions || '',
  });

  // Use a ref to track if the component has been initialized
  const isInitializedRef = useRef(false);

  const votingTypes = [
    {
      value: 'single-choice',
      label: 'Single Choice (Yes/No)',
      description: 'Simple yes/no voting',
      options: ['Yes', 'No']
    },
    {
      value: 'single-choice-abstain',
      label: 'Yes/No/Abstain',
      description: 'Include abstain option',
      options: ['Yes', 'No', 'Abstain']
    },
    {
      value: 'multiple-choice',
      label: 'Multiple Choice',
      description: 'Custom options (specify below)',
      options: []
    },
    {
      value: 'weighted',
      label: 'Weighted Voting',
      description: 'Token-weighted decisions',
      options: ['Support', 'Against']
    },
    {
      value: 'quadratic',
      label: 'Quadratic Voting',
      description: 'Quadratic cost for additional votes',
      options: ['Support', 'Against']
    },
    {
      value: 'ranking',
      label: 'Ranked Choice',
      description: 'Rank options by preference',
      options: []
    }
  ];

  // Update form data when props.data changes (but not on first render)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }
    
    setFormData({
      votingType: data.votingType || '',
      votingDuration: data.votingDuration || '7',
      quorumRequired: data.quorumRequired || '20',
      passThreshold: data.passThreshold || '50',
      allowDelegation: data.allowDelegation || false,
      enableDiscussion: data.enableDiscussion || true,
      votingOptions: data.votingOptions || [],
      customOptions: data.customOptions || '',
    });
  }, [data]);

  // Call onUpdate only when formData changes (not on initialization)
  useEffect(() => {
    if (!isInitializedRef.current) {
      return;
    }
    
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const selectedType = votingTypes.find(type => type.value === formData.votingType);
    if (selectedType && selectedType.options.length > 0) {
      setFormData(prev => ({ ...prev, votingOptions: selectedType.options }));
    }
  }, [formData.votingType]);

  const selectedVotingType = votingTypes.find(type => type.value === formData.votingType);

  return (
    <div className="space-y-6">
      {/* Voting Method */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Voting Method
          </CardTitle>
          <CardDescription>
            Choose how DAO members will vote on your proposal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="voting-type">Voting Type</Label>
            <Select value={formData.votingType} onValueChange={(value) => handleInputChange('votingType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select voting mechanism" />
              </SelectTrigger>
              <SelectContent>
                {votingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voting Type Preview */}
          {selectedVotingType && (
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{selectedVotingType.label}</Badge>
                <span className="text-sm text-muted-foreground">{selectedVotingType.description}</span>
              </div>
              
              {selectedVotingType.options.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Voting Options:</div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedVotingType.options.map((option, index) => (
                      <Badge key={index} variant="outline">{option}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Options for Multiple Choice */}
          {formData.votingType === 'multiple-choice' && (
            <div>
              <Label htmlFor="custom-options">Custom Voting Options</Label>
              <Input
                id="custom-options"
                placeholder="Option A, Option B, Option C (comma-separated)"
                value={formData.customOptions}
                onChange={(e) => {
                  handleInputChange('customOptions', e.target.value);
                  const options = e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt);
                  handleInputChange('votingOptions', options);
                }}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Separate multiple options with commas
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voting Timeline */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Voting Timeline
          </CardTitle>
          <CardDescription>
            Set the duration and timing for your proposal vote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="voting-duration">Voting Duration (days)</Label>
              <Select value={formData.votingDuration} onValueChange={(value) => handleInputChange('votingDuration', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days (Fast decision)</SelectItem>
                  <SelectItem value="5">5 days (Standard)</SelectItem>
                  <SelectItem value="7">7 days (Recommended)</SelectItem>
                  <SelectItem value="14">14 days (Extended)</SelectItem>
                  <SelectItem value="30">30 days (Long-term)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  Voting ends: {new Date(Date.now() + parseInt(formData.votingDuration) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
                <div className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                  {formData.votingDuration} days from now
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting Parameters */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participation Requirements
          </CardTitle>
          <CardDescription>
            Set minimum participation and approval thresholds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quorum">Minimum Quorum (%)</Label>
              <Input
                id="quorum"
                type="number"
                min="1"
                max="100"
                value={formData.quorumRequired}
                onChange={(e) => handleInputChange('quorumRequired', e.target.value)}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Minimum % of members that must vote
              </div>
            </div>

            <div>
              <Label htmlFor="threshold">Pass Threshold (%)</Label>
              <Input
                id="threshold"
                type="number"
                min="1"
                max="100"
                value={formData.passThreshold}
                onChange={(e) => handleInputChange('passThreshold', e.target.value)}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">
                % of votes needed to pass
              </div>
            </div>
          </div>

          {/* Parameter Preview */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Quorum Requirement</div>
                <div className="text-muted-foreground">
                  At least {formData.quorumRequired}% must participate
                </div>
              </div>
              <div>
                <div className="font-medium">Approval Threshold</div>
                <div className="text-muted-foreground">
                  {formData.passThreshold}% approval needed to pass
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Additional Settings
          </CardTitle>
          <CardDescription>
            Configure additional voting features and options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Allow Vote Delegation</div>
              <div className="text-sm text-muted-foreground">
                Members can delegate their voting power to others
              </div>
            </div>
            <Switch
              checked={formData.allowDelegation}
              onCheckedChange={(checked) => handleInputChange('allowDelegation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Enable Discussion Period</div>
              <div className="text-sm text-muted-foreground">
                Allow members to discuss before voting begins
              </div>
            </div>
            <Switch
              checked={formData.enableDiscussion}
              onCheckedChange={(checked) => handleInputChange('enableDiscussion', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Next:</strong> Add supporting documents and resources for your proposal
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
