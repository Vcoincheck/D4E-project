import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Checkbox } from '../../ui/checkbox';
import { Button } from '../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { HelpCircle, Wallet, Shield, Plus, X, AlertTriangle, Copy } from 'lucide-react';
import { Alert, AlertDescription } from '../../ui/alert';
import { Badge } from '../../ui/badge';

interface TreasuryMultisigStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function TreasuryMultisigStep({ data, onUpdate }: TreasuryMultisigStepProps) {
  const [formData, setFormData] = useState({
    treasuryType: data.treasuryType || 'dao-controlled',
    initialFunding: data.initialFunding || 0,
    multisigSigners: data.multisigSigners || [''],
    requiredSignatures: data.requiredSignatures || 2,
    enableBudgets: data.enableBudgets || true,
    autoDistribution: data.autoDistribution || false,
    treasuryReporting: data.treasuryReporting || true,
    allowNativeTokens: data.allowNativeTokens || true,
    allowNFTs: data.allowNFTs || false,
    ...data
  });

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const addSigner = () => {
    const updated = [...formData.multisigSigners, ''];
    handleInputChange('multisigSigners', updated);
  };

  const updateSigner = (index: number, address: string) => {
    const updated = [...formData.multisigSigners];
    updated[index] = address;
    handleInputChange('multisigSigners', updated);
  };

  const removeSigner = (index: number) => {
    const updated = formData.multisigSigners.filter((_: any, i: number) => i !== index);
    handleInputChange('multisigSigners', updated);
  };

  const treasuryTypes = [
    {
      id: 'dao-controlled',
      title: 'DAO-Controlled Treasury',
      description: 'Treasury controlled by governance proposals and voting',
      recommended: true
    },
    {
      id: 'multisig',
      title: 'Multi-Signature Treasury',
      description: 'Treasury controlled by a group of trusted signers',
      recommended: false
    },
    {
      id: 'hybrid',
      title: 'Hybrid Approach',
      description: 'Combination of DAO governance and multisig for different amounts',
      recommended: false
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Treasury setup is critical for your DAO's security. Consider using a multisig wallet for additional protection, especially in early stages.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Treasury Type
            </CardTitle>
            <CardDescription>
              Choose how your DAO's treasury will be managed and controlled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.treasuryType}
              onValueChange={(value) => handleInputChange('treasuryType', value)}
              className="space-y-4"
            >
              {treasuryTypes.map((type) => (
                <div
                  key={type.id}
                  className="relative flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem
                    value={type.id}
                    id={type.id}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={type.id} className="font-medium cursor-pointer">
                        {type.title}
                      </Label>
                      {type.recommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Initial Funding</CardTitle>
            <CardDescription>
              Set up the initial treasury allocation and funding sources.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="initial-funding">Initial Treasury Amount</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Amount of ADA to initially fund the treasury with</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  id="initial-funding"
                  type="number"
                  value={formData.initialFunding}
                  onChange={(e) => handleInputChange('initialFunding', parseFloat(e.target.value))}
                  className="pr-12"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  ADA
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                You can add more funds later or set up recurring contributions
              </p>
            </div>
          </CardContent>
        </Card>

        {(formData.treasuryType === 'multisig' || formData.treasuryType === 'hybrid') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Multi-Signature Setup
              </CardTitle>
              <CardDescription>
                Configure the multi-signature wallet for treasury security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Authorized Signers</Label>
                  <Button onClick={addSigner} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Signer
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.multisigSigners.map((signer: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter Cardano address (addr1...)"
                        value={signer}
                        onChange={(e) => updateSigner(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeSigner(index)}
                        disabled={formData.multisigSigners.length <= 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="required-sigs">Required Signatures</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of signatures required to execute transactions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      id="required-sigs"
                      type="number"
                      min="1"
                      max={formData.multisigSigners.length}
                      value={formData.requiredSignatures}
                      onChange={(e) => handleInputChange('requiredSignatures', parseInt(e.target.value))}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      of {formData.multisigSigners.length} signers
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Treasury Features</CardTitle>
            <CardDescription>
              Configure additional treasury management features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-budgets"
                  checked={formData.enableBudgets}
                  onCheckedChange={(checked) => handleInputChange('enableBudgets', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="enable-budgets"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enable Budget Allocation
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Create spending budgets for different categories and purposes
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="treasury-reporting"
                  checked={formData.treasuryReporting}
                  onCheckedChange={(checked) => handleInputChange('treasuryReporting', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="treasury-reporting"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Public Treasury Reporting
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Make treasury transactions and balance publicly visible
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-distribution"
                  checked={formData.autoDistribution}
                  onCheckedChange={(checked) => handleInputChange('autoDistribution', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="auto-distribution"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Automatic Distributions
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Enable scheduled payments and reward distributions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported Assets</CardTitle>
            <CardDescription>
              Choose what types of assets your treasury can hold and manage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow-ada"
                  checked={true}
                  disabled={true}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="allow-ada"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ADA (Required)
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Native Cardano currency - always enabled
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow-native-tokens"
                  checked={formData.allowNativeTokens}
                  onCheckedChange={(checked) => handleInputChange('allowNativeTokens', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="allow-native-tokens"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Native Tokens
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Other Cardano native tokens (fungible tokens)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow-nfts"
                  checked={formData.allowNFTs}
                  onCheckedChange={(checked) => handleInputChange('allowNFTs', checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="allow-nfts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    NFTs & Unique Assets
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Non-fungible tokens and unique digital assets
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
