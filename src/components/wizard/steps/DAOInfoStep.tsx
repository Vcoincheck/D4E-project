import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { HelpCircle, Upload, X } from 'lucide-react';
import { Button } from '../../ui/button';

interface DAOInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function DAOInfoStep({ data, onUpdate }: DAOInfoStepProps) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    symbol: data.symbol || '',
    description: data.description || '',
    category: data.category || '',
    website: data.website || '',
    twitter: data.twitter || '',
    discord: data.discord || '',
    tags: data.tags || [],
    logo: data.logo || null,
    ...data
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'DeFi - Decentralized Finance',
    'NFT & Gaming',
    'Infrastructure',
    'Investment & Funding',
    'Community & Social',
    'Research & Development',
    'Education',
    'Environmental',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const updatedTags = [...formData.tags, newTag.trim()];
      handleInputChange('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags.filter((tag: string) => tag !== tagToRemove);
    handleInputChange('tags', updatedTags);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide the essential details about your DAO that will be visible to the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dao-name">DAO Name</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose a memorable name that represents your DAO's mission</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="dao-name"
                  placeholder="e.g., Innovation Hub DAO"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dao-symbol">Token Symbol</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>3-5 character symbol for your governance token</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="dao-symbol"
                  placeholder="e.g., IHUB"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="description">Description</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Describe your DAO's purpose, goals, and what makes it unique</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                id="description"
                placeholder="Describe your DAO's mission, goals, and what value it brings to the community..."
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/500 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category for your DAO" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visual Identity</CardTitle>
            <CardDescription>
              Upload a logo and set visual elements for your DAO.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, SVG up to 2MB. Recommended: 512x512px
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Choose File
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Connect your DAO's social presence and website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourdao.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="@yourdao"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord">Discord</Label>
                <Input
                  id="discord"
                  placeholder="discord.gg/yourdao"
                  value={formData.discord}
                  onChange={(e) => handleInputChange('discord', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>
              Add tags to help people discover your DAO.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} variant="outline">
                Add
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>Suggested tags: governance, innovation, community, defi, nft, development</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
