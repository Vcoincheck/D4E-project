import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  Coins, 
  Wallet, 
  Shield, 
  ShieldCheck, 
  Plus, 
  ArrowUpDown, 
  TrendingUp, 
  Users,
  Copy,
  ExternalLink,
  HelpCircle,
  Settings,
  ChevronDown,
  Eye
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';
import nightTokenLogo from './assets/f45b2fc73c3a8a5b34e9c23d1b875d47c63c77ca.png';
import vietCardanoLogo from './assets/f9fb9d7e6a371661d7790f3c05ed29936615536c.png';
import vtechcomLogo from './assets/19e3ee003cfb6111a0a470c6e8c25bdf3d23526d.png';

interface GovernanceProps {
  onMintToken?: () => void;
  onCreateMultiSig?: () => void;
  onViewDAO?: (daoName: string) => void;
  onViewTreasuryDetails?: (treasuryAddress: string) => void;
}

export function Governance({ onMintToken, onCreateMultiSig, onViewDAO, onViewTreasuryDetails }: GovernanceProps) {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showAllTokens, setShowAllTokens] = useState(false);
  const [showAllTreasuries, setShowAllTreasuries] = useState(false);
  const [showAllUserDAOs, setShowAllUserDAOs] = useState(false);

  const mockGovernanceTokens = [
    {
      name: 'CDAO',
      fullName: 'Cardano DAO Token',
      symbol: 'CDAO',
      totalSupply: '1,000,000',
      userBalance: '2,500',
      mintingEnabled: true,
      contractAddress: 'addr1q9...fx7k',
      decimals: 6,
      votingPower: '0.25%',
      avatar: null,
      ipfsUrl: 'ipfs://QmYx7f8g9h1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8',
      description: 'Cardano DAO governance token for community decisions'
    },
    {
      name: 'Samsung DAO',
      fullName: 'Samsung Innovation DAO',
      symbol: 'SAMS',
      totalSupply: '5,000,000',
      userBalance: '12,500',
      mintingEnabled: true,
      contractAddress: 'addr1qx5...8k2m',
      decimals: 6,
      votingPower: '0.25%',
      avatar: null,
      ipfsUrl: 'ipfs://QmAb2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
      description: 'Samsung enterprise blockchain governance token'
    },
    {
      name: 'Apple Ventures DAO',
      fullName: 'Apple Ventures Decentralized Fund',
      symbol: 'APPL',
      totalSupply: '2,500,000',
      userBalance: '8,750',
      mintingEnabled: false,
      contractAddress: 'addr1qr3...9n7p',
      decimals: 6,
      votingPower: '0.35%',
      avatar: null,
      ipfsUrl: 'ipfs://QmCd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
      description: 'Apple Ventures investment DAO governance token'
    }
  ];

  const mockTreasuryAddresses = [
    {
      address: 'addr1qxy2...9k4l',
      balance: '₳847,532',
      isMultiSig: true,
      signaturesRequired: 3,
      totalSigners: 5,
      transactions: 127,
      usdValue: '$847,532'
    },
    {
      address: 'addr1qab3...7x9m',
      balance: '₳1,234,567',
      isMultiSig: true,
      signaturesRequired: 2,
      totalSigners: 3,
      transactions: 89,
      usdValue: '$1,234,567'
    },
    {
      address: 'addr1qcd5...2k8n',
      balance: '₳456,789',
      isMultiSig: false,
      signaturesRequired: 1,
      totalSigners: 1,
      transactions: 203,
      usdValue: '$456,789'
    },
    {
      address: 'addr1qef7...5m4p',
      balance: '₳987,654',
      isMultiSig: true,
      signaturesRequired: 4,
      totalSigners: 7,
      transactions: 156,
      usdValue: '$987,654'
    },
    {
      address: 'addr1qgh9...8p2q',
      balance: '₳321,098',
      isMultiSig: true,
      signaturesRequired: 2,
      totalSigners: 4,
      transactions: 74,
      usdValue: '$321,098'
    },
    {
      address: 'addr1qij1...4r7s',
      balance: '₳654,321',
      isMultiSig: false,
      signaturesRequired: 1,
      totalSigners: 1,
      transactions: 312,
      usdValue: '$654,321'
    }
  ];

  const mockUserDAOs = [
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
      status: 'Active',
      activity: "High",
      treasury: "₳12.5M",
      treasuryValue: 12500000,
      founded: "2024-01-15",
      lastActivity: "45 minutes ago",
      tags: ["Fortune 500", "Technology", "Innovation"],
      logo: "🍎",
      created: '2023-04-08'
    },
    {
      name: 'VietCardanoCommunity',
      description: 'Vietnamese Cardano community focused on education, development, and promoting Cardano adoption.',
      category: 'Community',
      members: 8920,
      proposals: 6,
      website: 'https://vietcardano.org',
      verified: true,
      status: 'Active',
      logo: "V",
      tags: ['Education', 'Community', 'Vietnam'],
      created: '2021-09-30'
    },
    
    {
      name: "Samsung Electronics",
      category: "Technology",
      description: "Samsung's smart device and IoT governance platform utilizing Cardano's secure blockchain infrastructure for device authentication and data integrity.",
      members: "156K",
      membersCount: 156000,
      votes: "3.2K",
      votesCount: 3200,
      proposals: "112",
      status: 'Active',
      activity: "High",
      treasury: "₳15.6M",
      treasuryValue: 15600000,
      founded: "2023-09-10",
      lastActivity: "30 minutes ago",
      tags: ["Fortune 500", "IoT", "Electronics"],
      logo: "📱",
      created: '2024-02-03',
    },
    {
      name: 'Vtechcom',
      description: 'Technology innovation and development community focusing on blockchain solutions and digital transformation.',
      category: 'Technology',
      members: 5240,
      proposals: 4,
      website: 'https://vtechcom.org',
      verified: true,
      logo: "V",
      status: 'Active',
      tags: ['Technology', 'Innovation', 'Development'],
      created: '2024-02-03',
    }
    
  ];

  const mockAssets = [
    {
      name: 'ADA',
      symbol: 'ADA',
      balance: '25,847.32',
      value: '$12,423.66',
      change: '+2.4%',
      logo: '₳',
      logoType: 'text',
      changePositive: true
    },
    {
      name: 'CDAO Token',
      symbol: 'CDAO', 
      balance: '2,500.00',
      value: '$7,500.00',
      change: '+5.2%',
      logo: 'C',
      logoType: 'text',
      changePositive: true
    },
    {
      name: 'Night',
      symbol: 'NIGHT',
      balance: '1,000.00',
      value: '$1,000,000.00',
      change: '+15.8%',
      logo: nightTokenLogo,
      logoType: 'image',
      changePositive: true
    },
    {
      name: 'Mins',
      symbol: 'MINS',
      balance: '12,340.00',
      value: '$3,456.00',
      change: '+1.2%',
      logo: 'M',
      logoType: 'text',
      changePositive: true
    },
    {
      name: 'AAPL Token',
      symbol: 'AAPL',
      balance: '50.00',
      value: '$8,750.00',
      change: '-0.8%',
      logo: 'A',
      logoType: 'text',
      changePositive: false
    }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const displayedTokens = showAllTokens ? mockGovernanceTokens : mockGovernanceTokens.slice(0, 1);
  const displayedTreasuries = showAllTreasuries ? mockTreasuryAddresses : mockTreasuryAddresses.slice(0, 1);
  const displayedUserDAOs = showAllUserDAOs ? mockUserDAOs : mockUserDAOs.slice(0, 2);

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('nav.governance')}</h2>
            <p className="text-muted-foreground">
              Manage your DAO governance tokens, treasury, and assets
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={onMintToken} className="gap-2">
              <Coins className="h-4 w-4" />
              Mint Governance Token
            </Button>
            <Button onClick={onCreateMultiSig} variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Create Multi-Sig
            </Button>
          </div>
        </div>

        {/* Your DAOs Section */}
        <Card className="border-2 border-purple-200/50 dark:border-purple-800/50 bg-card/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Your DAOs
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              DAOs you have created and manage
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedUserDAOs.map((dao, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      {dao.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{dao.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dao.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-muted-foreground">Members</span>
                          <div className="font-medium">{dao.members.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Treasury</span>
                          <div className="font-medium">{dao.treasury}</div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Proposals</span>
                          <div className="font-medium">{dao.proposals}</div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Status</span>
                          <Badge variant="default" className="text-xs">{dao.status}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Created: {new Date(dao.created).toLocaleDateString()}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => onViewDAO && onViewDAO(dao.name)}
                        >
                          <Eye className="h-3 w-3" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show More Button for User DAOs */}
            {mockUserDAOs.length > 2 && (
              <div className="flex justify-center pt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllUserDAOs(!showAllUserDAOs)}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  {showAllUserDAOs ? 'Show Less' : `Show More (${mockUserDAOs.length - 2} more)`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllUserDAOs ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Governance Token Board */}
        <Card className="border-2 border-blue-200/50 dark:border-blue-800/50 bg-card/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-blue-600" />
              Governance Token Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {displayedTokens.map((token, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Token Name</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The official name of your DAO governance token</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      {token.avatar ? (
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border">
                          <img
                            src={typeof token.avatar === 'string' ? token.avatar : URL.createObjectURL(token.avatar)}
                            alt={`${token.name} avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {token.symbol.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{token.name}</div>
                        <div className="text-xs text-muted-foreground">Symbol: {token.symbol}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Your Balance</span>
                    </div>
                    <div className="font-semibold">{token.userBalance} {token.symbol}</div>
                    <div className="text-xs text-muted-foreground">Voting Power: {token.votingPower}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Total Supply</span>
                    <div className="font-semibold">{token.totalSupply} {token.symbol}</div>
                    <div className="text-xs text-muted-foreground">Decimals: {token.decimals}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={token.mintingEnabled ? 'default' : 'secondary'}>
                        {token.mintingEnabled ? 'Minting Enabled' : 'Minting Disabled'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Contract Active</div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Contract Address:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{token.contractAddress}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(token.contractAddress, `token-${index}`)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedAddress === `token-${index}` ? (
                        <span className="text-xs text-green-600">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => onViewDAO && onViewDAO(token.name)}
                    >
                      <Eye className="h-3 w-3" />
                      View DAO
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View on Explorer
                    </Button>
                  </div>
                </div>
                
                {index < displayedTokens.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
            
            {/* Show More Button */}
            {mockGovernanceTokens.length > 1 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllTokens(!showAllTokens)}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  {showAllTokens ? 'Show Less' : `Show More (${mockGovernanceTokens.length - 1} more)`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllTokens ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Treasury Address Board - With Multiple Addresses */}
        <Card className="border-2 border-green-200/50 dark:border-green-800/50 bg-card/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-600" />
              Treasury Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {displayedTreasuries.map((treasury, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Address - First Column */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The treasury wallet address for this DAO</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="font-semibold text-sm break-all">{treasury.address}</div>
                    <div className="text-xs text-muted-foreground">Cardano Mainnet</div>
                  </div>
                  
                  {/* Balance - Second Column */}
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <div className="font-semibold text-lg">{treasury.balance}</div>
                    <div className="text-xs text-muted-foreground">~{treasury.usdValue} USD</div>
                  </div>
                  
                  {/* Transactions - Third Column */}
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Transactions</span>
                    <div className="font-semibold">{treasury.transactions}</div>
                    <div className="text-xs text-muted-foreground">Total executed</div>
                  </div>
                  
                  {/* Address Type - Fourth Column */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Address Type</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Multi-signature addresses require multiple approvals for transactions</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      {treasury.isMultiSig ? (
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <Shield className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-semibold">
                        {treasury.isMultiSig ? 'Multi-Signature' : 'Standard'}
                      </span>
                    </div>
                    {treasury.isMultiSig && (
                      <div className="text-xs text-muted-foreground">
                        {treasury.signaturesRequired} of {treasury.totalSigners} signatures required
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Treasury Address:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{treasury.address}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(treasury.address, `treasury-${index}`)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedAddress === `treasury-${index}` ? (
                        <span className="text-xs text-green-600">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => onViewTreasuryDetails && onViewTreasuryDetails(treasury.address)}
                    >
                      <Eye className="h-3 w-3" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      View on Explorer
                    </Button>
                  </div>
                </div>

                {index < displayedTreasuries.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
            
            {/* Show More Button for Treasury Addresses */}
            {mockTreasuryAddresses.length > 1 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllTreasuries(!showAllTreasuries)}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  {showAllTreasuries ? 'Show Less' : `Show More (${mockTreasuryAddresses.length - 1} more)`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllTreasuries ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assets Section (updated with Night token logo and balance) */}
        <Card className="bg-card/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              {t('nav.assets')}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your DAO's digital assets and token balances
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {mockAssets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                      {asset.logoType === 'image' ? (
                        <img
                          src={asset.logo as string}
                          alt={`${asset.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {asset.logo}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">{asset.balance}</div>
                    <div className="text-sm text-muted-foreground">{asset.value}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      asset.changePositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.change}
                    </div>
                    <div className="text-xs text-muted-foreground">24h</div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Transfer
                  </Button>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Total Portfolio Value</h3>
                <p className="text-2xl font-bold">$1,032,129.66</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +8.7% (24h)
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Asset
                </Button>
                <Button className="gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

