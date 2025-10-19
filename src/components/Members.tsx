import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from './providers/ThemeProvider';
import { 
  ArrowLeft,
  Search, 
  Filter,
  Users, 
  Vote,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  ChevronDown,
  Grid3X3,
  List,
  Plus,
  ExternalLink,
  Building2,
  Globe,
  Heart,
  Trophy,
  Star,
  Gamepad2,
  Code,
  CheckCircle,
  Wallet
} from 'lucide-react';

// Import the uploaded DAO logos
import vietCardanoLogo from '../assets/projectlogo/VCC.png';
import vtechcomLogo from '../assets/projectlogo/Vtech.png';
import minswapLogo from '../assets/projectlogo/minswap.png';

interface MembersProps {
  onNavigateHome: () => void;
  onNavigateToDashboard: () => void;
  onCreateDAO: () => void;
  onViewDetails?: (type: 'enterprise' | 'community', id: string | number) => void;
  onViewCrossDAODetails?: (daoId: string) => void;
}

export function Members({ onNavigateHome, onNavigateToDashboard, onCreateDAO, onViewDetails, onViewCrossDAODetails }: MembersProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('members');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Enterprise Members - Major Organizations
  const enterpriseMembers = [
    {
      id: 'apple',
      name: "Apple Inc.",
      category: "Technology",
      description: "Apple's Web3 and blockchain governance initiative leveraging Cardano's sustainable infrastructure for corporate digital transformation and supply chain transparency.",
      members: "125K",
      membersCount: 125000,
      votes: "2.8K",
      votesCount: 2800,
      proposals: "89",
      status: "Enterprise" as const,
      activity: "High",
      treasury: "₳12.5M",
      treasuryValue: 12500000,
      founded: "2024-01-15",
      lastActivity: "45 minutes ago",
      tags: ["Fortune 500", "Technology", "Innovation"],
      logo: "🍎"
    },
    {
      id: 'oracle',
      name: "Oracle Corporation",
      category: "Enterprise",
      description: "Oracle's blockchain database solutions and enterprise governance framework built on Cardano's proof-of-stake consensus mechanism.",
      members: "89K",
      membersCount: 89000,
      votes: "1.9K",
      votesCount: 1900,
      proposals: "67",
      status: "Enterprise" as const,
      activity: "High",
      treasury: "₳8.9M",
      treasuryValue: 8900000,
      founded: "2023-11-20",
      lastActivity: "1 hour ago",
      tags: ["Fortune 500", "Database", "Cloud"],
      logo: "🔴"
    },
    {
      id: 'samsung',
      name: "Samsung Electronics",
      category: "Technology",
      description: "Samsung's smart device and IoT governance platform utilizing Cardano's secure blockchain infrastructure for device authentication and data integrity.",
      members: "156K",
      membersCount: 156000,
      votes: "3.2K",
      votesCount: 3200,
      proposals: "112",
      status: "Enterprise" as const,
      activity: "High",
      treasury: "₳15.6M",
      treasuryValue: 15600000,
      founded: "2023-09-10",
      lastActivity: "30 minutes ago",
      tags: ["Fortune 500", "IoT", "Electronics"],
      logo: "📱"
    },
    {
      id: 'vcc',
      name: "VCC Capital",
      category: "Finance",
      description: "VCC Capital's decentralized investment management and institutional governance platform powered by Cardano's transparent and secure blockchain technology.",
      members: "42K",
      membersCount: 42000,
      votes: "1.1K",
      votesCount: 1100,
      proposals: "78",
      status: "Enterprise" as const,
      activity: "Medium",
      treasury: "₳4.2M",
      treasuryValue: 4200000,
      founded: "2024-02-01",
      lastActivity: "2 hours ago",
      tags: ["Finance", "Investment", "Capital"],
      logo: "V"
      
    }
  ];

  // Mock DAO data - expanded version
  const allDAOs = [
    {
      id: 1,
      name: "Cardano Foundation",
      category: "Governance",
      description: "Official Cardano Foundation DAO focusing on ecosystem development, education, and adoption initiatives across the global Cardano community.",
      members: "12.4K",
      membersCount: 12400,
      votes: "847",
      votesCount: 847,
      proposals: "156",
      status: "Verified" as const,
      activity: "High",
      treasury: "₳847K",
      treasuryValue: 847000,
      founded: "2021-03-15",
      lastActivity: "2 hours ago",
      tags: ["Official", "Education", "Development"]
    },
    {
      id: 2,
      name: "IOHK Research",
      category: "Development", 
      description: "Research and development focused DAO advancing Cardano's technological capabilities through peer-reviewed research and innovative solutions.",
      members: "8.2K",
      membersCount: 8200,
      votes: "523",
      votesCount: 523,
      proposals: "89",
      status: "Active" as const,
      activity: "Medium",
      treasury: "₳523K",
      treasuryValue: 523000,
      founded: "2021-05-20",
      lastActivity: "5 hours ago",
      tags: ["Research", "Technology", "Innovation"]
    },
    {
      id: 3,
      name: "Catalyst Community",
      category: "Innovation",
      description: "Community-driven innovation fund supporting entrepreneurship and development projects within the Cardano ecosystem through democratic funding.",
      members: "15.7K", 
      membersCount: 15700,
      votes: "1.2K",
      votesCount: 1200,
      proposals: "234",
      status: "New" as const,
      activity: "High",
      treasury: "₳1.2M",
      treasuryValue: 1200000,
      founded: "2024-01-10",
      lastActivity: "1 hour ago",
      tags: ["Funding", "Community", "Innovation"]
    },
    {
      id: 4,
      name: "SundaeSwap DAO",
      category: "DeFi",
      description: "Decentralized exchange protocol governance enabling community-driven decisions on protocol upgrades, fee structures, and strategic partnerships.",
      members: "6.8K",
      membersCount: 6800,
      votes: "398",
      votesCount: 398,
      proposals: "67",
      status: "Active" as const,
      activity: "Low",
      treasury: "₳398K",
      treasuryValue: 398000,
      founded: "2022-02-14",
      lastActivity: "1 day ago",
      tags: ["DeFi", "Exchange", "Protocol"]
    },
    {
      id: 5,
      name: "MinSwap Protocol",
      category: "DeFi",
      description: "Multi-pool decentralized exchange governance focused on providing efficient trading mechanisms and liquidity solutions for the Cardano ecosystem.",
      members: "9.1K",
      membersCount: 9100,
      votes: "674",
      votesCount: 674,
      proposals: "112",
      status: "Verified" as const,
      activity: "Medium",
      treasury: "₳674K",
      treasuryValue: 674000,
      founded: "2021-11-08",
      lastActivity: "6 hours ago",
      tags: ["DeFi", "Liquidity", "AMM"]
    },
    {
      id: 6,
      name: "ADA Holders United",
      category: "Community",
      description: "Grassroots community organization representing ADA holders' interests and promoting decentralized governance participation across the ecosystem.",
      members: "22.3K",
      membersCount: 22300,
      votes: "892",
      votesCount: 892,
      proposals: "78",
      status: "Active" as const,
      activity: "High",
      treasury: "₳156K",
      treasuryValue: 156000,
      founded: "2020-12-03",
      lastActivity: "30 minutes ago",
      tags: ["Community", "Advocacy", "Governance"]
    },
    {
      id: 7,
      name: "Cardano NFT Alliance",
      category: "NFTs",
      description: "Supporting NFT creators, collectors, and developers building on Cardano through collaborative governance and community-driven initiatives.",
      members: "4.5K",
      membersCount: 4500,
      votes: "267",
      votesCount: 267,
      proposals: "45",
      status: "New" as const,
      activity: "Medium",
      treasury: "₳89K",
      treasuryValue: 89000,
      founded: "2023-09-12",
      lastActivity: "3 hours ago",
      tags: ["NFTs", "Art", "Creators"]
    },
    {
      id: 8,
      name: "Cardano Climate Coalition",
      category: "Environmental",
      description: "Environmental sustainability focused DAO promoting green initiatives and carbon-neutral blockchain solutions within the Cardano ecosystem.",
      members: "7.8K",
      membersCount: 7800,
      votes: "445",
      votesCount: 445,
      proposals: "92",
      status: "Verified" as const,
      activity: "Medium",
      treasury: "₳234K",
      treasuryValue: 234000,
      founded: "2022-06-05",
      lastActivity: "4 hours ago",
      tags: ["Environment", "Sustainability", "Climate"]
    },
    {
      id: 9,
      name: "Cardano Developers Guild",
      category: "Development",
      description: "Technical community of developers building tools, dApps, and infrastructure for the Cardano ecosystem through collaborative governance.",
      members: "11.2K",
      membersCount: 11200,
      votes: "734",
      votesCount: 734,
      proposals: "134",
      status: "Active" as const,
      activity: "High",
      treasury: "₳567K",
      treasuryValue: 567000,
      founded: "2021-08-14",
      lastActivity: "1 hour ago",
      tags: ["Development", "Tools", "Infrastructure"]
    },
    {
      id: 10,
      name: "Cardano Gaming Alliance",
      category: "Gaming",
      description: "Bringing blockchain gaming to Cardano through community governance of game development, NFT standards, and player-driven economies.",
      members: "13.5K",
      membersCount: 13500,
      votes: "856",
      votesCount: 856,
      proposals: "78",
      status: "New" as const,
      activity: "High",
      treasury: "₳445K",
      treasuryValue: 445000,
      founded: "2024-03-22",
      lastActivity: "2 hours ago",
      tags: ["Gaming", "NFTs", "Entertainment"]
    }
  ];

  // Cross DAO Hub data - External Cardano DAOs
  const crossDAOs = [
    {
      id: 'viet-cardano-community',
      name: 'VietCardanoCommunity',
      description: 'Vietnamese Cardano community focused on education, development, and promoting Cardano adoption.',
      category: 'Community',
      members: 8920,
      proposals: 6,
      website: 'https://vietcardano.org',
      verified: true,
      logo: vietCardanoLogo,
      logoType: 'image',
      tags: ['Education', 'Community', 'Vietnam'],
      type: 'cross' as const
    },
    {
      id: 'vtechcom',
      name: 'Vtechcom',
      description: 'Technology innovation and development community focusing on blockchain solutions and digital transformation.',
      category: 'Technology',
      members: 5240,
      proposals: 4,
      website: 'https://vtechcom.org',
      verified: true,
      logo: vtechcomLogo,
      logoType: 'image',
      tags: ['Technology', 'Innovation', 'Development'],
      type: 'cross' as const
    },
    {
      id: 'minswap',
      name: 'Minswap DAO',
      description: 'The first multi-pool decentralized exchange on Cardano, enabling users to trade, swap, and provide liquidity.',
      category: 'DeFi',
      members: 15420,
      proposals: 12,
      tvl: '$45.2M',
      website: 'https://minswap.org',
      verified: true,
      logo: minswapLogo,
      logoType: 'image',
      tags: ['DEX', 'AMM', 'Liquidity', 'Trading'],
      type: 'cross' as const
    },
    {
      id: 'sundaeswap',
      name: 'SundaeSwap DAO',
      description: 'A native, scalable decentralized exchange built on Cardano with innovative yield farming mechanisms.',
      category: 'DeFi',
      members: 18750,
      proposals: 8,
      tvl: '$32.8M',
      website: 'https://sundaeswap.finance',
      verified: true,
      logo: '🍨',
      logoType: 'text',
      tags: ['DEX', 'Yield Farming', 'AMM'],
      type: 'cross' as const
    },
    {
      id: 'liqwid',
      name: 'Liqwid DAO',
      description: 'An algorithmic and non-custodial interest rate protocol built for lenders, borrowers, and developers.',
      category: 'DeFi',
      members: 12350,
      proposals: 15,
      tvl: '$28.5M',
      website: 'https://liqwid.finance',
      verified: true,
      logo: 'L',
      logoType: 'text',
      tags: ['Lending', 'Borrowing', 'Interest Rates'],
      type: 'cross' as const
    },
    {
      id: 'snek',
      name: 'Snek DAO',
      description: 'A community-driven meme token on Cardano focused on building utility and fostering community engagement.',
      category: 'Community',
      members: 24680,
      proposals: 4,
      marketCap: '$18.7M',
      website: 'https://snek.fi',
      verified: true,
      logo: '🐍',
      logoType: 'text',
      tags: ['Meme', 'Community', 'Utility'],
      type: 'cross' as const
    },
    {
      id: 'jpeg-store',
      name: 'JPEG Store DAO',
      description: 'The largest NFT marketplace on Cardano, empowering creators and collectors in the NFT ecosystem.',
      category: 'NFT',
      members: 22100,
      proposals: 7,
      volume24h: '$1.8M',
      website: 'https://jpgstore.io',
      verified: true,
      logo: 'J',
      logoType: 'text',
      tags: ['NFT', 'Marketplace', 'Art'],
      type: 'cross' as const
    },
    {
      id: 'cornucopias',
      name: 'Cornucopias DAO',
      description: 'A blockchain-based game where players can earn, trade, and create in a massive multiplayer online world.',
      category: 'Gaming',
      members: 16780,
      proposals: 5,
      website: 'https://cornucopias.io',
      verified: true,
      logo: 'C',
      logoType: 'text',
      tags: ['Gaming', 'Metaverse', 'Play-to-Earn'],
      type: 'cross' as const
    },
    {
      id: 'world-mobile',
      name: 'World Mobile DAO',
      description: 'Connecting the unconnected through a decentralized mobile network built on Cardano blockchain infrastructure.',
      category: 'Infrastructure',
      members: 11240,
      proposals: 11,
      website: 'https://worldmobile.io',
      verified: true,
      logo: 'WM',
      logoType: 'text',
      tags: ['Telecom', 'Infrastructure', 'Mobile'],
      type: 'cross' as const
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'governance', label: 'Governance' },
    { value: 'development', label: 'Development' },
    { value: 'defi', label: 'DeFi' },
    { value: 'community', label: 'Community' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'nfts', label: 'NFTs' },
    { value: 'environmental', label: 'Environmental' },
    { value: 'gaming', label: 'Gaming' }
  ];

  // Filter and sort DAOs
  const filteredDAOs = allDAOs.filter(dao => {
    const matchesSearch = dao.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dao.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           dao.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedDAOs = [...filteredDAOs].sort((a, b) => {
    switch (sortBy) {
      case 'members':
        return b.membersCount - a.membersCount;
      case 'treasury':
        return b.treasuryValue - a.treasuryValue;
      case 'activity':
        return b.votesCount - a.votesCount;
      case 'newest':
        return new Date(b.founded).getTime() - new Date(a.founded).getTime();
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalEnterpriseMembers = enterpriseMembers.length;
  const totalCommunityDAOs = allDAOs.length;
  const totalCrossDAOs = crossDAOs.length;
  const totalMembers = allDAOs.reduce((sum, dao) => sum + dao.membersCount, 0) + enterpriseMembers.reduce((sum, ent) => sum + ent.membersCount, 0) + crossDAOs.reduce((sum, dao) => sum + dao.members, 0);
  const totalVotes = allDAOs.reduce((sum, dao) => sum + dao.votesCount, 0) + enterpriseMembers.reduce((sum, ent) => sum + ent.votesCount, 0);
  const totalTreasury = (allDAOs.reduce((sum, dao) => sum + dao.treasuryValue, 0) + enterpriseMembers.reduce((sum, ent) => sum + ent.treasuryValue, 0)) / 1000000;

  const renderEnterpriseCard = (enterprise: any) => (
    <Card key={enterprise.id} className="group hover:bg-card/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 border-gradient-to-r from-yellow-400/50 to-orange-500/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-50"></div>
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/30 rounded-lg flex items-center justify-center text-lg shadow-lg">
            {enterprise.logo}
          </div>
          <div className="flex items-center gap-1">
            <Badge 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold shadow-lg"
            >
              {enterprise.status}
            </Badge>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-600 hover:text-yellow-500 p-1">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors font-bold">
          {enterprise.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm font-medium">{enterprise.category}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {enterprise.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 relative">
        <div className="flex flex-wrap gap-1 mb-2">
          {enterprise.tags.slice(0, 2).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs border-yellow-400/30 text-yellow-700 dark:text-yellow-300">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Members</span>
            <span className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.members}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Proposals</span>
            <span className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.proposals}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Treasury</span>
            <span className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.treasury}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Activity</span>
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                enterprise.activity === 'High' ? 'bg-emerald-500' :
                enterprise.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              <span className="font-bold text-xs text-yellow-600 dark:text-yellow-400">{enterprise.activity}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-yellow-400/20">
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold shadow-lg transition-all group-hover:shadow-xl text-xs"
            onClick={() => onViewDetails?.('enterprise', enterprise.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderEnterpriseListItem = (enterprise: any) => (
    <Card key={enterprise.id} className="group hover:bg-card/90 transition-all duration-300 border-2 border-gradient-to-r from-yellow-400/50 to-orange-500/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-50"></div>
      <CardContent className="p-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/30 rounded-lg flex items-center justify-center text-lg shadow-lg">
              {enterprise.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-lg group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {enterprise.name}
                </h3>
                <Badge 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-semibold"
                >
                  {enterprise.status}
                </Badge>
                <Badge variant="outline" className="text-xs border-yellow-400/30 text-yellow-700 dark:text-yellow-300">
                  {enterprise.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {enterprise.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {enterprise.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-yellow-400/30 text-yellow-700 dark:text-yellow-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.members}</div>
              <div className="text-muted-foreground text-xs">Members</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.proposals}</div>
              <div className="text-muted-foreground text-xs">Proposals</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600 dark:text-yellow-400">{enterprise.treasury}</div>
              <div className="text-muted-foreground text-xs">Treasury</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  enterprise.activity === 'High' ? 'bg-emerald-500' :
                  enterprise.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
                <span className="font-bold text-xs text-yellow-600 dark:text-yellow-400">{enterprise.activity}</span>
              </div>
              <div className="text-muted-foreground text-xs">Activity</div>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              onClick={() => onViewDetails?.('enterprise', enterprise.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDAOCard = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 border-border/50 bg-card/60 backdrop-blur-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border/50 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={
                dao.status === 'Verified' ? 'default' : 
                dao.status === 'New' ? 'secondary' : 'outline'
              }
              className="text-xs"
            >
              {dao.status}
            </Badge>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {dao.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{dao.category}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
          {dao.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {dao.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Members</span>
            <span className="font-medium">{dao.members}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Proposals</span>
            <span className="font-medium">{dao.proposals}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Treasury</span>
            <span className="font-medium">{dao.treasury}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Activity</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                dao.activity === 'High' ? 'bg-emerald-500' :
                dao.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              <span className="font-medium text-xs">{dao.activity}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Founded: {new Date(dao.founded).toLocaleDateString()}</span>
            <span>Last activity: {dao.lastActivity}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-border/50 bg-card/30 backdrop-blur-sm group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all"
            onClick={() => onViewDetails?.('community', dao.id)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDAOListItem = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 border-2 border-border/50 bg-card/60 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border/50 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {dao.name}
                </h3>
                <Badge 
                  variant={
                    dao.status === 'Verified' ? 'default' : 
                    dao.status === 'New' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {dao.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {dao.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {dao.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {dao.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-medium">{dao.members}</div>
              <div className="text-muted-foreground text-xs">Members</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{dao.proposals}</div>
              <div className="text-muted-foreground text-xs">Proposals</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{dao.treasury}</div>
              <div className="text-muted-foreground text-xs">Treasury</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <div className={`w-2 h-2 rounded-full ${
                  dao.activity === 'High' ? 'bg-emerald-500' :
                  dao.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
                <span className="font-medium text-xs">{dao.activity}</span>
              </div>
              <div className="text-muted-foreground text-xs">Activity</div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-border/50 bg-card/30 backdrop-blur-sm"
              onClick={() => onViewDetails?.('community', dao.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCrossDAOCard = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/30 to-blue-50/30 dark:from-orange-900/20 dark:to-blue-900/20 backdrop-blur-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-300/30 rounded-lg flex items-center justify-center text-lg overflow-hidden">
            {dao.logoType === 'image' ? (
              <img
                src={dao.logo}
                alt={`${dao.name} logo`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              dao.logo
            )}
          </div>
          <div className="flex items-center gap-2">
            {dao.verified ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Unverified
              </Badge>
            )}
            <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20 text-xs">
              <Globe className="h-3 w-3 mr-1" />
              External
            </Badge>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
              <a href={dao.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {dao.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{dao.category}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
          {dao.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {dao.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs border-orange-300/30 text-orange-700 dark:text-orange-300">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Members</span>
            <span className="font-medium text-orange-600 dark:text-orange-400">{dao.members.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Proposals</span>
            <span className="font-medium text-orange-600 dark:text-orange-400">{dao.proposals}</span>
          </div>
        </div>

        {(dao.tvl || dao.marketCap || dao.volume24h) && (
          <div className="bg-orange-50/50 dark:bg-orange-900/20 rounded-lg p-3 space-y-2">
            {dao.tvl && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  TVL:
                </span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{dao.tvl}</span>
              </div>
            )}
            {dao.marketCap && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Market Cap:
                </span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{dao.marketCap}</span>
              </div>
            )}
            {dao.volume24h && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  24h Volume:
                </span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{dao.volume24h}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-orange-200/30">
          <div className="flex items-center justify-between mb-2">
            <Button size="sm" variant="outline" asChild className="border-orange-300/30">
              <a href={dao.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-3 w-3 mr-1" />
                Website
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-300/30 bg-orange-50/30 dark:bg-orange-900/20 group-hover:bg-orange-100 dark:group-hover:bg-orange-800/30 group-hover:border-orange-400 transition-all"
              asChild
            >
              <a onClick={() => onViewCrossDAODetails?.(dao.id)}>
                View Details
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCrossDAOListItem = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/30 to-blue-50/30 dark:from-orange-900/20 dark:to-blue-900/20 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-300/30 rounded-lg flex items-center justify-center text-lg overflow-hidden">
              {dao.logoType === 'image' ? (
                <img
                  src={dao.logo}
                  alt={`${dao.name} logo`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                dao.logo
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {dao.name}
                </h3>
                {dao.verified ? (
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Unverified
                  </Badge>
                )}
                <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20 text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  External
                </Badge>
                <Badge variant="outline" className="text-xs border-orange-300/30 text-orange-700 dark:text-orange-300">
                  {dao.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {dao.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {dao.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-orange-300/30 text-orange-700 dark:text-orange-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-medium text-orange-600 dark:text-orange-400">{dao.members.toLocaleString()}</div>
              <div className="text-muted-foreground text-xs">Members</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-orange-600 dark:text-orange-400">{dao.proposals}</div>
              <div className="text-muted-foreground text-xs">Proposals</div>
            </div>
            {dao.tvl && (
              <div className="text-center">
                <div className="font-medium text-orange-600 dark:text-orange-400">{dao.tvl}</div>
                <div className="text-muted-foreground text-xs">TVL</div>
              </div>
            )}
            <Button 
              size="sm" 
              className="border-orange-300/30 bg-orange-50/30 dark:bg-orange-900/20"
              onClick={() => onViewCrossDAODetails?.(dao.id)}
            >
              View Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Statistics Cards Row - Single horizontal line */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-yellow-50/50 dark:from-orange-900/20 dark:to-yellow-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-orange-600">
              {totalEnterpriseMembers}
            </div>
            <div className="text-muted-foreground text-xs">Enterprise Members</div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-purple-600">
              {totalCommunityDAOs}
            </div>
            <div className="text-muted-foreground text-xs">Community DAOs</div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-blue-50/50 dark:from-orange-900/20 dark:to-blue-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-orange-600">
              {totalCrossDAOs}
            </div>
            <div className="text-muted-foreground text-xs">Cross DAOs</div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-teal-600">
              {totalMembers.toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">Total Members</div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-violet-200/50 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-900/20 dark:to-purple-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-violet-600">
              {totalVotes.toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">Total Votes</div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[180px] max-w-[220px] text-center border-2 border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-2xl font-bold mb-1 text-blue-600">
              ₳{totalTreasury.toFixed(1)}M
            </div>
            <div className="text-muted-foreground text-xs">Total Treasury</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-12">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search DAOs by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-background/50 border-border/50">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-background/50 border-border/50">
              <SelectValue placeholder="Most Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="members">Most Members</SelectItem>
              <SelectItem value="treasury">Highest Treasury</SelectItem>
              <SelectItem value="activity">Most Active</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="p-2"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="p-2"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Enterprise Members Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
              🏢 Enterprise Partners
            </h2>
            <p className="text-muted-foreground">Leading global organizations driving blockchain adoption</p>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1">
            Fortune 500 Members
          </Badge>
        </div>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {enterpriseMembers.map(renderEnterpriseCard)}
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {enterpriseMembers.map(renderEnterpriseListItem)}
          </div>
        )}
      </div>

      {/* Community DAOs Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              🏛️ Community DAOs
            </h2>
            <p className="text-muted-foreground">Decentralized autonomous organizations on Cardano</p>
          </div>
          <Button 
            onClick={onCreateDAO}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New DAO
          </Button>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedDAOs.map(renderDAOCard)}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDAOs.map(renderDAOListItem)}
          </div>
        )}
        {/* Cross DAO Hub Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              Cross DAO Hub
              <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600">
                {totalCrossDAOs} external DAOs
              </Badge>
            </h3>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
              <Globe className="h-3 w-3 mr-1" />
              External Ecosystem
            </Badge>
          </div>

          {/* Information Banner */}
          <Card className="p-4 bg-gradient-to-r from-orange-500/5 to-blue-500/5 border-orange-500/20">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                  Cross DAO Hub
                </h4>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Discover and connect with established DAOs from across the Cardano ecosystem. 
                  These organizations operate independently and are showcased here for community reference.
                </p>
              </div>
            </div>
          </Card>

          {/* Cross DAO Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {crossDAOs.map(dao => renderCrossDAOCard(dao))}
            </div>
          ) : (
            <div className="space-y-4">
              {crossDAOs.map(dao => renderCrossDAOListItem(dao))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


