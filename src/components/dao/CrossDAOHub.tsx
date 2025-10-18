import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ExternalLink,
  Users,
  Trophy,
  TrendingUp,
  Search,
  Filter,
  Globe,
  Twitter,
  MessageCircle,
  Star,
  Building2,
  Zap,
  Droplets,
  Coffee,
  Gamepad2,
  Heart,
  Code,
  Wallet,
  BarChart3,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Import DAO logos
import vietCardanoLogo from '../../assets/f9fb9d7e6a371661d7790f3c05ed29936615536c.png';
import vtechcomLogo from '../../assets/19e3ee003cfb6111a0a470c6e8c25bdf3d23526d.png';
import minswapLogo from '../../assets/b35d195e88328064b81dc903951535013af0e3b1.png';

interface CrossDAOHubProps {
  onNavigateHome?: () => void;
  onNavigateToDashboard?: () => void;
  onViewCrossDAODetails?: (daoId: string) => void;
}

interface ExternalDAO {
  id: string;
  name: string;
  description: string;
  category:
    | "defi"
    | "nft"
    | "gaming"
    | "infrastructure"
    | "community"
    | "development";
  members: number;
  proposals: number;
  tvl?: string;
  website: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  status: "active" | "upcoming" | "paused";
  logo: string;
  logoType?: "image" | "text";
  verified: boolean;
  tags: string[];
  marketCap?: string;
  volume24h?: string;
  tokenSymbol?: string;
  founded?: string;
  governance?: string;
  displayOrder: number; // Add display order property
}

export function CrossDAOHub({
  onNavigateHome,
  onNavigateToDashboard,
  onViewCrossDAODetails,
}: CrossDAOHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("order"); // Default to custom order

  // Reordered DAOs according to specifications: VietCardanoCommunity, Vtechcom, Minswap, Snek, etc.
  const externalDAOs: ExternalDAO[] = [
    {
      id: "viet-cardano-community",
      name: "VietCardanoCommunity",
      description:
        "Vietnamese Cardano community focused on education, development, and promoting Cardano adoption in Vietnam and Southeast Asia.",
      category: "community",
      members: 8920,
      proposals: 6,
      website: "https://vietcardano.org",
      twitter: "https://twitter.com/VietCardano",
      discord: "https://discord.gg/vietcardano",
      telegram: "https://t.me/vietcardano",
      status: "active",
      logo: vietCardanoLogo,
      logoType: "image",
      verified: true,
      tags: ["Education", "Community", "Vietnam", "Adoption"],
      founded: "2021-08-20",
      governance: "Community consensus",
      displayOrder: 1,
    },
    {
      id: "vtechcom",
      name: "Vtechcom DAO",
      description:
        "Vietnamese technology company building innovative solutions on Cardano blockchain for enterprise adoption and development.",
      category: "development",
      members: 3450,
      proposals: 9,
      website: "https://vtechcom.org",
      twitter: "https://x.com/tony_thanh_",
      telegram: "https://t.me/vtechcom",
      status: "active",
      logo: vtechcomLogo,
      logoType: "image",
      verified: true,
      tags: [
        "Enterprise",
        "Development",
        "Technology",
        "Vietnam",
      ],
      founded: "2023-02-28",
      governance: "Corporate governance",
      displayOrder: 2,
    },
    {
      id: "minswap",
      name: "Minswap DAO",
      description:
        "The first multi-pool decentralized exchange on Cardano, enabling users to trade, swap, and provide liquidity with innovative AMM mechanics.",
      category: "defi",
      members: 15420,
      proposals: 12,
      tvl: "$45.2M",
      website: "https://minswap.org",
      twitter: "https://twitter.com/MinswapDEX",
      discord: "https://discord.gg/minswap",
      telegram: "https://t.me/minswap",
      status: "active",
      logo: minswapLogo,
      logoType: "image",
      verified: true,
      tags: ["DEX", "AMM", "Liquidity", "Trading"],
      marketCap: "$127.8M",
      volume24h: "$2.1M",
      tokenSymbol: "MIN",
      founded: "2022-03-01",
      governance: "Token-based voting",
      displayOrder: 3,
    },
    {
      id: "snek",
      name: "Snek DAO",
      description:
        "A community-driven meme token on Cardano focused on building utility and fostering community engagement through innovative mechanisms.",
      category: "community",
      members: 24680,
      proposals: 4,
      website: "https://snek.fi",
      twitter: "https://twitter.com/snektoken",
      discord: "https://discord.gg/snek",
      telegram: "https://t.me/snektoken",
      status: "active",
      logo: "🐍",
      logoType: "text",
      verified: true,
      tags: ["Meme", "Community", "SNEK", "+1"],
      marketCap: "$18.7M",
      volume24h: "$245K",
      tokenSymbol: "SNEK",
      founded: "2023-05-15",
      governance: "Community-driven",
      displayOrder: 4,
    },
    {
      id: "jpeg-store",
      name: "JPEG Store DAO",
      description:
        "The largest NFT marketplace on Cardano, empowering creators and collectors in the NFT ecosystem with advanced trading features.",
      category: "nft",
      members: 22100,
      proposals: 7,
      website: "https://jpgstore.io",
      twitter: "https://twitter.com/JPG_Store",
      discord: "https://discord.gg/jpgstore",
      telegram: "https://t.me/jpgstore",
      status: "active",
      logo: "J",
      logoType: "text",
      verified: false,
      tags: ["NFT", "Marketplace", "Art", "+1"],
      volume24h: "$1.8M",
      tokenSymbol: "JPEG",
      founded: "2021-10-05",
      governance: "Marketplace governance",
      displayOrder: 5,
    },
    {
      id: "sundaeswap",
      name: "SundaeSwap DAO",
      description:
        "A native, scalable decentralized exchange built on Cardano with innovative yield farming mechanisms and community governance.",
      category: "defi",
      members: 18750,
      proposals: 8,
      tvl: "$32.8M",
      website: "https://sundaeswap.finance",
      twitter: "https://twitter.com/SundaeSwap",
      discord: "https://discord.gg/sundaeswap",
      telegram: "https://t.me/sundaeswap",
      status: "active",
      logo: "🍨",
      logoType: "text",
      verified: true,
      tags: ["DEX", "Yield Farming", "SUNDAE", "AMM"],
      marketCap: "$89.3M",
      volume24h: "$1.4M",
      tokenSymbol: "SUNDAE",
      founded: "2021-12-15",
      governance: "Community voting",
      displayOrder: 6,
    },
    {
      id: "liqwid",
      name: "Liqwid DAO",
      description:
        "An algorithmic and non-custodial interest rate protocol built for lenders, borrowers, and developers on Cardano.",
      category: "defi",
      members: 12350,
      proposals: 15,
      tvl: "$28.5M",
      website: "https://liqwid.finance",
      twitter: "https://twitter.com/liqwidfinance",
      discord: "https://discord.gg/liqwid",
      telegram: "https://t.me/liqwidfinance",
      status: "active",
      logo: "L",
      logoType: "text",
      verified: true,
      tags: ["Lending", "Borrowing", "Interest Rates", "LQ"],
      marketCap: "$67.2M",
      volume24h: "$890K",
      tokenSymbol: "LQ",
      founded: "2022-01-10",
      governance: "Delegated voting",
      displayOrder: 7,
    },
    {
      id: "cornucopias",
      name: "Cornucopias DAO",
      description:
        "A blockchain-based game where players can earn, trade, and create in a massive multiplayer online world built on Cardano.",
      category: "gaming",
      members: 16780,
      proposals: 5,
      website: "https://cornucopias.io",
      twitter: "https://twitter.com/CornucopiasGame",
      discord: "https://discord.gg/cornucopias",
      telegram: "https://t.me/cornucopias",
      status: "active",
      logo: "C",
      logoType: "text",
      verified: false,
      tags: ["Gaming", "Metaverse", "Play-to-Earn", "COPI"],
      marketCap: "$24.1M",
      tokenSymbol: "COPI",
      founded: "2021-06-12",
      governance: "Gaming DAO",
      displayOrder: 8,
    },
    {
      id: "world-mobile",
      name: "World Mobile DAO",
      description:
        "Connecting the unconnected through a decentralized mobile network built on Cardano blockchain infrastructure.",
      category: "infrastructure",
      members: 11240,
      proposals: 11,
      website: "https://worldmobile.io",
      twitter: "https://twitter.com/WorldMobileTeam",
      discord: "https://discord.gg/worldmobile",
      telegram: "https://t.me/worldmobile",
      status: "active",
      logo: "WM",
      logoType: "text",
      verified: false,
      tags: [
        "Telecom",
        "Infrastructure",
        "Mobile",
        "Connectivity",
      ],
      marketCap: "$156.8M",
      tokenSymbol: "WMT",
      founded: "2020-11-30",
      governance: "Network governance",
      displayOrder: 9,
    },
    {
      id: "charli3",
      name: "Charli3 DAO",
      description:
        "Decentralized oracle network providing secure and reliable data feeds for Cardano smart contracts and DeFi protocols.",
      category: "infrastructure",
      members: 7890,
      proposals: 18,
      website: "https://charli3.io",
      twitter: "https://twitter.com/Charli3_io",
      discord: "https://discord.gg/charli3",
      telegram: "https://t.me/charli3oracle",
      status: "active",
      logo: "C3",
      logoType: "text",
      verified: false,
      tags: ["Oracle", "Data", "Infrastructure", "DeFi"],
      marketCap: "$45.3M",
      tokenSymbol: "C3",
      founded: "2021-04-22",
      governance: "Oracle governance",
      displayOrder: 10,
    },
    {
      id: "adahandle",
      name: "ADAHandle DAO",
      description:
        "Personalized wallet addresses for Cardano, making crypto transactions as simple as sending to a username.",
      category: "infrastructure",
      members: 9650,
      proposals: 3,
      website: "https://adahandle.com",
      twitter: "https://twitter.com/adahandle",
      discord: "https://discord.gg/adahandle",
      telegram: "https://t.me/adahandle",
      status: "active",
      logo: "@",
      logoType: "text",
      verified: false,
      tags: ["Identity", "Handles", "UX", "Addresses"],
      volume24h: "$125K",
      founded: "2021-11-18",
      governance: "Handle governance",
      displayOrder: 11,
    },
    {
      id: "book-io",
      name: "Book.io DAO",
      description:
        "Revolutionizing the book industry through NFT books and decentralized publishing on Cardano blockchain.",
      category: "nft",
      members: 5420,
      proposals: 8,
      website: "https://book.io",
      twitter: "https://twitter.com/BookToken",
      discord: "https://discord.gg/bookio",
      telegram: "https://t.me/booktoken",
      status: "active",
      logo: "📚",
      logoType: "text",
      verified: false,
      tags: ["Books", "Publishing", "NFT", "Education"],
      marketCap: "$8.9M",
      tokenSymbol: "BOOK",
      founded: "2022-07-14",
      governance: "Publishing DAO",
      displayOrder: 12,
    },
  ];

  const categoryIcons = {
    defi: TrendingUp,
    nft: Star,
    gaming: Gamepad2,
    infrastructure: Building2,
    community: Heart,
    development: Code,
  };

  const getCategoryIcon = (category: string) => {
    const Icon =
      categoryIcons[category as keyof typeof categoryIcons] ||
      Building2;
    return Icon;
  };

  // Memoized filtering and sorting
  const filteredAndSortedDAOs = useMemo(() => {
    let filtered = externalDAOs.filter((dao) => {
      const matchesSearch =
        dao.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        dao.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        dao.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "all" ||
        dao.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "order":
          return a.displayOrder - b.displayOrder; // Custom display order
        case "members":
          return b.members - a.members;
        case "proposals":
          return b.proposals - a.proposals;
        case "name":
          return a.name.localeCompare(b.name);
        case "founded":
          return (
            new Date(b.founded || "").getTime() -
            new Date(a.founded || "").getTime()
          );
        default:
          return a.displayOrder - b.displayOrder;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  const categories = [
    { id: "all", name: "All DAOs", count: externalDAOs.length },
    {
      id: "defi",
      name: "DeFi",
      count: externalDAOs.filter((d) => d.category === "defi")
        .length,
    },
    {
      id: "nft",
      name: "NFT",
      count: externalDAOs.filter((d) => d.category === "nft")
        .length,
    },
    {
      id: "gaming",
      name: "Gaming",
      count: externalDAOs.filter((d) => d.category === "gaming")
        .length,
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      count: externalDAOs.filter(
        (d) => d.category === "infrastructure",
      ).length,
    },
    {
      id: "community",
      name: "Community",
      count: externalDAOs.filter(
        (d) => d.category === "community",
      ).length,
    },
    {
      id: "development",
      name: "Development",
      count: externalDAOs.filter(
        (d) => d.category === "development",
      ).length,
    },
  ];

  const DAOCard = ({ dao }: { dao: ExternalDAO }) => {
    const CategoryIcon = getCategoryIcon(dao.category);

    return (
      <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                  {dao.logo}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">
                    {dao.name}
                  </CardTitle>
                  {dao.verified ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-600 border-green-500/20"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-orange-500/10 text-orange-600 border-orange-500/20"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {dao.category}
                  </span>
                  <Badge
                    variant={
                      dao.status === "active"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {dao.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {dao.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {dao.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {dao.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{dao.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {dao.members.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Members
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {dao.proposals}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Proposals
              </p>
            </div>
          </div>

          {(dao.tvl || dao.marketCap || dao.volume24h) && (
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              {dao.tvl && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Wallet className="h-3 w-3" />
                    TVL:
                  </span>
                  <span className="font-medium">{dao.tvl}</span>
                </div>
              )}
              {dao.marketCap && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Market Cap:
                  </span>
                  <span className="font-medium">
                    {dao.marketCap}
                  </span>
                </div>
              )}
              {dao.volume24h && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    24h Volume:
                  </span>
                  <span className="font-medium">
                    {dao.volume24h}
                  </span>
                </div>
              )}
            </div>
          )}

          {dao.founded && (
            <div className="text-xs text-muted-foreground">
              Founded:{" "}
              {new Date(dao.founded).toLocaleDateString()}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Button size="sm" variant="outline" asChild>
                <a
                  href={dao.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Visit Website
                </a>
              </Button>
              {dao.twitter && (
                <Button size="sm" variant="ghost" asChild>
                  <a
                    href={dao.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-3 w-3" />
                  </a>
                </Button>
              )}
              {dao.discord && (
                <Button size="sm" variant="ghost" asChild>
                  <a
                    href={dao.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => onViewCrossDAODetails?.(dao.id)}
            >
              View Details
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Cross DAO Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover and connect with DAOs across the Cardano
            ecosystem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-600"
          >
            {externalDAOs.length} DAOs Listed
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-600"
          >
            External Sources
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search DAOs by name, description, or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">
                Sort by Order
              </SelectItem>
              <SelectItem value="members">
                Sort by Members
              </SelectItem>
              <SelectItem value="proposals">
                Sort by Proposals
              </SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="founded">
                Sort by Founded
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs"
            >
              {category.name}
              <Badge
                variant="secondary"
                className="ml-1 text-xs"
              >
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value={selectedCategory}
          className="space-y-6"
        >
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {filteredAndSortedDAOs.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Active DAOs
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {filteredAndSortedDAOs
                      .reduce(
                        (sum, dao) => sum + dao.members,
                        0,
                      )
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Members
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {filteredAndSortedDAOs.reduce(
                      (sum, dao) => sum + dao.proposals,
                      0,
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Proposals
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {
                      filteredAndSortedDAOs.filter(
                        (dao) => dao.verified,
                      ).length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Verified DAOs
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* DAO Grid */}
          {filteredAndSortedDAOs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedDAOs.map((dao) => (
                <DAOCard key={dao.id} dao={dao} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No DAOs Found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or explore
                different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSortBy("order");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Information Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-600/5 border-primary/20">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">
              Cross DAO Hub Information
            </h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Cross DAO Hub showcases external DAOs from across
            the Cardano ecosystem. Data is aggregated from
            public sources and community submissions.
            Information may not reflect real-time data.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button variant="outline" size="sm">
              Submit Your DAO
            </Button>
            <Button variant="outline" size="sm">
              Report Issue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Export the DAO data for use in other components with updated ordering
export const crossDAOData = [
  {
    id: "viet-cardano-community",
    name: "VietCardanoCommunity",
    description:
      "Vietnamese Cardano community focused on education, development, and promoting Cardano adoption.",
    category: "Community",
    members: 8920,
    proposals: 6,
    website: "https://vietcardano.org",
    verified: true,
    logo: "V",
    tags: ["Education", "Community", "Vietnam"],
  },
  {
    id: "vtechcom",
    name: "Vtechcom DAO",
    description:
      "Vietnamese technology company building innovative solutions on Cardano blockchain.",
    category: "Development",
    members: 3450,
    proposals: 9,
    website: "https://vtechcom.vn",
    verified: false,
    logo: "VT",
    tags: ["Enterprise", "Development", "Technology"],
  },
  {
    id: "minswap",
    name: "Minswap DAO",
    description:
      "The first multi-pool decentralized exchange on Cardano, enabling users to trade, swap, and provide liquidity.",
    category: "DeFi",
    members: 15420,
    proposals: 12,
    tvl: "$45.2M",
    website: "https://minswap.org",
    verified: true,
    logo: "M",
    tags: ["DEX", "AMM", "Liquidity", "Trading"],
  },
  {
    id: "snek",
    name: "Snek DAO",
    description:
      "A community-driven meme token on Cardano focused on building utility and fostering community engagement.",
    category: "Community",
    members: 24680,
    proposals: 4,
    marketCap: "$18.7M",
    website: "https://snek.fi",
    verified: true,
    logo: "🐍",
    tags: ["Meme", "Community", "Utility"],
  },
  {
    id: "jpeg-store",
    name: "JPEG Store DAO",
    description:
      "The largest NFT marketplace on Cardano, empowering creators and collectors in the NFT ecosystem.",
    category: "NFT",
    members: 22100,
    proposals: 7,
    volume24h: "$1.8M",
    website: "https://jpgstore.io",
    verified: true,
    logo: "J",
    tags: ["NFT", "Marketplace", "Art"],
  },
  {
    id: "sundaeswap",
    name: "SundaeSwap DAO",
    description:
      "A native, scalable decentralized exchange built on Cardano with innovative yield farming mechanisms.",
    category: "DeFi",
    members: 18750,
    proposals: 8,
    tvl: "$32.8M",
    website: "https://sundaeswap.finance",
    verified: true,
    logo: "🍨",
    tags: ["DEX", "Yield Farming", "AMM"],
  },
];

