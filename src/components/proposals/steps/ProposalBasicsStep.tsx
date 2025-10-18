import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Building, Users, TrendingUp } from 'lucide-react';

interface ProposalBasicsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ProposalBasicsStep({ data, onUpdate }: ProposalBasicsStepProps) {
  const [formData, setFormData] = useState({
    selectedDAO: data.selectedDAO || '',
    title: data.title || '',
    category: data.category || '',
  });

  // Use a ref to track if the component has been initialized
  const isInitializedRef = useRef(false);

  // Mock DAOs for selection
  const availableDAOs = [
    {
      id: 'cardano-innovation',
      name: 'Cardano Innovation DAO',
      members: 1205,
      treasury: '₳ 847,500',
      governance: 'Token-weighted',
      description: 'Advancing Cardano ecosystem development through community governance'
    },
    {
      id: 'sundaeswap',
      name: 'SundaeSwap DAO',
      members: 856,
      treasury: '₳ 425,000',
      governance: 'NFT-based',
      description: 'Decentralized exchange protocol governance'
    },
    {
      id: 'minswap',
      name: 'MinSwap Protocol',
      members: 642,
      treasury: '₳ 320,750',
      governance: 'Hybrid',
      description: 'Multi-pool DEX governance and development'
    },
    {
      id: 'catalyst',
      name: 'Catalyst Community',
      members: 2150,
      treasury: '₳ 1,250,000',
      governance: 'Voting power',
      description: 'Cardano community funding and innovation hub'
    }
  ];

  const categories = [
    { value: 'funding', label: 'Funding Request', description: 'Request treasury funds for projects' },
    { value: 'governance', label: 'Governance Change', description: 'Modify DAO rules or parameters' },
    { value: 'operation', label: 'Operational Decision', description: 'Day-to-day operational choices' },
    { value: 'technical', label: 'Technical Upgrade', description: 'Protocol or technical improvements' },
    { value: 'partnership', label: 'Partnership', description: 'External partnerships and collaborations' },
    { value: 'treasury', label: 'Treasury Management', description: 'Treasury allocation and management' },
    { value: 'community', label: 'Community Initiative', description: 'Community building and engagement' },
    { value: 'other', label: 'Other', description: 'Other proposal types' }
  ];

  // Update form data when props.data changes (but not on first render)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }
    
    setFormData({
      selectedDAO: data.selectedDAO || '',
      title: data.title || '',
      category: data.category || '',
    });
  }, [data]);

  // Call onUpdate only when formData changes (not on initialization)
  useEffect(() => {
    if (!isInitializedRef.current) {
      return;
    }
    
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedDAO = availableDAOs.find(dao => dao.id === formData.selectedDAO);
  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="space-y-6">
      {/* DAO Selection */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Select Target DAO
          </CardTitle>
          <CardDescription>
            Choose which DAO you want to submit your proposal to. You can only submit to DAOs where you're a member.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dao-select">DAO Selection</Label>
            <Select value={formData.selectedDAO} onValueChange={(value) => handleInputChange('selectedDAO', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a DAO for your proposal" />
              </SelectTrigger>
              <SelectContent>
                {availableDAOs.map((dao) => (
                  <SelectItem key={dao.id} value={dao.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{dao.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {dao.members} members
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected DAO Preview */}
          {selectedDAO && (
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{selectedDAO.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDAO.description}</p>
                </div>
                <Badge variant="secondary">{selectedDAO.governance}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{selectedDAO.members}</div>
                    <div className="text-muted-foreground text-xs">Members</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{selectedDAO.treasury}</div>
                    <div className="text-muted-foreground text-xs">Treasury</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{selectedDAO.governance}</div>
                    <div className="text-muted-foreground text-xs">Governance</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Proposal Title */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Proposal Title</CardTitle>
          <CardDescription>
            Choose a clear, descriptive title that summarizes your proposal's main objective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="proposal-title">Title</Label>
            <Input
              id="proposal-title"
              placeholder="e.g. Increase Development Fund Allocation for Q2 2024"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="mt-1"
              maxLength={100}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {formData.title.length}/100 characters
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Proposal Category</CardTitle>
          <CardDescription>
            Select the category that best describes your proposal type. This helps members find and filter proposals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select proposal category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div>
                      <div className="font-medium">{category.label}</div>
                      <div className="text-xs text-muted-foreground">{category.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Category Preview */}
          {selectedCategory && (
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedCategory.label}</Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedCategory.description}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Next:</strong> Add detailed description and implementation plan for your proposal
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
