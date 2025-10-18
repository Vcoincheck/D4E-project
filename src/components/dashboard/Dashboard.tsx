import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TrendingUp, TrendingDown, Users, Vote, Clock, CheckCircle2, XCircle, AlertCircle, Building2, Activity, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Import DAO logos
import vietCardanoLogo from '../assets/f9fb9d7e6a371661d7790f3c05ed29936615536c.png';
import vtechcomLogo from '../assets/19e3ee003cfb6111a0a470c6e8c25bdf3d23526d.png';
import minswapLogo from '../assets/b35d195e88328064b81dc903951535013af0e3b1.png';

// Dummy data for treasury chart
const treasuryData = [
  { month: 'Jan', value: 2650000, color: '#8b5cf6' },
  { month: 'Feb', value: 2720000, color: '#06b6d4' },
  { month: 'Mar', value: 2680000, color: '#10b981' },
  { month: 'Apr', value: 2750000, color: '#f59e0b' },
  { month: 'May', value: 2820000, color: '#ef4444' },
  { month: 'Jun', value: 2847392, color: '#3b82f6' },
];

// Dummy data for proposal distribution
const proposalData = [
  { name: 'Active', value: 12, color: '#3b82f6' },
  { name: 'Passed', value: 28, color: '#10b981' },
  { name: 'Failed', value: 8, color: '#ef4444' },
  { name: 'Pending', value: 5, color: '#f59e0b' },
];

// Dummy data for recent proposals
const recentProposals = [
  {
    id: 1,
    title: 'Increase Developer Fund Allocation',
    status: 'active',
    votes: 1247,
    quorum: 2000,
    timeLeft: '3 days',
    support: 78,
  },
  {
    id: 2,
    title: 'New Marketing Strategy Implementation',
    status: 'passed',
    votes: 2341,
    quorum: 2000,
    timeLeft: 'Ended',
    support: 85,
  },
  {
    id: 3,
    title: 'Protocol Upgrade v2.1',
    status: 'active',
    votes: 892,
    quorum: 2000,
    timeLeft: '5 days',
    support: 62,
  },
];

// Most active DAOs data
const mostActiveDAOs = [
  {
    id: 1,
    name: 'VietCardanoCommunity',
    logo: vietCardanoLogo,
    logoType: 'image' as const,
    members: 8920,
    proposals: 24,
    activeProposals: 6,
    participation: 89,
    category: 'Community',
    verified: true,
    logoColor: 'from-red-500 to-yellow-500',
  },
  {
    id: 2,
    name: 'Apple Inc',
    logo: '🍎',
    logoType: 'text' as const,
    members: 15680,
    proposals: 32,
    activeProposals: 8,
    participation: 94,
    category: 'Enterprise',
    verified: true,
    logoColor: 'from-gray-400 to-gray-600',
  },
  {
    id: 3,
    name: 'Vtechcom Labs',
    logo: vtechcomLogo,
    logoType: 'image' as const,
    members: 3450,
    proposals: 18,
    activeProposals: 4,
    participation: 76,
    category: 'Technology',
    verified: false,
    logoColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 4,
    name: 'Minswap DAO',
    logo: minswapLogo,
    logoType: 'image' as const,
    members: 15420,
    proposals: 28,
    activeProposals: 7,
    participation: 91,
    category: 'DeFi',
    verified: true,
    logoColor: 'from-purple-500 to-pink-500',
  },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -2.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Participation</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +3.7%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Treasury Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Treasury Value Over Time</CardTitle>
            <CardDescription>ADA treasury balance for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treasuryData}>
                <defs>
                  {treasuryData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis 
                  className="text-muted-foreground"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₳${(value / 1000000).toFixed(2)}M`, 'Treasury Value']}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]}
                  fill={(entry: any, index: number) => `url(#gradient-${index})`}
                >
                  {treasuryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Proposal Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
            <CardDescription>Distribution of all proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={proposalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {proposalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {proposalData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Proposals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
          <CardDescription>Latest governance proposals and their voting status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProposals.map((proposal) => (
              <div key={proposal.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{proposal.title}</h3>
                    <Badge variant={
                      proposal.status === 'active' ? 'default' :
                      proposal.status === 'passed' ? 'secondary' : 'destructive'
                    }>
                      {proposal.status === 'active' && <Clock className="h-3 w-3 mr-1" />}
                      {proposal.status === 'passed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {proposal.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
                      {proposal.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{proposal.votes.toLocaleString()} votes</span>
                    <span>Quorum: {proposal.quorum.toLocaleString()}</span>
                    <span>{proposal.timeLeft}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">Support: {proposal.support}%</span>
                    </div>
                    <Progress value={proposal.support} className="h-2" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {Math.round((proposal.votes / proposal.quorum) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Quorum</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Active DAOs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Most Active DAOs
              </CardTitle>
              <CardDescription>Leading decentralized organizations by engagement and participation</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              4 Featured DAOs
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mostActiveDAOs.map((dao) => (
              <div key={dao.id} className="relative group">
                <div className="p-4 border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-200 bg-card/50 backdrop-blur-sm">
                  {/* DAO Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${dao.logoColor} rounded-lg flex items-center justify-center text-white font-medium shadow-sm overflow-hidden`}>
                        {dao.logoType === 'image' ? (
                          <img src={dao.logo} alt={dao.name} className="w-10 h-10 object-contain" />
                        ) : (
                          dao.logo
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{dao.name}</h3>
                          {dao.verified && (
                            <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {dao.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* DAO Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Members
                      </span>
                      <span className="font-medium">{dao.members.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Vote className="h-3 w-3" />
                        Total Proposals
                      </span>
                      <span className="font-medium">{dao.proposals}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Active
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {dao.activeProposals} proposals
                      </Badge>
                    </div>

                    {/* Participation Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Participation</span>
                        <span className="font-medium">{dao.participation}%</span>
                      </div>
                      <Progress 
                        value={dao.participation} 
                        className={`h-1.5 ${
                          dao.participation >= 90 ? 'bg-green-100' :
                          dao.participation >= 80 ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Stats Summary */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-primary">
                  {mostActiveDAOs.reduce((sum, dao) => sum + dao.members, 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Members</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">
                  {mostActiveDAOs.reduce((sum, dao) => sum + dao.proposals, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Proposals</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-600">
                  {mostActiveDAOs.reduce((sum, dao) => sum + dao.activeProposals, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Active Now</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-600">
                  {Math.round(mostActiveDAOs.reduce((sum, dao) => sum + dao.participation, 0) / mostActiveDAOs.length)}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Participation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voter Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Voters This Month</CardTitle>
            <CardDescription>Most active community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Alex Chen', votes: 28, stake: '2.3M ADA' },
                { name: 'Sarah Wilson', votes: 24, stake: '1.8M ADA' },
                { name: 'Mike Torres', votes: 21, stake: '1.5M ADA' },
                { name: 'Emma Davis', votes: 19, stake: '1.2M ADA' },
                { name: 'John Smith', votes: 17, stake: '980K ADA' },
              ].map((voter, index) => (
                <div key={voter.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                      {voter.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{voter.name}</div>
                      <div className="text-sm text-muted-foreground">{voter.stake}</div>
                    </div>
                  </div>
                  <Badge variant="outline">{voter.votes} votes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quorum Status</CardTitle>
            <CardDescription>Current voting participation rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Participation</span>
                  <span className="text-sm font-medium">58.3%</span>
                </div>
                <Progress value={58.3} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Active Proposals Quorum</span>
                  <span className="text-sm font-medium">72.1%</span>
                </div>
                <Progress value={72.1} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Minimum Required</span>
                  <span className="text-sm font-medium">51.0%</span>
                </div>
                <Progress value={51} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>All active proposals meet quorum requirements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

