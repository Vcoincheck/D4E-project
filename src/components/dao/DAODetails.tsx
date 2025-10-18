import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Users,
  Vote,
  Wallet,
  Calendar,
  Activity,
  TrendingUp,
  FileText,
  ExternalLink,
  Copy,
  Globe,
  MapPin,
  Mail,
  Phone,
  Building,
  Target,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface DAODetailsProps {
  type: 'enterprise' | 'community';
  id: string | number;
  onBack: () => void;
  onViewProposal?: (proposalId: string) => void;
}

export function DAODetails({ type, id, onBack, onViewProposal }: DAODetailsProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Mock data for enterprises and community DAOs
  const enterpriseData = {
    'apple': {
      name: "Apple Inc.",
      category: "Technology",
      logo: "🍎",
      description: "Apple's Web3 and blockchain governance initiative leveraging Cardano's sustainable infrastructure for corporate digital transformation and supply chain transparency.",
      fullDescription: "Apple Inc. has established a comprehensive Web3 governance framework built on Cardano's proof-of-stake blockchain. This initiative focuses on sustainable technology development, supply chain transparency, and corporate digital transformation. The DAO operates with the highest standards of environmental responsibility while maintaining Apple's commitment to innovation and user privacy.",
      members: "125K",
      proposals: "89",
      treasury: "₳12.5M",
      activity: "High",
      status: "Enterprise",
      founded: "2024-01-15",
      website: "https://apple.com/web3",
      location: "Cupertino, California",
      email: "web3@apple.com",
      phone: "+1 (408) 996-1010",
      address: "addr1qxy2...9k4l",
      tags: ["Fortune 500", "Technology", "Innovation"],
      socialStats: {
        twitter: "45.2M",
        discord: "850K",
        telegram: "125K"
      }
    },
    'oracle': {
      name: "Oracle Corporation",
      category: "Enterprise",
      logo: "🔴",
      description: "Oracle's blockchain database solutions and enterprise governance framework built on Cardano's proof-of-stake consensus mechanism.",
      fullDescription: "Oracle Corporation's enterprise blockchain division leverages Cardano's robust infrastructure to provide secure, scalable database solutions for enterprise governance. Our DAO focuses on developing next-generation blockchain database technologies and providing enterprise-grade solutions for global organizations.",
      members: "89K",
      proposals: "67",
      treasury: "₳8.9M",
      activity: "High",
      status: "Enterprise",
      founded: "2023-11-20",
      website: "https://oracle.com/blockchain",
      location: "Austin, Texas",
      email: "blockchain@oracle.com",
      phone: "+1 (737) 867-1000",
      address: "addr1qab3...7x9m",
      tags: ["Fortune 500", "Database", "Cloud"],
      socialStats: {
        twitter: "2.8M",
        discord: "320K",
        telegram: "89K"
      }
    },
    'samsung': {
      name: "Samsung Electronics",
      category: "Technology",
      logo: "📱",
      description: "Samsung's smart device and IoT governance platform utilizing Cardano's secure blockchain infrastructure for device authentication and data integrity.",
      fullDescription: "Samsung Electronics has developed an innovative IoT and smart device governance platform on Cardano. This initiative encompasses device authentication, data integrity, and smart contract automation for the next generation of connected devices. Our DAO governs the development and deployment of blockchain-enabled Samsung products.",
      members: "156K",
      proposals: "112",
      treasury: "₳15.6M",
      activity: "High",
      status: "Enterprise",
      founded: "2023-09-10",
      website: "https://samsung.com/blockchain",
      location: "Seoul, South Korea",
      email: "blockchain@samsung.com",
      phone: "+82-2-2255-0114",
      address: "addr1qcd5...2k8n",
      tags: ["Fortune 500", "IoT", "Electronics"],
      socialStats: {
        twitter: "12.5M",
        discord: "680K",
        telegram: "156K"
      }
    },
    'vcc': {
      name: "VCC Capital",
      category: "Finance",
      logo: "💼",
      description: "VCC Capital's decentralized investment management and institutional governance platform powered by Cardano's transparent and secure blockchain technology.",
      fullDescription: "VCC Capital operates a sophisticated decentralized investment management platform on Cardano. Our DAO governs institutional-grade investment strategies, risk management protocols, and capital allocation decisions. We leverage Cardano's security and transparency to provide superior investment outcomes for our stakeholders.",
      members: "42K",
      proposals: "78",
      treasury: "₳4.2M",
      activity: "Medium",
      status: "Enterprise",
      founded: "2024-02-01",
      website: "https://vcccapital.com",
      location: "VietNam",
      email: "vietcoreteam@gmail.com",
      phone: "+65 6123 4567",
      address: "addr1qef7...5m4p",
      tags: ["Finance", "Investment", "Capital"],
      socialStats: {
        twitter: "890K",
        discord: "156K",
        telegram: "42K"
      }
    }
  };

  const communityData = {
    1: {
      name: "Cardano Foundation",
      category: "Governance",
      logo: "C",
      description: "Official Cardano Foundation DAO focusing on ecosystem development, education, and adoption initiatives across the global Cardano community.",
      fullDescription: "The Cardano Foundation DAO is the official governance body for the Cardano ecosystem. We focus on education, adoption, and ecosystem development through community-driven initiatives. Our mission is to advance the Cardano platform and grow the global community of developers, users, and stakeholders.",
      members: "12.4K",
      proposals: "156",
      treasury: "₳847K",
      activity: "High",
      status: "Verified",
      founded: "2021-03-15",
      website: "https://cardanofoundation.org",
      location: "Global",
      email: "governance@cardanofoundation.org",
      address: "addr1qgh9...8p2q",
      tags: ["Official", "Education", "Development"],
      socialStats: {
        twitter: "580K",
        discord: "125K",
        telegram: "89K"
      }
    },
    2: {
      name: "IOHK Research",
      category: "Development",
      logo: "I",
      description: "Research and development focused DAO advancing Cardano's technological capabilities through peer-reviewed research and innovative solutions.",
      fullDescription: "IOHK Research DAO drives cutting-edge blockchain research and development. We conduct peer-reviewed research, develop innovative protocols, and advance the scientific foundations of blockchain technology. Our work directly contributes to Cardano's technical evolution and the broader blockchain ecosystem.",
      members: "8.2K",
      proposals: "89",
      treasury: "₳523K",
      activity: "Medium",
      status: "Active",
      founded: "2021-05-20",
      website: "https://iohk.io/research",
      location: "Edinburgh, UK",
      email: "research@iohk.io",
      address: "addr1qij1...4r7s",
      tags: ["Research", "Technology", "Innovation"],
      socialStats: {
        twitter: "320K",
        discord: "78K",
        telegram: "45K"
      }
    },
    3: {
      name: "Catalyst Community",
      category: "Innovation",
      logo: "🚀",
      description: "Community-driven innovation fund supporting entrepreneurship and development projects within the Cardano ecosystem through democratic funding.",
      fullDescription: "The Catalyst Community DAO operates the largest decentralized innovation fund in the blockchain space. We support entrepreneurs, developers, and innovators through democratic funding mechanisms. Our community-driven approach has funded hundreds of projects that advance the Cardano ecosystem.",
      members: "15.7K",
      proposals: "234",
      treasury: "₳1.2M",
      activity: "High",
      status: "New",
      founded: "2024-01-10",
      website: "https://cardanocatalyst.org",
      location: "Global",
      email: "community@cardanocatalyst.org",
      address: "addr1qkl3...6u8v",
      tags: ["Funding", "Community", "Innovation"],
      socialStats: {
        twitter: "420K",
        discord: "235K",
        telegram: "157K"
      }
    },
    4: {
      name: "SundaeSwap DAO",
      category: "DeFi",
      logo: "🍨",
      description: "Decentralized exchange protocol governance enabling community-driven decisions on protocol upgrades, fee structures, and strategic partnerships.",
      fullDescription: "SundaeSwap DAO governs one of Cardano's premier decentralized exchanges. Our community makes decisions on protocol upgrades, fee structures, liquidity incentives, and strategic partnerships. We're committed to building the most user-friendly and efficient DEX on Cardano.",
      members: "6.8K",
      proposals: "67",
      treasury: "₳398K",
      activity: "Low",
      status: "Active",
      founded: "2022-02-14",
      website: "https://sundaeswap.finance",
      location: "Global",
      email: "governance@sundaeswap.finance",
      address: "addr1qmn5...7w9x",
      tags: ["DeFi", "Exchange", "Protocol"],
      socialStats: {
        twitter: "180K",
        discord: "95K",
        telegram: "68K"
      }
    },
    5: {
      name: "MinSwap Protocol",
      category: "DeFi",
      logo: "💧",
      description: "Multi-pool decentralized exchange governance focused on providing efficient trading mechanisms and liquidity solutions for the Cardano ecosystem.",
      fullDescription: "MinSwap Protocol DAO operates a next-generation multi-pool DEX on Cardano. We focus on capital efficiency, innovative trading mechanisms, and optimal liquidity solutions. Our governance model ensures community ownership of protocol development and strategic decisions.",
      members: "9.1K",
      proposals: "112",
      treasury: "₳674K",
      activity: "Medium",
      status: "Verified",
      founded: "2021-11-08",
      website: "https://minswap.org",
      location: "Global",
      email: "dao@minswap.org",
      address: "addr1qop7...8y0z",
      tags: ["DeFi", "Liquidity", "AMM"],
      socialStats: {
        twitter: "250K",
        discord: "120K",
        telegram: "91K"
      }
    },
    6: {
      name: "ADA Holders United",
      category: "Community",
      logo: "🤝",
      description: "Grassroots community organization representing ADA holders' interests and promoting decentralized governance participation across the ecosystem.",
      fullDescription: "ADA Holders United is the largest grassroots organization representing ADA holders worldwide. We advocate for holder interests, promote governance participation, and ensure the community's voice is heard in ecosystem decisions. Our goal is to strengthen decentralized governance across Cardano.",
      members: "22.3K",
      proposals: "78",
      treasury: "₳156K",
      activity: "High",
      status: "Active",
      founded: "2020-12-03",
      website: "https://adaholdersunited.org",
      location: "Global",
      email: "governance@adaholdersunited.org",
      address: "addr1qrs9...1a2b",
      tags: ["Community", "Advocacy", "Governance"],
      socialStats: {
        twitter: "380K",
        discord: "156K",
        telegram: "223K"
      }
    },
    7: {
      name: "Cardano NFT Alliance",
      category: "NFTs",
      logo: "🎨",
      description: "Supporting NFT creators, collectors, and developers building on Cardano through collaborative governance and community-driven initiatives.",
      fullDescription: "The Cardano NFT Alliance brings together creators, collectors, and developers in the Cardano NFT ecosystem. We provide governance for NFT standards, support creator initiatives, and build tools for the growing NFT community. Our mission is to make Cardano the premier blockchain for digital art and collectibles.",
      members: "4.5K",
      proposals: "45",
      treasury: "₳89K",
      activity: "Medium",
      status: "New",
      founded: "2023-09-12",
      website: "https://cardanonftalliance.org",
      location: "Global",
      email: "alliance@cardanonftalliance.org",
      address: "addr1qtv1...3c4d",
      tags: ["NFTs", "Art", "Creators"],
      socialStats: {
        twitter: "125K",
        discord: "89K",
        telegram: "45K"
      }
    },
    8: {
      name: "Cardano Climate Coalition",
      category: "Environmental",
      logo: "🌱",
      description: "Environmental sustainability focused DAO promoting green initiatives and carbon-neutral blockchain solutions within the Cardano ecosystem.",
      fullDescription: "The Cardano Climate Coalition leads environmental sustainability efforts within the Cardano ecosystem. We promote green initiatives, carbon offset programs, and sustainable blockchain practices. Our goal is to make Cardano the most environmentally responsible blockchain platform.",
      members: "7.8K",
      proposals: "92",
      treasury: "₳234K",
      activity: "Medium",
      status: "Verified",
      founded: "2022-06-05",
      website: "https://cardanoclimate.org",
      location: "Global",
      email: "coalition@cardanoclimate.org",
      address: "addr1quw3...5e6f",
      tags: ["Environment", "Sustainability", "Climate"],
      socialStats: {
        twitter: "95K",
        discord: "67K",
        telegram: "78K"
      }
    },
    9: {
      name: "Cardano Developers Guild",
      category: "Development",
      logo: "⚙️",
      description: "Technical community of developers building tools, dApps, and infrastructure for the Cardano ecosystem through collaborative governance.",
      fullDescription: "The Cardano Developers Guild is a technical community focused on building the future of the Cardano ecosystem. We develop tools, dApps, and infrastructure through collaborative governance. Our mission is to provide developers with the resources, standards, and community support needed to build innovative solutions on Cardano.",
      members: "11.2K",
      proposals: "134",
      treasury: "₳567K",
      activity: "High",
      status: "Active",
      founded: "2021-08-14",
      website: "https://developers.cardano.org",
      location: "Global",
      email: "guild@developers.cardano.org",
      address: "addr1qvw5...7g8h",
      tags: ["Development", "Tools", "Infrastructure"],
      socialStats: {
        twitter: "210K",
        discord: "187K",
        telegram: "112K"
      }
    },
    10: {
      name: "Cardano Gaming Alliance",
      category: "Gaming",
      logo: "🎮",
      description: "Bringing blockchain gaming to Cardano through community governance of game development, NFT standards, and player-driven economies.",
      fullDescription: "The Cardano Gaming Alliance is pioneering the future of blockchain gaming on Cardano. We govern game development standards, NFT gaming assets, and player-driven economies. Our community includes game developers, players, and enthusiasts working together to make Cardano the premier blockchain for gaming.",
      members: "13.5K",
      proposals: "78",
      treasury: "₳445K",
      activity: "High",
      status: "New",
      founded: "2024-03-22",
      website: "https://gaming.cardano.org",
      location: "Global",
      email: "alliance@gaming.cardano.org",
      address: "addr1qxy9...9i0j",
      tags: ["Gaming", "NFTs", "Entertainment"],
      socialStats: {
        twitter: "175K",
        discord: "245K",
        telegram: "135K"
      }
    }
  };

  // Get current DAO data
  const currentDAO = type === 'enterprise' 
    ? enterpriseData[id as keyof typeof enterpriseData]
    : communityData[id as keyof typeof communityData];

  if (!currentDAO) {
    return (
      <div className="p-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h2>DAO not found</h2>
          <p className="text-muted-foreground">The requested DAO could not be found.</p>
        </div>
      </div>
    );
  }

  // Mock activity data for charts
  const activityData = [
    { month: 'Jan', votes: 45, proposals: 8, members: 950 },
    { month: 'Feb', votes: 52, proposals: 12, members: 1200 },
    { month: 'Mar', votes: 48, proposals: 10, members: 1450 },
    { month: 'Apr', votes: 61, proposals: 15, members: 1680 },
    { month: 'May', votes: 55, proposals: 13, members: 1890 },
    { month: 'Jun', votes: 67, proposals: 18, members: 2100 },
  ];

  const proposalStatusData = [
    { name: 'Approved', value: 45, color: '#10b981' },
    { name: 'Pending', value: 23, color: '#f59e0b' },
    { name: 'Rejected', value: 12, color: '#ef4444' },
    { name: 'Draft', value: 20, color: '#6b7280' },
  ];

  const membershipData = [
    { category: 'Active Voters', count: parseInt(currentDAO.members.replace(/[^\d]/g, '')) * 0.3 },
    { category: 'Proposal Creators', count: parseInt(currentDAO.members.replace(/[^\d]/g, '')) * 0.1 },
    { category: 'General Members', count: parseInt(currentDAO.members.replace(/[^\d]/g, '')) * 0.6 },
  ];

  // Mock proposals data
  const mockProposals = [
    {
      id: 'PROP-001',
      title: 'Treasury Allocation for Q4 2024',
      description: 'Proposal to allocate 25% of treasury funds for development initiatives and community programs.',
      status: 'Active',
      votes: { for: 1247, against: 156, abstain: 89 },
      deadline: '2024-12-15',
      category: 'Treasury'
    },
    {
      id: 'PROP-002',
      title: 'Protocol Upgrade v2.1',
      description: 'Technical proposal for implementing new consensus mechanisms and smart contract improvements.',
      status: 'Approved',
      votes: { for: 2156, against: 234, abstain: 123 },
      deadline: '2024-11-30',
      category: 'Technical'
    },
    {
      id: 'PROP-003',
      title: 'Community Incentive Program',
      description: 'Establish a rewards program for active community members and contributors.',
      status: 'Draft',
      votes: { for: 0, against: 0, abstain: 0 },
      deadline: '2024-12-30',
      category: 'Community'
    },
    {
      id: 'PROP-004',
      title: 'Partnership with Sustainability Initiative',
      description: 'Strategic partnership proposal for carbon-neutral blockchain operations.',
      status: 'Pending',
      votes: { for: 892, against: 67, abstain: 45 },
      deadline: '2024-12-20',
      category: 'Partnership'
    },
    {
      id: 'PROP-005',
      title: 'Governance Token Economics Update',
      description: 'Proposal to adjust tokenomics and voting mechanisms for improved governance.',
      status: 'Rejected',
      votes: { for: 567, against: 1234, abstain: 89 },
      deadline: '2024-11-15',
      category: 'Governance'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Members
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <ExternalLink className="h-3 w-3" />
            Visit Website
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Globe className="h-3 w-3" />
            View on Explorer
          </Button>
        </div>
      </div>

      {/* Basic Info Card */}
      <Card className={`border-2 ${type === 'enterprise' ? 'border-yellow-200/50 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20'} backdrop-blur-md`}>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 ${type === 'enterprise' ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/30' : 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border/50'} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
              {currentDAO.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{currentDAO.name}</h1>
                <Badge className={type === 'enterprise' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' : 'bg-blue-600 text-white'}>
                  {currentDAO.status}
                </Badge>
                <Badge variant="outline">{currentDAO.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{currentDAO.fullDescription}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`font-bold text-xl ${type === 'enterprise' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {currentDAO.members}
                  </div>
                  <div className="text-muted-foreground text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-xl ${type === 'enterprise' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {currentDAO.proposals}
                  </div>
                  <div className="text-muted-foreground text-sm">Proposals</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-xl ${type === 'enterprise' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {currentDAO.treasury}
                  </div>
                  <div className="text-muted-foreground text-sm">Treasury</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      currentDAO.activity === 'High' ? 'bg-emerald-500' :
                      currentDAO.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                    <span className={`font-bold ${type === 'enterprise' ? 'text-yellow-600' : 'text-blue-600'}`}>
                      {currentDAO.activity}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">Activity</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Founded</span>
                  <div className="font-medium">{new Date(currentDAO.founded).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Category</span>
                  <div className="font-medium">{currentDAO.category}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline">{currentDAO.status}</Badge>
                </div>
                {currentDAO.location && (
                  <div>
                    <span className="text-sm text-muted-foreground">Location</span>
                    <div className="font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {currentDAO.location}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Tags</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentDAO.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Treasury Address</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{currentDAO.address}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(currentDAO.address)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedAddress === currentDAO.address ? (
                        <span className="text-xs text-green-600">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
                {currentDAO.socialStats && (
                  <>
                    <div>
                      <span className="text-sm text-muted-foreground">Twitter Followers</span>
                      <div className="font-medium">{currentDAO.socialStats.twitter}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Discord Members</span>
                      <div className="font-medium">{currentDAO.socialStats.discord}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Telegram Members</span>
                      <div className="font-medium">{currentDAO.socialStats.telegram}</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Active Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProposals.map((proposal) => (
                  <Card key={proposal.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {proposal.category}
                            </Badge>
                            <Badge
                              variant={
                                proposal.status === 'Active' ? 'default' :
                                proposal.status === 'Approved' ? 'secondary' :
                                proposal.status === 'Pending' ? 'secondary' :
                                proposal.status === 'Draft' ? 'outline' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {proposal.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{proposal.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                          
                          {proposal.status !== 'Draft' && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>For: {proposal.votes.for.toLocaleString()}</span>
                              <span>Against: {proposal.votes.against.toLocaleString()}</span>
                              <span>Abstain: {proposal.votes.abstain.toLocaleString()}</span>
                              <span>Deadline: {new Date(proposal.deadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4">
                          {onViewProposal && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onViewProposal(proposal.id)}
                              className="gap-1"
                            >
                              <FileText className="h-3 w-3" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics content with charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Trends */}
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
                    <RechartsLineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
                      <YAxis stroke="currentColor" opacity={0.6} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--card-foreground))'
                        }}
                      />
                      <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={2} name="Votes" />
                      <Line type="monotone" dataKey="proposals" stroke="#10b981" strokeWidth={2} name="Proposals" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Proposal Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={proposalStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {proposalStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--card-foreground))'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Membership Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Membership Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={membershipData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="category" stroke="currentColor" opacity={0.6} />
                      <YAxis stroke="currentColor" opacity={0.6} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--card-foreground))'
                        }}
                      />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <div className="font-medium">{currentDAO.email}</div>
                </div>
                {currentDAO.phone && (
                  <div>
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <div className="font-medium">{currentDAO.phone}</div>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Website</span>
                  <div className="font-medium text-blue-600 dark:text-blue-400">
                    <a href={currentDAO.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {currentDAO.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Additional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Official Website
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Activity className="h-4 w-4" />
                    Governance Forum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
