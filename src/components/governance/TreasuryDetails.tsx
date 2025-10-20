import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Calendar,
  TrendingUp,
  ExternalLink,
  Copy,
  Share2,
  Settings,
  ChevronRight,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Vote,
  Wallet,
  Shield
} from 'lucide-react';
import exampleImage from '../../assets/misc/1.png';

interface TreasuryDetailsProps {
  onBack: () => void;
  treasuryAddress?: string;
}

export function TreasuryDetails({ onBack, treasuryAddress }: TreasuryDetailsProps) {
  const [activeTab, setActiveTab] = useState('proposals');

  const mockDAO = {
    name: 'Cardano Innovation DAO',
    description: 'A decentralized autonomous organization focused on funding and supporting innovative projects within the Cardano ecosystem.',
    avatar: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=64&h=64&fit=crop&crop=center',
    members: 1205,
    proposals: 47,
    treasury: '₳2,847,532',
    treasuryUSD: '$2,847,532',
    founded: '2023-01-15',
    network: 'Cardano',
    website: 'https://cardano-innovation-dao.io',
    governance: {
      votingPeriod: '7 days',
      quorum: '5%',
      proposalThreshold: '10,000 CDAO',
      executionDelay: '48 hours'
    }
  };

  const mockProposals = [
    {
      id: 1,
      title: 'Increase Treasury Allocation for Development',
      description: 'Proposal to allocate additional funds from treasury for smart contract development and auditing.',
      category: 'Funding',
      author: 'Cardano Innovation DAO',
      status: 'active',
      votes: { for: 847, against: 358, total: 1205 },
      participation: 70,
      endDate: '2024-02-15',
      daysLeft: 3
    },
    {
      id: 2,
      title: 'Update Governance Parameters',
      description: 'Modify voting thresholds and proposal requirements to improve governance efficiency.',
      category: 'Governance',
      author: 'Cardano Innovation DAO',
      status: 'passed',
      votes: { for: 1156, against: 49, total: 1205 },
      participation: 96,
      endDate: '2024-02-10',
      daysLeft: 0
    },
    {
      id: 3,
      title: 'Community Event Sponsorship',
      description: 'Sponsor upcoming Cardano community hackathon with treasury funds.',
      category: 'Operation',
      author: 'SundaeSwap DAO',
      status: 'failed',
      votes: { for: 234, against: 622, total: 856 },
      participation: 27,
      endDate: '2024-02-05',
      daysLeft: 0
    },
    {
      id: 4,
      title: 'Partnership with DeFi Protocol',
      description: 'Establish strategic partnership to expand DAO capabilities in DeFi space.',
      category: 'Partnership',
      author: 'Cardano Innovation DAO',
      status: 'active',
      votes: { for: 445, against: 267, total: 1205 },
      participation: 59,
      endDate: '2024-02-18',
      daysLeft: 6
    },
    {
      id: 5,
      title: 'Research Grant Program Launch',
      description: 'Launch quarterly research grant program for academic institutions studying blockchain technology.',
      category: 'Research',
      author: 'Cardano Innovation DAO',
      status: 'draft',
      votes: { for: 0, against: 0, total: 1205 },
      participation: 0,
      endDate: '2024-02-25',
      daysLeft: 13
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-500 text-white">Active</Badge>;
      case 'passed':
        return <Badge className="bg-green-500 text-white">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'draft':
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const calculateVotePercentage = (votes: { for: number; against: number; total: number }) => {
    const totalVotes = votes.for + votes.against;
    if (totalVotes === 0) return { forPercent: 0, againstPercent: 0 };
    return {
      forPercent: Math.round((votes.for / totalVotes) * 100),
      againstPercent: Math.round((votes.against / totalVotes) * 100)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      {/* Header */}
      <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockDAO.avatar} alt={mockDAO.name} />
              <AvatarFallback>CI</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{mockDAO.name}</h1>
              <p className="text-sm text-muted-foreground">{mockDAO.network} • {treasuryAddress || 'addr1qxy2...9k4l'}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* DAO Description */}
            <Card className="bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mockDAO.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Founded {new Date(mockDAO.founded).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <a href={mockDAO.website} className="hover:text-foreground transition-colors">
                      Website
                    </a>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Proposals Section */}
            <Card className="bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="proposals">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="passed">Passed</TabsTrigger>
                    <TabsTrigger value="failed">Failed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="proposals" className="space-y-4 mt-6">
                    {mockProposals.map((proposal) => {
                      const voteStats = calculateVotePercentage(proposal.votes);
                      return (
                        <Card key={proposal.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {getStatusIcon(proposal.status)}
                                  <h3 className="font-semibold text-lg">{proposal.title}</h3>
                                  {getStatusBadge(proposal.status)}
                                </div>
                                <p className="text-muted-foreground text-sm mb-3">{proposal.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{proposal.author}</span>
                                  <span>•</span>
                                  <Badge variant="outline">{proposal.category}</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  <span className="font-medium">{proposal.votes.for + proposal.votes.against}</span>
                                  <span className="text-muted-foreground">/{proposal.votes.total} votes</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {proposal.status === 'active' 
                                    ? `Ends ${proposal.endDate}` 
                                    : `Ended ${proposal.endDate}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{proposal.participation}% participation</span>
                              </div>
                            </div>

                            {/* Voting Progress */}
                            {proposal.status === 'active' || proposal.status === 'passed' || proposal.status === 'failed' ? (
                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">For: {voteStats.forPercent}%</span>
                                  <span className="text-red-600">Against: {voteStats.againstPercent}%</span>
                                </div>
                                <div className="flex gap-1">
                                  <div 
                                    className="h-2 bg-green-500 rounded-l-full"
                                    style={{ width: `${voteStats.forPercent}%` }}
                                  />
                                  <div 
                                    className="h-2 bg-red-500 rounded-r-full"
                                    style={{ width: `${voteStats.againstPercent}%` }}
                                  />
                                  {voteStats.forPercent + voteStats.againstPercent < 100 && (
                                    <div 
                                      className="h-2 bg-gray-200 dark:bg-gray-700 rounded-r-full"
                                      style={{ width: `${100 - voteStats.forPercent - voteStats.againstPercent}%` }}
                                    />
                                  )}
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{proposal.votes.for.toLocaleString()} For</span>
                                  <span>{proposal.votes.against.toLocaleString()} Against</span>
                                </div>
                              </div>
                            ) : null}

                            <div className="flex justify-between items-center">
                              {proposal.daysLeft > 0 && proposal.status === 'active' && (
                                <span className="text-sm text-orange-600 font-medium">
                                  {proposal.daysLeft} day{proposal.daysLeft !== 1 ? 's' : ''} left
                                </span>
                              )}
                              <div className="flex gap-2 ml-auto">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                                {proposal.status === 'active' && (
                                  <Button size="sm">
                                    Vote
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </TabsContent>

                  <TabsContent value="active" className="space-y-4 mt-6">
                    {mockProposals
                      .filter(p => p.status === 'active')
                      .map((proposal) => {
                        const voteStats = calculateVotePercentage(proposal.votes);
                        return (
                          <Card key={proposal.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {getStatusIcon(proposal.status)}
                                    <h3 className="font-semibold text-lg">{proposal.title}</h3>
                                    {getStatusBadge(proposal.status)}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-3">{proposal.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{proposal.author}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{proposal.category}</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    <span className="font-medium">{proposal.votes.for + proposal.votes.against}</span>
                                    <span className="text-muted-foreground">/{proposal.votes.total} votes</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Ends {proposal.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{proposal.participation}% participation</span>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">For: {voteStats.forPercent}%</span>
                                  <span className="text-red-600">Against: {voteStats.againstPercent}%</span>
                                </div>
                                <div className="flex gap-1">
                                  <div 
                                    className="h-2 bg-green-500 rounded-l-full"
                                    style={{ width: `${voteStats.forPercent}%` }}
                                  />
                                  <div 
                                    className="h-2 bg-red-500 rounded-r-full"
                                    style={{ width: `${voteStats.againstPercent}%` }}
                                  />
                                  {voteStats.forPercent + voteStats.againstPercent < 100 && (
                                    <div 
                                      className="h-2 bg-gray-200 dark:bg-gray-700 rounded-r-full"
                                      style={{ width: `${100 - voteStats.forPercent - voteStats.againstPercent}%` }}
                                    />
                                  )}
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{proposal.votes.for.toLocaleString()} For</span>
                                  <span>{proposal.votes.against.toLocaleString()} Against</span>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-orange-600 font-medium">
                                  {proposal.daysLeft} day{proposal.daysLeft !== 1 ? 's' : ''} left
                                </span>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                  <Button size="sm">
                                    Vote
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </TabsContent>

                  <TabsContent value="passed" className="space-y-4 mt-6">
                    {mockProposals
                      .filter(p => p.status === 'passed')
                      .map((proposal) => {
                        const voteStats = calculateVotePercentage(proposal.votes);
                        return (
                          <Card key={proposal.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {getStatusIcon(proposal.status)}
                                    <h3 className="font-semibold text-lg">{proposal.title}</h3>
                                    {getStatusBadge(proposal.status)}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-3">{proposal.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{proposal.author}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{proposal.category}</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    <span className="font-medium">{proposal.votes.for + proposal.votes.against}</span>
                                    <span className="text-muted-foreground">/{proposal.votes.total} votes</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Ended {proposal.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{proposal.participation}% participation</span>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">For: {voteStats.forPercent}%</span>
                                  <span className="text-red-600">Against: {voteStats.againstPercent}%</span>
                                </div>
                                <div className="flex gap-1">
                                  <div 
                                    className="h-2 bg-green-500 rounded-l-full"
                                    style={{ width: `${voteStats.forPercent}%` }}
                                  />
                                  <div 
                                    className="h-2 bg-red-500 rounded-r-full"
                                    style={{ width: `${voteStats.againstPercent}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{proposal.votes.for.toLocaleString()} For</span>
                                  <span>{proposal.votes.against.toLocaleString()} Against</span>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </TabsContent>

                  <TabsContent value="failed" className="space-y-4 mt-6">
                    {mockProposals
                      .filter(p => p.status === 'failed')
                      .map((proposal) => {
                        const voteStats = calculateVotePercentage(proposal.votes);
                        return (
                          <Card key={proposal.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-red-500">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {getStatusIcon(proposal.status)}
                                    <h3 className="font-semibold text-lg">{proposal.title}</h3>
                                    {getStatusBadge(proposal.status)}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-3">{proposal.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{proposal.author}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{proposal.category}</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    <span className="font-medium">{proposal.votes.for + proposal.votes.against}</span>
                                    <span className="text-muted-foreground">/{proposal.votes.total} votes</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Ended {proposal.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{proposal.participation}% participation</span>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">For: {voteStats.forPercent}%</span>
                                  <span className="text-red-600">Against: {voteStats.againstPercent}%</span>
                                </div>
                                <div className="flex gap-1">
                                  <div 
                                    className="h-2 bg-green-500 rounded-l-full"
                                    style={{ width: `${voteStats.forPercent}%` }}
                                  />
                                  <div 
                                    className="h-2 bg-red-500 rounded-r-full"
                                    style={{ width: `${voteStats.againstPercent}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{proposal.votes.for.toLocaleString()} For</span>
                                  <span>{proposal.votes.against.toLocaleString()} Against</span>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* DAO Stats */}
            <Card className="bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>DAO Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-semibold">{mockDAO.members.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Proposals</span>
                  <span className="font-semibold">{mockDAO.proposals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Treasury</span>
                  <span className="font-semibold">{mockDAO.treasury}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  ~{mockDAO.treasuryUSD} USD
                </div>
              </CardContent>
            </Card>

            {/* Treasury Information */}
            <Card className="bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Treasury Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Address</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded flex-1 break-all">
                      {treasuryAddress || 'addr1qxy2...9k4l'}
                    </code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Multi-Signature Protected</span>
                </div>
                <Button className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View on Explorer
                </Button>
              </CardContent>
            </Card>

            {/* Governance Parameters */}
            <Card className="bg-card/70 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Governance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Voting Period</span>
                  <span className="font-medium">{mockDAO.governance.votingPeriod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quorum</span>
                  <span className="font-medium">{mockDAO.governance.quorum}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Proposal Threshold</span>
                  <span className="font-medium">{mockDAO.governance.proposalThreshold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Execution Delay</span>
                  <span className="font-medium">{mockDAO.governance.executionDelay}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}



