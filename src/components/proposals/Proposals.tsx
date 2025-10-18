import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Upload, 
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';

interface ProposalsProps {
  onCreateProposal?: () => void;
  onViewProposal?: (proposalId: string) => void;
}

export function Proposals({ onCreateProposal, onViewProposal }: ProposalsProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    selectedDAO: '',
    title: '',
    category: '',
    description: '',
    votingType: '',
    attachments: [] as File[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating proposal with data:', formData);
    setShowCreateForm(false);
    // Handle proposal creation logic here
  };

  // Mock proposals data
  const proposals = [
    {
      id: '0xa1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
      title: "AI Innovation Fund Allocation",
      dao: "Apple Inc DAO",
      category: "Funding",
      status: "Active",
      votes: 2847,
      totalVoters: 3205,
      endDate: "2025-01-20",
      description: "Proposal to allocate $50M from treasury for artificial intelligence research and development initiatives."
    },
    {
      id: '0xb2c3d4e5f6789012345678901234567890123456789012345678901234567890a1',
      title: "Sustainable Manufacturing Initiative",
      dao: "Apple Inc DAO",
      category: "Operation",
      status: "Passed",
      votes: 3156,
      totalVoters: 3205,
      endDate: "2025-01-15",
      description: "Implement carbon-neutral manufacturing processes across all facilities by 2025."
    },
    {
      id: '0xc3d4e5f6789012345678901234567890123456789012345678901234567890a1b2',
      title: "Global 5G Infrastructure Development",
      dao: "Samsung DAO",
      category: "Technical",
      status: "Active",
      votes: 1947,
      totalVoters: 2456,
      endDate: "2025-01-25",
      description: "Proposal to invest in next-generation 5G infrastructure and semiconductor manufacturing."
    },
    {
      id: '0xd4e5f6789012345678901234567890123456789012345678901234567890a1b2c3',
      title: "Community Education Program",
      dao: "Cardano VietNam Community DAO",
      category: "Operation",
      status: "Active",
      votes: 567,
      totalVoters: 789,
      endDate: "2025-01-22",
      description: "Establish blockchain education centers across Vietnam to promote Cardano adoption."
    },
    {
      id: '0x008f190725018c3db0e6464bf31d44f09a4d7773fd1486dff0c52c27b8aba289',
      title: "Increase Treasury Allocation for Development",
      dao: "Cardano Innovation DAO",
      category: "Funding",
      status: "Active",
      votes: 847,
      totalVoters: 1205,
      endDate: "2025-01-17",
      description: "Proposal to allocate additional funds from treasury for smart contract development and auditing."
    },
    {
      id: '0x12345678901234567890123456789012345678901234567890123456789abcdef',
      title: "Update Governance Parameters",
      dao: "Cardano Innovation DAO", 
      category: "Governance",
      status: "Passed",
      votes: 1156,
      totalVoters: 1205,
      endDate: "2025-01-10",
      description: "Modify voting thresholds and proposal requirements to improve governance efficiency."
    },
    {
      id: '0x98765432109876543210987654321098765432109876543210987654321fedcba',
      title: "Community Event Sponsorship",
      dao: "SundaeSwap DAO",
      category: "Operation",
      status: "Failed",
      votes: 234,
      totalVoters: 856,
      endDate: "2025-01-05",
      description: "Sponsor upcoming Cardano community hackathon with treasury funds."
    }
  ];

  if (showCreateForm) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => setShowCreateForm(false)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Submit a Proposal</h2>
            <p className="text-muted-foreground">Create a new governance proposal for community voting</p>
          </div>
        </div>

        {/* Create Proposal Form */}
        <div className="max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>
                Proposals allow DAO members to vote on important decisions. Provide clear details 
                about what you're proposing and why it benefits the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* DAO Selection */}
                <div>
                  <Label htmlFor="dao-select">Select DAO</Label>
                  <Select value={formData.selectedDAO} onValueChange={(value) => handleInputChange('selectedDAO', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose from your DAOs or search public ones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple-inc">Apple Inc DAO</SelectItem>
                      <SelectItem value="samsung">Samsung DAO</SelectItem>
                      <SelectItem value="cardano-vietnam">Cardano VietNam Community DAO</SelectItem>
                      <SelectItem value="cardano-innovation">Cardano Innovation DAO</SelectItem>
                      <SelectItem value="sundaeswap">SundaeSwap DAO</SelectItem>
                      <SelectItem value="minswap">MinSwap Protocol</SelectItem>
                      <SelectItem value="catalyst">Catalyst Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Proposal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="proposal-title">Proposal Title</Label>
                    <Input
                      id="proposal-title"
                      placeholder="Enter a clear, descriptive title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select proposal category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funding">Funding</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="operation">Operation</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your proposal, including rationale, implementation details, and expected outcomes..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1 min-h-[150px]"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Rich text editing and markdown support available
                    </div>
                  </div>

                  {/* File Attachments */}
                  <div>
                    <Label htmlFor="attachments">Attach Files (Optional)</Label>
                    <div className="mt-1">
                      <div className="relative border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload supporting documents
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF, DOC, XLS, images up to 10MB each
                        </div>
                        <input
                          id="attachments"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      {formData.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {formData.attachments.map((file, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                              📎 {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="voting-type">Voting Type</Label>
                    <Select value={formData.votingType} onValueChange={(value) => handleInputChange('votingType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select voting mechanism" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-choice">Single Choice (Yes/No)</SelectItem>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="quadratic">Quadratic Voting</SelectItem>
                        <SelectItem value="ranking">Ranking/Preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                  <Button type="submit" size="lg">
                    Submit Proposal
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Proposals</h2>
          <p className="text-muted-foreground">Manage and vote on governance proposals</p>
        </div>
        <Button onClick={onCreateProposal || (() => setShowCreateForm(true))} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search proposals..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button onClick={onCreateProposal || (() => setShowCreateForm(true))} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      {/* Proposals Grid */}
      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="border-2 hover:bg-card/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted border border-border rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{proposal.dao}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {proposal.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={
                    proposal.status === 'Active' ? 'default' :
                    proposal.status === 'Passed' ? 'secondary' : 'destructive'
                  }
                  className="gap-1"
                >
                  {proposal.status === 'Active' && <Clock className="h-3 w-3" />}
                  {proposal.status === 'Passed' && <CheckCircle className="h-3 w-3" />}
                  {proposal.status === 'Failed' && <XCircle className="h-3 w-3" />}
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {proposal.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{proposal.votes}/{proposal.totalVoters} votes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Ends {proposal.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>{Math.round((proposal.votes / proposal.totalVoters) * 100)}% participation</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewProposal && onViewProposal(proposal.id)}
                    >
                      View Details
                    </Button>
                    {proposal.status === 'Active' && (
                      <Button size="sm">
                        Vote
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no proposals) */}
      {proposals.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-muted border border-border rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No proposals yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Be the first to create a proposal for this DAO
            </p>
            <Button onClick={onCreateProposal || (() => setShowCreateForm(true))} className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Proposal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
