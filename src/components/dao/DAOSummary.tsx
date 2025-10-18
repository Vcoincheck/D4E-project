import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Vote,
  FileText,
  Wallet,
  Globe,
  Plus,
  Activity,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DAOSummaryProps {
  daoName: string;
  onBackToProposals: () => void;
  onViewProposal?: (proposalId: string) => void;
  onCreateProposal?: () => void;
}

export function DAOSummary({ daoName, onBackToProposals, onViewProposal, onCreateProposal }: DAOSummaryProps) {
  const [activeTab, setActiveTab] = useState('proposals');

  // Mock DAO data based on the selected DAO
  const getDAOData = (name: string) => {
    const daoData = {
      'Apple Inc DAO': {
        logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=64&h=64&fit=crop&crop=face',
        description: 'Decentralized governance for Apple Inc innovation and strategic decisions',
        totalMembers: 3205,
        totalProposals: 28,
        treasuryValue: '₳2,847,392',
        foundedDate: '2024-03-15',
        category: 'Enterprise',
        proposals: [
          {
            id: '0xa1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
            title: "AI Innovation Fund Allocation",
            category: "Funding",
            status: "Active",
            votes: 2847,
            totalVoters: 3205,
            endDate: "2025-01-20",
            description: "Proposal to allocate $50M from treasury for artificial intelligence research and development initiatives.",
            support: 89
          },
          {
            id: '0xb2c3d4e5f6789012345678901234567890123456789012345678901234567890a1',
            title: "Sustainable Manufacturing Initiative",
            category: "Operation",
            status: "Passed",
            votes: 3156,
            totalVoters: 3205,
            endDate: "2025-01-15",
            description: "Implement carbon-neutral manufacturing processes across all facilities by 2025.",
            support: 98
          },
          {
            id: '0xe5f6789012345678901234567890123456789012345678901234567890a1b2c3d4',
            title: "Developer Ecosystem Growth Program",
            category: "Technical",
            status: "Active",
            votes: 2156,
            totalVoters: 3205,
            endDate: "2025-01-18",
            description: "Establish $25M fund to support third-party developers building on Apple platforms.",
            support: 67
          }
        ]
      },
      'Samsung DAO': {
        logo: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=64&h=64&fit=crop&crop=face',
        description: 'Global innovation governance for Samsung Electronics and semiconductor development',
        totalMembers: 2456,
        totalProposals: 22,
        treasuryValue: '₳1,947,234',
        foundedDate: '2024-04-20',
        category: 'Technology',
        proposals: [
          {
            id: '0xc3d4e5f6789012345678901234567890123456789012345678901234567890a1b2',
            title: "Global 5G Infrastructure Development",
            category: "Technical",
            status: "Active",
            votes: 1947,
            totalVoters: 2456,
            endDate: "2025-01-25",
            description: "Proposal to invest in next-generation 5G infrastructure and semiconductor manufacturing.",
            support: 79
          }
        ]
      },
      'Cardano VietNam Community DAO': {
        logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=64&h=64&fit=crop&crop=face',
        description: 'Community-driven governance for Cardano adoption and education in Vietnam',
        totalMembers: 789,
        totalProposals: 15,
        treasuryValue: '₳567,890',
        foundedDate: '2024-01-10',
        category: 'Community',
        proposals: [
          {
            id: '0xd4e5f6789012345678901234567890123456789012345678901234567890a1b2c3',
            title: "Community Education Program",
            category: "Operation",
            status: "Active",
            votes: 567,
            totalVoters: 789,
            endDate: "2025-01-22",
            description: "Establish blockchain education centers across Vietnam to promote Cardano adoption.",
            support: 72
          }
        ]
      }
    };

    return daoData[name as keyof typeof daoData] || daoData['Apple Inc DAO'];
  };

  const daoInfo = getDAOData(daoName);

  // Mock activity data
  const activityData = [
    { month: 'Aug', proposals: 4, votes: 2850 },
    { month: 'Sep', proposals: 6, votes: 3200 },
    { month: 'Oct', proposals: 5, votes: 2950 },
    { month: 'Nov', proposals: 7, votes: 3100 },
    { month: 'Dec', proposals: 4, votes: 2800 },
    { month: 'Jan', proposals: 6, votes: 3050 },
  ];

  const statusData = [
    { name: 'Active', value: 8, color: '#3b82f6' },
    { name: 'Passed', value: 15, color: '#10b981' },
    { name: 'Failed', value: 3, color: '#ef4444' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-blue-500 text-white">Active</Badge>;
      case 'Passed':
        return <Badge className="bg-green-500 text-white">Passed</Badge>;
      case 'Failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Passed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      {/* Sub Header */}
      <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToProposals} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Proposals
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={daoInfo.logo} alt={daoName} />
                <AvatarFallback>{daoName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{daoName}</h1>
                <p className="text-sm text-muted-foreground">{daoInfo.category} • {daoInfo.totalMembers.toLocaleString()} members</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button onClick={onCreateProposal} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Proposal
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* DAO Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  About {daoName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{daoInfo.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{daoInfo.totalMembers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{daoInfo.totalProposals}</div>
                    <div className="text-sm text-muted-foreground">Proposals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{daoInfo.treasuryValue}</div>
                    <div className="text-sm text-muted-foreground">Treasury</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{daoInfo.foundedDate}</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Proposals</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Participation</span>
                    <span className="font-medium">78.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-medium">83.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Proposal Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={40}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1 mt-2">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="mt-6">
            <div className="space-y-4">
              {daoInfo.proposals.map((proposal) => (
                <Card key={proposal.id} className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg hover:bg-card/95 transition-colors">
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
                          <span className="flex items-center gap-1">
                            <Vote className="h-4 w-4" />
                            {proposal.votes.toLocaleString()}/{proposal.totalVoters.toLocaleString()} votes
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Ends {proposal.endDate}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {proposal.category}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewProposal && onViewProposal(proposal.id)}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Support: {proposal.support}%</span>
                        <span>{Math.round((proposal.votes / proposal.totalVoters) * 100)}% participation</span>
                      </div>
                      <Progress value={proposal.support} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle>DAO Activity Timeline</CardTitle>
                <CardDescription>Proposal submissions and voting activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="proposals" fill="#3b82f6" name="Proposals" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="votes" fill="#10b981" name="Votes" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle>DAO Members</CardTitle>
                <CardDescription>Active participants in {daoName} governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Tim Cook', role: 'Co-Founder', stake: '125,000 AAPL', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face' },
                    { name: 'Craig Federighi', role: 'Core Developer', stake: '95,000 AAPL', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face' },
                    { name: 'Susan Kare', role: 'Design Lead', stake: '78,000 AAPL', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8e5?w=64&h=64&fit=crop&crop=face' },
                    { name: 'Johny Srouji', role: 'Engineering', stake: '62,000 AAPL', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face' },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{member.stake}</div>
                        <div className="text-sm text-muted-foreground">Voting Power</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
