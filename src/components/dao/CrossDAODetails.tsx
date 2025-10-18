import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  ExternalLink, 
  Users, 
  Trophy, 
  TrendingUp, 
  Globe,
  Twitter,
  MessageCircle,
  Star,
  Building2,
  Wallet,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Vote,
  Activity,
  Calendar,
  Target,
  Heart,
  Code,
  Gamepad2,
  ChartBar,
  DollarSign,
  Zap,
  Award,
  Shield,
  Network,
  BookOpen,
  LineChart,
  PieChart
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell 
} from 'recharts';

interface CrossDAODetailsProps {
  daoId: string;
  onBack: () => void;
}

// Extended DAO data with detailed information
const getDAODetails = (id: string) => {
  const allDAODetails: any = {
    'viet-cardano-community': {
      id: 'viet-cardano-community',
      name: 'VietCardanoCommunity',
      description: 'Vietnamese Cardano community focused on education, development, and promoting Cardano adoption in Vietnam and Southeast Asia through local initiatives and educational programs.',
      category: 'community',
      members: 8920,
      proposals: 6,
      treasury: '150K',
      activity: 'High',
      website: 'https://vietcardano.org',
      twitter: 'https://twitter.com/VietCardano',
      discord: 'https://discord.gg/vietcardano',
      telegram: 'https://t.me/vietcardano',
      status: 'active',
      logo: 'V',
      verified: true,
      tags: ['Education', 'Community', 'Vietnam', 'Adoption'],
      founded: '2021-08-20',
      governance: 'Community consensus',
      activityData: [
        { month: 'Jan', proposals: 45, members: 50 },
        { month: 'Feb', proposals: 52, members: 48 },
        { month: 'Mar', proposals: 48, members: 52 },
        { month: 'Apr', proposals: 60, members: 58 },
        { month: 'May', proposals: 55, members: 62 },
        { month: 'Jun', proposals: 68, members: 65 }
      ],
      proposalData: [
        { name: 'Approved', value: 75, color: '#22c55e' },
        { name: 'Pending', value: 15, color: '#f59e0b' },
        { name: 'Rejected', value: 8, color: '#ef4444' },
        { name: 'Draft', value: 2, color: '#6b7280' }
      ]
    },
    'vtechcom': {
      id: 'vtechcom',
      name: 'Vtechcom DAO',
      description: 'Vietnamese technology company building innovative solutions on Cardano blockchain for enterprise adoption and development with focus on local market needs and scalable solutions.',
      category: 'development',
      members: 3450,
      proposals: 9,
      treasury: '₳15K',
      activity: 'High',
      website: 'https://vtechcom.org/',
      twitter: 'https://x.com/tony_thanh_',
      telegram: 'https://t.me/vtechcom',
      status: 'active',
      logo: 'VT',
      verified: false,
      tags: ['Enterprise', 'Development', 'Technology', 'Vietnam'],
      founded: '2023-02-28',
      governance: 'Corporate governance',
      activityData: [
        { month: 'Jan', proposals: 25, members: 35 },
        { month: 'Feb', proposals: 30, members: 38 },
        { month: 'Mar', proposals: 35, members: 42 },
        { month: 'Apr', proposals: 40, members: 45 },
        { month: 'May', proposals: 38, members: 48 },
        { month: 'Jun', proposals: 45, members: 52 }
      ],
      proposalData: [
        { name: 'Approved', value: 65, color: '#22c55e' },
        { name: 'Pending', value: 25, color: '#f59e0b' },
        { name: 'Rejected', value: 8, color: '#ef4444' },
        { name: 'Draft', value: 2, color: '#6b7280' }
      ]
    },
    'minswap': {
      id: 'minswap',
      name: 'Minswap DAO',
      description: 'The first multi-pool decentralized exchange on Cardano, enabling users to trade, swap, and provide liquidity with innovative AMM mechanics and community-driven governance.',
      category: 'defi',
      members: 15420,
      proposals: 12,
      treasury: '₳156K',
      activity: 'High',
      website: 'https://minswap.org',
      twitter: 'https://twitter.com/MinswapDEX',
      discord: 'https://discord.gg/minswap',
      telegram: 'https://t.me/minswap',
      status: 'active',
      logo: 'M',
      verified: true,
      tags: ['DEX', 'AMM', 'Liquidity', 'Trading'],
      marketCap: '$127.8M',
      volume24h: '$2.1M',
      tokenSymbol: 'MIN',
      founded: '2022-03-01',
      governance: 'Token-based voting',
      activityData: [
        { month: 'Jan', proposals: 45, members: 50 },
        { month: 'Feb', proposals: 52, members: 48 },
        { month: 'Mar', proposals: 48, members: 52 },
        { month: 'Apr', proposals: 60, members: 58 },
        { month: 'May', proposals: 55, members: 62 },
        { month: 'Jun', proposals: 68, members: 65 }
      ],
      proposalData: [
        { name: 'Approved', value: 45, color: '#22c55e' },
        { name: 'Pending', value: 23, color: '#f59e0b' },
        { name: 'Rejected', value: 12, color: '#ef4444' },
        { name: 'Draft', value: 20, color: '#6b7280' }
      ]
    },
    'snek': {
      id: 'snek',
      name: 'Snek DAO',
      description: 'A community-driven meme token on Cardano focused on building utility and fostering community engagement through innovative mechanisms and fun initiatives.',
      category: 'community',
      members: 24680,
      proposals: 4,
      treasury: '₳16K',
      activity: 'High',
      website: 'https://snek.fi',
      twitter: 'https://twitter.com/snektoken',
      discord: 'https://discord.gg/snek',
      telegram: 'https://t.me/snektoken',
      status: 'active',
      logo: '🐍',
      verified: true,
      tags: ['Meme', 'Community', 'SNEK', '+1'],
      marketCap: '$18.7M',
      volume24h: '$245K',
      tokenSymbol: 'SNEK',
      founded: '2023-05-15',
      governance: 'Community-driven',
      activityData: [
        { month: 'Jan', proposals: 8, members: 45 },
        { month: 'Feb', proposals: 12, members: 48 },
        { month: 'Mar', proposals: 10, members: 45 },
        { month: 'Apr', proposals: 15, members: 52 },
        { month: 'May', proposals: 12, members: 55 },
        { month: 'Jun', proposals: 18, members: 60 }
      ],
      proposalData: [
        { name: 'Approved', value: 45, color: '#22c55e' },
        { name: 'Pending', value: 23, color: '#f59e0b' },
        { name: 'Rejected', value: 12, color: '#ef4444' },
        { name: 'Draft', value: 20, color: '#6b7280' }
      ]
    },
    'jpeg-store': {
      id: 'jpeg-store',
      name: 'JPEG Store DAO',
      description: 'The largest NFT marketplace on Cardano, empowering creators and collectors in the NFT ecosystem with advanced trading features and community governance.',
      category: 'nft',
      members: 22100,
      proposals: 7,
      treasury: '₳116K',
      activity: 'High',
      website: 'https://jpgstore.io',
      twitter: 'https://twitter.com/JPG_Store',
      discord: 'https://discord.gg/jpgstore',
      telegram: 'https://t.me/jpgstore',
      status: 'active',
      logo: 'J',
      verified: true,
      tags: ['NFT', 'Marketplace', 'Art', '+1'],
      volume24h: '$1.8M',
      tokenSymbol: 'JPEG',
      founded: '2021-10-05',
      governance: 'Marketplace governance',
      activityData: [
        { month: 'Jan', proposals: 15, members: 40 },
        { month: 'Feb', proposals: 18, members: 45 },
        { month: 'Mar', proposals: 22, members: 38 },
        { month: 'Apr', proposals: 25, members: 50 },
        { month: 'May', proposals: 28, members: 55 },
        { month: 'Jun', proposals: 32, members: 58 }
      ],
      proposalData: [
        { name: 'Approved', value: 45, color: '#22c55e' },
        { name: 'Pending', value: 23, color: '#f59e0b' },
        { name: 'Rejected', value: 12, color: '#ef4444' },
        { name: 'Draft', value: 20, color: '#6b7280' }
      ]
    },
    'sundaeswap': {
      id: 'sundaeswap',
      name: 'SundaeSwap DAO',
      description: 'A native, scalable decentralized exchange built on Cardano with innovative yield farming mechanisms and community-driven governance for sustainable growth.',
      category: 'defi',
      members: 18750,
      proposals: 8,
      treasury: '₳128K',
      activity: 'High',
      website: 'https://sundaeswap.finance',
      twitter: 'https://twitter.com/SundaeSwap',
      discord: 'https://discord.gg/sundaeswap',
      telegram: 'https://t.me/sundaeswap',
      status: 'active',
      logo: '🍨',
      verified: true,
      tags: ['DEX', 'Yield Farming', 'SUNDAE', 'AMM'],
      marketCap: '$89.3M',
      volume24h: '$1.4M',
      tokenSymbol: 'SUNDAE',
      founded: '2021-12-15',
      governance: 'Community voting',
      activityData: [
        { month: 'Jan', proposals: 38, members: 45 },
        { month: 'Feb', proposals: 42, members: 48 },
        { month: 'Mar', proposals: 40, members: 45 },
        { month: 'Apr', proposals: 48, members: 52 },
        { month: 'May', proposals: 45, members: 55 },
        { month: 'Jun', proposals: 52, members: 58 }
      ],
      proposalData: [
        { name: 'Approved', value: 45, color: '#22c55e' },
        { name: 'Pending', value: 23, color: '#f59e0b' },
        { name: 'Rejected', value: 12, color: '#ef4444' },
        { name: 'Draft', value: 20, color: '#6b7280' }
      ]
    }
  };

  return allDAODetails[id] || null;
};

export function CrossDAODetails({ daoId, onBack }: CrossDAODetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const dao = getDAODetails(daoId);

  if (!dao) {
    return (
      <div className="flex-1 overflow-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">DAO Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested DAO could not be found.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cross DAO Hub
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      'defi': TrendingUp,
      'nft': Star,
      'gaming': Gamepad2,
      'infrastructure': Building2,
      'community': Heart,
      'development': Code
    };
    const Icon = icons[category] || Building2;
    return Icon;
  };

  const CategoryIcon = getCategoryIcon(dao.category);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cross DAO Hub
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" asChild>
                <a href={dao.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-1" />
                  Visit Website
                </a>
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                View on Explorer
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-lg">
                {dao.logo}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{dao.name}</h1>
                {dao.verified && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {dao.status}
                </Badge>
                <Badge variant="outline">
                  {dao.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4 max-w-3xl">
                {dao.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dao.members.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{dao.proposals}</div>
                  <div className="text-sm text-muted-foreground">Proposals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dao.treasury}</div>
                  <div className="text-sm text-muted-foreground">Treasury</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                    <span>{dao.activity}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Activity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={dao.activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--card)', 
                            border: '1px solid var(--border)',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="proposals" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          name="Proposals"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="members" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          name="Member Growth"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Proposal Status Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Proposal Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={dao.proposalData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {dao.proposalData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--card)', 
                            border: '1px solid var(--border)',
                            borderRadius: '8px'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {dao.proposalData.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="text-lg font-semibold">{new Date(dao.founded).toLocaleDateString()}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Governance</p>
                      <p className="text-lg font-semibold">{dao.governance}</p>
                    </div>
                    <Vote className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-lg font-semibold capitalize">{dao.category}</p>
                    </div>
                    <CategoryIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Proposal #{i}</h4>
                        <p className="text-sm text-muted-foreground">
                          Sample proposal description for demonstration
                        </p>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Proposal Success Rate</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} />
                    <div className="flex justify-between">
                      <span>Member Engagement</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                    <div className="flex justify-between">
                      <span>Voting Participation</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Active Members
                      </span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Discussion Activity
                      </span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        Contributions
                      </span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a href={dao.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      Official Website
                    </a>
                  </div>
                  {dao.twitter && (
                    <div className="flex items-center gap-3">
                      <Twitter className="h-5 w-5 text-muted-foreground" />
                      <a href={dao.twitter} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        Twitter
                      </a>
                    </div>
                  )}
                  {dao.discord && (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      <a href={dao.discord} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        Discord
                      </a>
                    </div>
                  )}
                  {dao.telegram && (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      <a href={dao.telegram} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        Telegram
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dao.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
