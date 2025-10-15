import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Upload, ArrowLeft, Twitter, MessageCircle, Globe } from 'lucide-react';

interface CreateDAOProps {
  onBack?: () => void;
}

export function CreateDAO({ onBack }: CreateDAOProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    governanceModel: '',
    treasuryAddress: '',
    tokenPolicy: '',
    logo: null as File | null,
    discord: '',
    twitter: '',
    website: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating DAO with data:', formData);
    // Handle DAO creation logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold">Create Your DAO</h1>
            <p className="text-sm text-muted-foreground">Launch a new decentralized autonomous organization</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>DAO Information</CardTitle>
                <CardDescription>
                  A DAO (Decentralized Autonomous Organization) enables transparent, community-driven governance. 
                  Set up your organization's structure, treasury management, and governance model to begin 
                  coordinating with your community on-chain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dao-name">DAO Name</Label>
                      <Input
                        id="dao-name"
                        placeholder="Enter your DAO name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your DAO's mission and purpose"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="governance-model">Choose Governance Model</Label>
                      <Select value={formData.governanceModel} onValueChange={(value) => handleInputChange('governanceModel', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select governance model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="snapshot">Snapshot-style</SelectItem>
                          <SelectItem value="onchain">On-chain Voting</SelectItem>
                          <SelectItem value="multisig">Multi-sig</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="treasury-address">Treasury Address</Label>
                      <Input
                        id="treasury-address"
                        placeholder="addr1..."
                        value={formData.treasuryAddress}
                        onChange={(e) => handleInputChange('treasuryAddress', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="token-policy">Your Token Policy</Label>
                      <Input
                        id="token-policy"
                        placeholder="Token Policy ID or Name"
                        value={formData.tokenPolicy}
                        onChange={(e) => handleInputChange('tokenPolicy', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <Label htmlFor="logo-upload">Upload DAO Logo</Label>
                      <div className="mt-1">
                        <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="w-16 h-16 bg-muted border border-border rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {formData.logo ? formData.logo.name : 'Click to upload or drag and drop'}
                          </div>
                          <div className="text-xs text-muted-foreground">PNG, JPG, SVG up to 5MB</div>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Optional Socials */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-3">Add Socials (Optional)</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="discord">Discord</Label>
                            <Input
                              id="discord"
                              placeholder="https://discord.gg/..."
                              value={formData.discord}
                              onChange={(e) => handleInputChange('discord', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center">
                            <Twitter className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                              id="twitter"
                              placeholder="https://twitter.com/..."
                              value={formData.twitter}
                              onChange={(e) => handleInputChange('twitter', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              placeholder="https://..."
                              value={formData.website}
                              onChange={(e) => handleInputChange('website', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      Launch DAO
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview/Info */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>DAO Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-muted border border-border rounded-lg flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 bg-foreground/20 rounded"></div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{formData.name || 'DAO Name'}</div>
                    <div className="text-sm text-muted-foreground">
                      {formData.governanceModel || 'Governance Model'}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Members</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proposals</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Treasury</span>
                    <span>₳ 0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                    1
                  </div>
                  <div>Your DAO will be deployed to the Cardano blockchain</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                    2
                  </div>
                  <div>You'll receive your governance tokens</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                    3
                  </div>
                  <div>Start inviting members and creating proposals</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
