import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
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
  ExternalLink
} from 'lucide-react';

export function DashboardMembers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('members');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock DAO data - same as in Members component
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
    { value: 'environmental', label: 'Environmental' }
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

  const renderDAOCard = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border rounded-lg flex items-center justify-center">
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

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Founded: {new Date(dao.founded).toLocaleDateString()}</span>
            <span>Last activity: {dao.lastActivity}</span>
          </div>
          <Button variant="outline" size="sm" className="w-full border-border bg-background/50 hover:bg-background transition-all">
            View DAO Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDAOListItem = (dao: any) => (
    <Card key={dao.id} className="group hover:bg-card/80 transition-all duration-300 border border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border rounded-lg flex items-center justify-center">
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
            <Button variant="outline" size="sm" className="border-border bg-background/50">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">DAO Members</h2>
          <p className="text-muted-foreground">Manage and explore all DAOs in the ecosystem</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2 text-primary">
              {allDAOs.length}
            </div>
            <div className="text-muted-foreground text-sm">Total DAOs</div>
          </CardContent>
        </Card>
        <Card className="border border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2 text-primary">
              {allDAOs.reduce((sum, dao) => sum + dao.membersCount, 0).toLocaleString()}
            </div>
            <div className="text-muted-foreground text-sm">Total Members</div>
          </CardContent>
        </Card>
        <Card className="border border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2 text-primary">
              {allDAOs.reduce((sum, dao) => sum + dao.votesCount, 0).toLocaleString()}
            </div>
            <div className="text-muted-foreground text-sm">Total Votes</div>
          </CardContent>
        </Card>
        <Card className="border border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold mb-2 text-primary">
              ₳{(allDAOs.reduce((sum, dao) => sum + dao.treasuryValue, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-muted-foreground text-sm">Total Treasury</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search DAOs by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
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
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
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
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {sortedDAOs.length} of {allDAOs.length} DAOs
          {searchQuery && (
            <span> for "{searchQuery}"</span>
          )}
          {categoryFilter !== 'all' && (
            <span> in {categories.find(c => c.value === categoryFilter)?.label}</span>
          )}
        </div>
      </div>

      {/* DAO List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDAOs.map(renderDAOCard)}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDAOs.map(renderDAOListItem)}
        </div>
      )}

      {/* Empty State */}
      {sortedDAOs.length === 0 && (
        <Card className="border-2 border-dashed border-border bg-card">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No DAOs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all categories.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
