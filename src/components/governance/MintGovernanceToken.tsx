import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  ArrowLeft, 
  Coins, 
  HelpCircle, 
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  Settings,
  Users,
  Calculator,
  Upload,
  Image,
  Globe,
  Hash
} from 'lucide-react';

interface MintGovernanceTokenProps {
  onBack: () => void;
}

export function MintGovernanceToken({ onBack }: MintGovernanceTokenProps) {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '6',
    description: '',
    mintingEnabled: true,
    burningEnabled: false,
    transferPause: false
  });

  const [recipients, setRecipients] = useState([
    { address: '', amount: '' }
  ]);

  // New state for token avatar and IPFS
  const [tokenAvatar, setTokenAvatar] = useState<File | null>(null);
  const [tokenIPFSUrl, setTokenIPFSUrl] = useState('');

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyMintedToken, setNewlyMintedToken] = useState<any>(null);

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '' }]);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const updateRecipient = (index: number, field: 'address' | 'amount', value: string) => {
    const updated = recipients.map((recipient, i) => 
      i === index ? { ...recipient, [field]: value } : recipient
    );
    setRecipients(updated);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTokenAvatar(file);
      // Mock IPFS upload - simulate generating IPFS hash
      const mockIPFSHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setTokenIPFSUrl(`ipfs://${mockIPFSHash}`);
    }
  };

  const handleMint = async () => {
    setIsLoading(true);
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create the newly minted token data for display in governance page
    const newToken = {
      name: tokenData.name,
      fullName: tokenData.name,
      symbol: tokenData.symbol,
      totalSupply: tokenData.totalSupply,
      userBalance: totalToMint.toString(),
      mintingEnabled: tokenData.mintingEnabled,
      contractAddress: 'addr1q9...fx7k',
      decimals: parseInt(tokenData.decimals),
      votingPower: '0.1%',
      avatar: tokenAvatar,
      ipfsUrl: tokenIPFSUrl,
      description: tokenData.description
    };
    
    setNewlyMintedToken(newToken);
    setIsLoading(false);
    setStep(3);
  };

  const totalToMint = recipients.reduce((sum, recipient) => {
    return sum + (parseFloat(recipient.amount) || 0);
  }, 0);

  if (step === 3) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
          <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Token Minted Successfully!</h1>
                  <p className="text-sm text-muted-foreground">Your governance token has been created</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-8">
            <Card className="border-2 border-green-200/50 dark:border-green-800/50 bg-card/70 backdrop-blur-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-700 dark:text-green-300">
                  Governance Token Created!
                </CardTitle>
                <p className="text-muted-foreground">
                  Your {tokenData.name} ({tokenData.symbol}) token has been successfully minted on Cardano
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Token Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Token Name:</span>
                        <span className="font-medium">{tokenData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Symbol:</span>
                        <span className="font-medium">{tokenData.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Supply:</span>
                        <span className="font-medium">{tokenData.totalSupply}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Decimals:</span>
                        <span className="font-medium">{tokenData.decimals}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Recipients:</span>
                        <span className="font-medium">{recipients.filter(r => r.address).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Minted:</span>
                        <span className="font-medium">{totalToMint.toLocaleString()} {tokenData.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Transaction Fee:</span>
                        <span className="font-medium">~2.5 ADA</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Transaction Details</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <code className="text-xs break-all">
                      a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890
                    </code>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Token Policy ID:</span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <code className="text-xs break-all">
                      9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef
                    </code>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={onBack} className="flex-1 gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Return to Governance
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View on Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
        <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Mint Governance Token</h1>
                <p className="text-sm text-muted-foreground">Create and distribute your DAO governance tokens</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-8">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= stepNumber 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                <span className={`ml-2 ${step >= stepNumber ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {stepNumber === 1 ? 'Token Configuration' : 'Review & Mint'}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Token Configuration */}
              <Card className="border-2 border-blue-200/50 dark:border-blue-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-blue-600" />
                    Token Configuration
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Define the basic properties of your governance token
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="token-name">Token Name</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The full name of your governance token (e.g., "Cardano DAO Token")</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="token-name"
                        placeholder="e.g., Cardano DAO Token"
                        value={tokenData.name}
                        onChange={(e) => setTokenData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="token-symbol">Token Symbol</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A short identifier for your token (2-6 characters, e.g., "CDAO")</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="token-symbol"
                        placeholder="e.g., CDAO"
                        value={tokenData.symbol}
                        onChange={(e) => setTokenData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                        maxLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="total-supply">Total Supply</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The maximum number of tokens that will ever exist</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="total-supply"
                        type="number"
                        placeholder="e.g., 1000000"
                        value={tokenData.totalSupply}
                        onChange={(e) => setTokenData(prev => ({ ...prev, totalSupply: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="decimals">Decimals</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of decimal places (6 is standard for Cardano native tokens)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="decimals"
                        type="number"
                        min="0"
                        max="18"
                        value={tokenData.decimals}
                        onChange={(e) => setTokenData(prev => ({ ...prev, decimals: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* IPFS URL and Token Avatar Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border rounded-lg bg-muted/20">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>IPFS URL</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The IPFS URL where your token metadata will be stored</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Your URL:</span>
                        </div>
                        <code className="text-xs text-muted-foreground break-all">
                          {tokenIPFSUrl || 'ipfs://... (generated after avatar upload)'}
                        </code>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Token Avatar</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Upload an image to represent your token (PNG, JPG up to 5MB)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {tokenAvatar ? (
                        <div className="space-y-3">
                          <div className="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-3 bg-green-50 dark:bg-green-950/30">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border">
                                <img
                                  src={URL.createObjectURL(tokenAvatar)}
                                  alt="Token avatar"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-green-800 dark:text-green-200 text-sm">{tokenAvatar.name}</p>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                  {(tokenAvatar.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setTokenAvatar(null);
                              setTokenIPFSUrl('');
                            }}
                            className="w-full"
                          >
                            Replace Avatar
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                            id="avatar-upload"
                          />
                          <Label htmlFor="avatar-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">Upload Token Avatar</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose and utility of your governance token..."
                      value={tokenData.description}
                      onChange={(e) => setTokenData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Token Features</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="minting-enabled">Enable Future Minting</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Allow creating additional tokens in the future</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Switch
                          id="minting-enabled"
                          checked={tokenData.mintingEnabled}
                          onCheckedChange={(checked) => setTokenData(prev => ({ ...prev, mintingEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="burning-enabled">Enable Token Burning</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Allow tokens to be permanently destroyed</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Switch
                          id="burning-enabled"
                          checked={tokenData.burningEnabled}
                          onCheckedChange={(checked) => setTokenData(prev => ({ ...prev, burningEnabled: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Initial Distribution */}
              <Card className="border-2 border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Initial Distribution
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Define who receives tokens in the initial mint
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recipients.map((recipient, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                      <div className="space-y-2">
                        <Label>Recipient Address</Label>
                        <Input
                          placeholder="addr1..."
                          value={recipient.address}
                          onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="0"
                            value={recipient.amount}
                            onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                          />
                          {recipients.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeRecipient(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={addRecipient} className="gap-2">
                      <Users className="h-4 w-4" />
                      Add Recipient
                    </Button>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total to mint:</div>
                      <div className="font-semibold">{totalToMint.toLocaleString()} {tokenData.symbol || 'tokens'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!tokenData.name || !tokenData.symbol || !tokenData.totalSupply}
                  className="gap-2"
                >
                  Continue to Review
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Card className="border-2 border-orange-200/50 dark:border-orange-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    Review & Confirm
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Please review your token configuration before minting
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This action cannot be undone. Please carefully review all details before proceeding.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Token Configuration</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="font-medium">{tokenData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Symbol:</span>
                          <span className="font-medium">{tokenData.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Supply:</span>
                          <span className="font-medium">{tokenData.totalSupply}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Decimals:</span>
                          <span className="font-medium">{tokenData.decimals}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Features & Distribution</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Future Minting:</span>
                          <Badge variant={tokenData.mintingEnabled ? 'default' : 'secondary'}>
                            {tokenData.mintingEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Token Burning:</span>
                          <Badge variant={tokenData.burningEnabled ? 'default' : 'secondary'}>
                            {tokenData.burningEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Recipients:</span>
                          <span className="font-medium">{recipients.filter(r => r.address).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total to Mint:</span>
                          <span className="font-medium">{totalToMint.toLocaleString()} {tokenData.symbol}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Estimated Costs</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Token Creation Fee:</span>
                        <span className="font-medium">~2 ADA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Distribution Fee:</span>
                        <span className="font-medium">~{(recipients.filter(r => r.address).length * 0.5).toFixed(1)} ADA</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Estimated Fee:</span>
                        <span>~{(2 + recipients.filter(r => r.address).length * 0.5).toFixed(1)} ADA</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back to Configuration
                    </Button>
                    <Button 
                      onClick={handleMint} 
                      disabled={isLoading}
                      className="flex-1 gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Minting Token...
                        </>
                      ) : (
                        <>
                          <Coins className="h-4 w-4" />
                          Mint Token
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
