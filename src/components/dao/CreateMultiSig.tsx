import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';
import MultisigEditor from '../governance/multisigeditor';
import { 
  ArrowLeft, 
  Shield, 
  HelpCircle, 
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  Users,
  Plus,
  Trash2,
  Key,
  ShieldCheck,
  Upload,
  Image,
  Settings,
  Zap,
  Clock,
  Crown
} from 'lucide-react';
import exampleImage from '../../assets/3860c4cd1e9cc834aa00e7ebaeadcdf965a24586.png';

interface CreateMultiSigProps {
  onBack: () => void;
}

interface Signer {
  name: string;
  address: string;
  role: string;
}

type MultisigMode = 'simple' | 'advanced' | 'full';

export function CreateMultiSig({ onBack }: CreateMultiSigProps) {
  const [mode, setMode] = useState<MultisigMode>('simple');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [multisigData, setMultisigData] = useState({
    name: '',
    description: '',
    requiredSignatures: '3',
    totalSigners: '5'
  });

  // ===================== Timelock (Before/After tách riêng) =====================
  // Simple -> luôn tắt timelock
  // Advanced/Full -> có hai tham số độc lập: After và Before (mỗi cái có Date/Time/Slot)
  const [timelockEnabled, setTimelockEnabled] = useState(false);

  const [timelockAfter, setTimelockAfter] = useState(false);
  const [afterDate, setAfterDate] = useState<string>('');
  const [afterTime, setAfterTime] = useState<string>('00:00');
  const [afterSlot, setAfterSlot] = useState<number | null>(null);

  const [timelockBefore, setTimelockBefore] = useState(false);
  const [beforeDate, setBeforeDate] = useState<string>('');
  const [beforeTime, setBeforeTime] = useState<string>('00:00');
  const [beforeSlot, setBeforeSlot] = useState<number | null>(null);

  // Khi đổi mode sang simple -> tắt toàn bộ timelock
  useEffect(() => {
    if (mode === 'simple') {
      setTimelockEnabled(false);
      setTimelockAfter(false);
      setTimelockBefore(false);
      setAfterDate('');
      setAfterTime('00:00');
      setAfterSlot(null);
      setBeforeDate('');
      setBeforeTime('00:00');
      setBeforeSlot(null);
    }
  }, [mode]);

  // Tính "slot" ước lượng từ date+time (1 slot ~ 1s, demo)
  useEffect(() => {
    if (!timelockEnabled || !timelockAfter || !afterDate || !afterTime) {
      setAfterSlot(null);
      return;
    }
    const ts = new Date(`${afterDate}T${afterTime}:00Z`).getTime();
    if (Number.isFinite(ts)) setAfterSlot(Math.floor(ts / 1000));
    else setAfterSlot(null);
  }, [timelockEnabled, timelockAfter, afterDate, afterTime]);

  useEffect(() => {
    if (!timelockEnabled || !timelockBefore || !beforeDate || !beforeTime) {
      setBeforeSlot(null);
      return;
    }
    const ts = new Date(`${beforeDate}T${beforeTime}:00Z`).getTime();
    if (Number.isFinite(ts)) setBeforeSlot(Math.floor(ts / 1000));
    else setBeforeSlot(null);
  }, [timelockEnabled, timelockBefore, beforeDate, beforeTime]);

  // ============================================================================

  const [presetConfig, setPresetConfig] = useState('custom');

  const [signers, setSigners] = useState<Signer[]>([
    { name: '', address: '', role: 'Member' }
  ]);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const addSigner = () => {
    setSigners([...signers, { name: '', address: '', role: 'Member' }]);
  };

  const removeSigner = (index: number) => {
    setSigners(signers.filter((_, i) => i !== index));
  };

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const updated = signers.map((signer, i) => 
      i === index ? { ...signer, [field]: value } : signer
    );
    setSigners(updated);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep(3);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // Apply preset configurations (giữ như cũ cho cấu hình signer)
  const applyPresetConfig = (preset: string) => {
    switch (preset) {
      case '2-of-3':
        setMultisigData(prev => ({ ...prev, requiredSignatures: '2', totalSigners: '3' }));
        setSigners([
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' }
        ]);
        break;
      case '3-of-5':
        setMultisigData(prev => ({ ...prev, requiredSignatures: '3', totalSigners: '5' }));
        setSigners([
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' },
          { name: '', address: '', role: 'Member' }
        ]);
        break;
      default:
        break;
    }
    setPresetConfig(preset);
  };

  const validSigners = signers.filter(s => s.name && s.address);
  const requiredSigs = parseInt(multisigData.requiredSignatures);

  // ======= Validation cho timelock =======
  const anyParamOn = timelockAfter || timelockBefore;
  const afterFilledOk = !timelockAfter || (!!afterDate && !!afterTime && afterSlot !== null);
  const beforeFilledOk = !timelockBefore || (!!beforeDate && !!beforeTime && beforeSlot !== null);
  const bothOn = timelockAfter && timelockBefore;
  const rangeOk = !bothOn || (afterSlot !== null && beforeSlot !== null && afterSlot < beforeSlot);

  const timelockFormOk =
    !timelockEnabled ||
    (anyParamOn && afterFilledOk && beforeFilledOk && rangeOk);

  // Mode-specific guide components
  const SimpleGuideDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex items-center justify-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <HelpCircle className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Simple Multisig Guide</DialogTitle>
          <DialogDescription>
            Learn about the Simple mode for multisig wallet creation
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>
            Simple mode provides a straightforward setup for basic multisig wallets with essential features only.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold">Perfect for:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Small teams (3-7 members)</li>
              <li>• Basic treasury management</li>
              <li>• Quick setup without complex features</li>
              <li>• Standard security requirements</li>
            </ul>
          </div>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Recommended for most use cases. Easy to set up and manage.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AdvancedGuideDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex items-center justify-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <HelpCircle className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Advanced Multisig Guide</DialogTitle>
          <DialogDescription>
            Discover the Advanced mode features for enhanced multisig security
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>
            Advanced mode adds timelock functionality and preset configurations for enhanced security.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold">Features include:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Timelock delays (Before/After a specific time)</li>
              <li>• Preset configurations (2-of-3, 3-of-5, custom)</li>
              <li>• Enhanced security controls</li>
              <li>• Suitable for medium-sized organizations</li>
            </ul>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <h5 className="font-medium mb-1">Timelock Feature</h5>
            <p className="text-xs text-muted-foreground">
              Require transactions to be submitted only before/after a chosen timestamp.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const FullGuideDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex items-center justify-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <HelpCircle className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Full Multisig Guide</DialogTitle>
          <DialogDescription>
            Complete guide to multisig wallet creation with all available features
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is a Multi-Signature Wallet?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A multi-signature (multisig) wallet is a type of cryptocurrency wallet that requires multiple signatures to authorize a transaction. 
                This provides an additional layer of security and is commonly used by organizations, DAOs, and teams.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Key Benefits</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Enhanced security through shared control</li>
                <li>• Protection against single point of failure</li>
                <li>• Transparent governance and accountability</li>
                <li>• Prevention of unauthorized transactions</li>
                <li>• Suitable for organizational treasuries</li>
                <li>• Visual diagrams for better understanding</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Configuration Examples</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">2-of-3 Multisig</div>
                  <div className="text-muted-foreground">Good for small teams, requires 2 signatures out of 3 members</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">3-of-5 Multisig</div>
                  <div className="text-muted-foreground">Balanced security for medium teams, requires 3 signatures out of 5 members</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">5-of-7 Multisig</div>
                  <div className="text-muted-foreground">High security for large organizations, requires 5 signatures out of 7 members</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Use hardware wallets for enhanced security</li>
                <li>• Distribute signers geographically</li>
                <li>• Keep backup keys in secure locations</li>
                <li>• Regularly test the signing process</li>
                <li>• Maintain clear documentation of signers</li>
                <li>• Consider time locks for additional security</li>
              </ul>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Once created, multisig wallets cannot be modified. Ensure all signer addresses are correct before creating.
              </AlertDescription>
            </Alert>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

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
                  <h1 className="text-xl font-semibold">Multi-Signature Address Created!</h1>
                  <p className="text-sm text-muted-foreground">Your secure treasury address is ready</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-8">
            <Card className="border-2 border-green-200/50 dark:border-green-800/50 bg-card/70 backdrop-blur-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-700 dark:text-green-300">
                  Multi-Sig Address Created!
                </CardTitle>
                <p className="text-muted-foreground">
                  Your {multisigData.name} multi-signature address has been successfully created
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Address Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Name:</span>
                        <span className="font-medium">{multisigData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Required Signatures:</span>
                        <span className="font-medium">{multisigData.requiredSignatures} of {multisigData.totalSigners}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Signers:</span>
                        <span className="font-medium">{validSigners.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mode:</span>
                        <Badge variant="outline" className={
                          mode === 'simple' 
                            ? 'text-blue-600 border-blue-600' 
                            : mode === 'advanced'
                            ? 'text-purple-600 border-purple-600'
                            : 'text-orange-600 border-orange-600'
                        }>
                          {mode === 'simple' ? 'Simple' : mode === 'advanced' ? 'Advanced' : 'Full'}
                        </Badge>
                      </div>

                      {(mode !== 'simple') && timelockEnabled && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">After (UTC):</span>
                            <span className="font-medium">
                              {timelockAfter ? `${afterDate || '-'} ${afterTime || ''}` : '-'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">After Slot (approx):</span>
                            <span className="font-medium">{timelockAfter ? (afterSlot ?? '-') : '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Before (UTC):</span>
                            <span className="font-medium">
                              {timelockBefore ? `${beforeDate || '-'} ${beforeTime || ''}` : '-'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Before Slot (approx):</span>
                            <span className="font-medium">{timelockBefore ? (beforeSlot ?? '-') : '-'}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Network Info</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Network:</span>
                        <span className="font-medium">Cardano Mainnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Address Type:</span>
                        <span className="font-medium">Multi-Signature</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Creation Fee:</span>
                        <span className="font-medium">~2.5 ADA</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Multi-Signature Address</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <code className="text-xs break-all">
                      addr1qxy2fyr8uh8g7fghjklmnopqrstuvwxyz123456789abcdef9k4l
                    </code>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Authorized Signers</h3>
                  <div className="space-y-2">
                    {validSigners.map((signer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium">{signer.name}</div>
                          <div className="text-xs text-muted-foreground">{signer.role}</div>
                        </div>
                        <div className="text-right">
                          <code className="text-xs">{signer.address.slice(0, 12)}...{signer.address.slice(-8)}</code>
                        </div>
                      </div>
                    ))}
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
                <h1 className="text-xl font-semibold">Create Multi-Signature Address</h1>
                <p className="text-sm text-muted-foreground">Set up a secure multi-signature treasury address</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {/* Mode Selection */}
          {step === 1 && (
            <Card className="border-2 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Choose Creation Mode
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the complexity level for your multisig setup
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Button
                      variant={mode === 'simple' ? "default" : "outline"}
                      className={`h-auto p-6 flex flex-col items-start gap-3 w-full ${
                        mode === 'simple' ? 'bg-blue-600 hover:bg-blue-700' : ''
                      }`}
                      onClick={() => setMode('simple')}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        <span className="font-semibold">Simple</span>
                      </div>
                      <p className="text-sm text-left opacity-90">
                        Quick setup simple cases.
                      </p>
                    </Button>
                    <div className="absolute top-2 right-2">
                      <SimpleGuideDialog />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Button
                      variant={mode === 'advanced' ? "default" : "outline"}
                      className={`h-auto p-6 flex flex-col items-start gap-3 w-full ${
                        mode === 'advanced' ? 'bg-purple-600 hover:bg-purple-700' : ''
                      }`}
                      onClick={() => setMode('advanced')}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">Advanced</span>
                      </div>
                      <p className="text-sm text-left opacity-90">
                        Add timelock features.
                      </p>
                    </Button>
                    <div className="absolute top-2 right-2">
                      <AdvancedGuideDialog />
                    </div>
                  </div>

                  <div className="relative">
                    <Button
                      variant={mode === 'full' ? "default" : "outline"}
                      className={`h-auto p-6 flex flex-col items-start gap-3 w-full ${
                        mode === 'full' ? 'bg-orange-600 hover:bg-orange-700' : ''
                      }`}
                      onClick={() => setMode('full')}
                    >
                      <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        <span className="font-semibold">Full</span>
                      </div>
                      <p className="text-sm text-left opacity-90">
                        Complete features.
                      </p>
                    </Button>
                    <div className="absolute top-2 right-2">
                      <FullGuideDialog />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Advanced/Full: Quick Configuration for signers (giữ) */}
          {(mode === 'advanced' || mode === 'full') && step === 1 && (
            <Card className="border-2 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Quick Configuration
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose from preset configurations or customize your own
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant={presetConfig === '2-of-3' ? "default" : "outline"}
                    onClick={() => applyPresetConfig('2-of-3')}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <span className="font-semibold">2-of-3</span>
                    <span className="text-xs opacity-80">Small teams</span>
                  </Button>
                  <Button
                    variant={presetConfig === '3-of-5' ? "default" : "outline"}
                    onClick={() => applyPresetConfig('3-of-5')}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <span className="font-semibold">3-of-5</span>
                    <span className="text-xs opacity-80">Medium teams</span>
                  </Button>
                  <Button
                    variant={presetConfig === 'custom' ? "default" : "outline"}
                    onClick={() => applyPresetConfig('custom')}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <span className="font-semibold">Custom</span>
                    <span className="text-xs opacity-80">Manual setup</span>
                  </Button>
                </div>

                <Separator />

                {/* Timelock (Before/After độc lập, KHÔNG preset) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-semibold">Enable Timelock</Label>
                      <p className="text-sm text-muted-foreground">
                        Constrain transactions to only happen before/after specific times
                      </p>
                    </div>
                    <Switch
                      checked={timelockEnabled}
                      onCheckedChange={(v: boolean) => setTimelockEnabled(v)}
                    />
                  </div>

                  {timelockEnabled && (
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* AFTER */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Switch checked={timelockAfter} onCheckedChange={setTimelockAfter} />
                            <span className="font-semibold">After</span>
                            <span className="text-xs text-muted-foreground">(UTC)</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Calendar Date</Label>
                              <Input
                                type="date"
                                value={afterDate}
                                disabled={!timelockAfter}
                                onChange={(e) => setAfterDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <Input
                                type="time"
                                step={60}
                                value={afterTime}
                                disabled={!timelockAfter}
                                onChange={(e) => setAfterTime(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>After Slot (approx)</Label>
                            <Input value={timelockAfter ? (afterSlot ?? '') : ''} readOnly placeholder="-" />
                          </div>
                        </div>

                        {/* BEFORE */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Switch checked={timelockBefore} onCheckedChange={setTimelockBefore} />
                            <span className="font-semibold">Before</span>
                            <span className="text-xs text-muted-foreground">(UTC)</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Calendar Date</Label>
                              <Input
                                type="date"
                                value={beforeDate}
                                disabled={!timelockBefore}
                                onChange={(e) => setBeforeDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <Input
                                type="time"
                                step={60}
                                value={beforeTime}
                                disabled={!timelockBefore}
                                onChange={(e) => setBeforeTime(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Before Slot (approx)</Label>
                            <Input value={timelockBefore ? (beforeSlot ?? '') : ''} readOnly placeholder="-" />
                          </div>
                        </div>
                      </div>

                      {/* Live Review & Notice */}
                      <div className="space-y-2">
                        <div className="rounded-md border p-3 bg-muted/30">
                          <div className="text-sm font-medium mb-1">Live Review</div>
                          <div className="text-sm text-muted-foreground">
                            {(!timelockAfter && !timelockBefore) && 'No timelock constraints selected.'}
                            {timelockAfter && !timelockBefore && (
                              <>Transactions allowed only <strong>after</strong> {afterDate || '-'} {afterTime || ''} (slot ~ {afterSlot ?? '-'}) UTC.</>
                            )}
                            {!timelockAfter && timelockBefore && (
                              <>Transactions allowed only <strong>before</strong> {beforeDate || '-'} {beforeTime || ''} (slot ~ {beforeSlot ?? '-'}) UTC.</>
                            )}
                            {timelockAfter && timelockBefore && (
                              <>Transactions allowed <strong>after</strong> {afterDate || '-'} {afterTime || ''} and <strong>before</strong> {beforeDate || '-'} {beforeTime || ''} (slots ~ {afterSlot ?? '-'} → {beforeSlot ?? '-'}) UTC.</>
                            )}
                          </div>
                        </div>

                        <Alert>
                          <AlertDescription className="text-sm">
                            <strong>Notice:</strong> <em>Before & After are <strong>2 dependent params</strong>. </em> 
                            You can choose 1 or both. In case both, <strong>After should smaller than Before or address would be useless</strong>. 
                             
                          </AlertDescription>
                        </Alert>

                        {/* Cảnh báo lỗi nhập liệu */}
                        {timelockEnabled && !anyParamOn && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Please set up timelock params or turn it off if you change your mind.
                            </AlertDescription>
                          </Alert>
                        )}
                        {timelockAfter && !afterFilledOk && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Điền đủ <strong>After Date</strong> và <strong>After Time</strong>.
                            </AlertDescription>
                          </Alert>
                        )}
                        {timelockBefore && !beforeFilledOk && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Điền đủ <strong>Before Date</strong> và <strong>Before Time</strong>.
                            </AlertDescription>
                          </Alert>
                        )}
                        {bothOn && !rangeOk && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Mốc <strong>After</strong> phải <strong>nhỏ hơn</strong> mốc <strong>Before</strong>.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Full Mode Visual Feature */}
          {mode === 'full' && step === 1 && (
            <Card className="border-2 border-orange-200/50 dark:border-orange-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Visual Multisig Editor
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Design and edit your multisig structure interactively
                </p>
              </CardHeader>
              <CardContent className="h-[600px] border-2 border-red-500">
                <div className="w-full h-full border-2 border-blue-500">
                  <MultisigEditor />
                </div>
              </CardContent>

            </Card>
          )}

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
                  {stepNumber === 1 ? 'Configuration' : 'Review & Create'}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Basic Configuration */}
              <Card className="border-2 border-blue-200/50 dark:border-blue-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Multi-Sig Configuration
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure the basic settings for your multi-signature address
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="multisig-name">Address Name</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A friendly name to identify this multi-sig address</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="multisig-name"
                        placeholder="e.g., DAO Treasury"
                        value={multisigData.name}
                        onChange={(e) => setMultisigData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="required-signatures">Required Signatures</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of signatures required to execute transactions</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Select 
                        value={multisigData.requiredSignatures}
                        onValueChange={(value: string) => setMultisigData(prev => ({ ...prev, requiredSignatures: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select required signatures" />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} signatures required
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose of this multi-sig address..."
                      value={multisigData.description}
                      onChange={(e) => setMultisigData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Security Recommendation */}
                  <Alert>
                    <Key className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Security Recommendation:</strong> For optimal security, ensure signers are geographically distributed and use hardware wallets when possible.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Signers Configuration */}
              <Card className="border-2 border-green-200/50 dark:border-green-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Authorized Signers
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add the addresses that will be authorized to sign transactions
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {signers.map((signer, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
                      <div className="space-y-2">
                        <Label>Signer Name</Label>
                        <Input
                          placeholder="e.g., John Doe"
                          value={signer.name}
                          onChange={(e) => updateSigner(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Wallet Address</Label>
                        <Input
                          placeholder="addr1..."
                          value={signer.address}
                          onChange={(e) => updateSigner(index, 'address', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <div className="flex gap-2">
                          <Select
                            value={signer.role}
                            onValueChange={(value: string) => updateSigner(index, 'role', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Founder">Founder</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Member">Member</SelectItem>
                              <SelectItem value="Advisor">Advisor</SelectItem>
                            </SelectContent>
                          </Select>
                          {signers.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSigner(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={addSigner} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Signer
                    </Button>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Valid signers:</div>
                      <div className="font-semibold">{validSigners.length} configured</div>
                    </div>
                  </div>

                  {validSigners.length < requiredSigs && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        You need at least {requiredSigs} signers to meet the signature requirement.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={
                    !multisigData.name || 
                    validSigners.length < requiredSigs ||
                    // Nếu bật timelock: yêu cầu hợp lệ theo từng tham số riêng
                    !timelockFormOk
                  }
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
                    <ShieldCheck className="h-5 w-5 text-orange-600" />
                    Review & Confirm
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Please review your multi-signature configuration before creating
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This action cannot be undone. The multi-signature address will be permanently created on the Cardano blockchain.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Configuration</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="font-medium">{multisigData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Required Signatures:</span>
                          <span className="font-medium">{multisigData.requiredSignatures} of {validSigners.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Signers:</span>
                          <span className="font-medium">{validSigners.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Mode:</span>
                          <Badge variant="outline" className={
                            mode === 'simple' 
                              ? 'text-blue-600 border-blue-600' 
                              : mode === 'advanced'
                              ? 'text-purple-600 border-purple-600'
                              : 'text-orange-600 border-orange-600'
                          }>
                            {mode === 'simple' ? 'Simple' : mode === 'advanced' ? 'Advanced' : 'Full'}
                          </Badge>
                        </div>

                        {(mode !== 'simple') && timelockEnabled && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">After (UTC):</span>
                              <span className="font-medium">
                                {timelockAfter ? `${afterDate || '-'} ${afterTime || ''}` : '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">After Slot (approx):</span>
                              <span className="font-medium">{timelockAfter ? (afterSlot ?? '-') : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Before (UTC):</span>
                              <span className="font-medium">
                                {timelockBefore ? `${beforeDate || '-'} ${beforeTime || ''}` : '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Before Slot (approx):</span>
                              <span className="font-medium">{timelockBefore ? (beforeSlot ?? '-') : '-'}</span>
                            </div>
                          </>
                        )}

                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Security Level:</span>
                          <Badge variant="outline" className={
                            parseInt(multisigData.requiredSignatures) / validSigners.length > 0.6 
                              ? 'text-green-600 border-green-600' 
                              : 'text-orange-600 border-orange-600'
                          }>
                            {parseInt(multisigData.requiredSignatures) / validSigners.length > 0.6 ? 'High' : 'Medium'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Network & Costs</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Network:</span>
                          <span className="font-medium">Cardano Mainnet</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Address Type:</span>
                          <span className="font-medium">Multi-Signature</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Creation Fee:</span>
                          <span className="font-medium">~2.5 ADA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Authorized Signers</h3>
                    <div className="space-y-2">
                      {validSigners.map((signer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{signer.name}</div>
                            <div className="text-xs text-muted-foreground">{signer.role}</div>
                          </div>
                          <div className="text-right">
                            <code className="text-xs">{signer.address.slice(0, 12)}...{signer.address.slice(-8)}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back to Configuration
                    </Button>
                    <Button 
                      onClick={handleCreate} 
                      disabled={isLoading}
                      className="flex-1 gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Creating Address...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          Create Multi-Sig
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


