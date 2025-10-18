import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Search, TrendingUp, TrendingDown, RefreshCw, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface TokenData {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  priceUsd: number;
  change24h: number;
  logo?: string;
  color: string;
}

export function Assets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideSmallBalances, setHideSmallBalances] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock token data
  const tokens: TokenData[] = [
    {
      symbol: 'ADA',
      name: 'Cardano',
      balance: 2847.392,
      priceUsd: 0.45,
      usdValue: 1281.33,
      change24h: 5.2,
      logo: '₳',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      symbol: 'MIN',
      name: 'Minswap',
      balance: 15420.58,
      priceUsd: 0.012,
      usdValue: 185.05,
      change24h: -2.8,
      logo: '🔄',
      color: 'from-green-500 to-emerald-500'
    },
    {
      symbol: 'LQ',
      name: 'Liqwid Finance',
      balance: 892.44,
      priceUsd: 0.089,
      usdValue: 79.43,
      change24h: 12.4,
      logo: '💧',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      symbol: 'SUNDAE',
      name: 'SundaeSwap',
      balance: 3241.12,
      priceUsd: 0.0045,
      usdValue: 14.58,
      change24h: -7.2,
      logo: '🍨',
      color: 'from-pink-500 to-rose-500'
    },
    {
      symbol: 'NIGHT',
      name: 'Midnight',
      balance: 1500.0,
      priceUsd: 0.032,
      usdValue: 48.0,
      change24h: 18.7,
      logo: '🌃',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const totalPortfolioValue = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.name.toLowerCase().includes(searchQuery.toLowerCase());
    const meetsMinBalance = !hideSmallBalances || token.usdValue >= 10;
    return matchesSearch && meetsMinBalance;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const formatBalance = (balance: number, symbol: string) => {
    if (symbol === 'ADA') {
      return balance.toLocaleString(undefined, { 
        minimumFractionDigits: 3, 
        maximumFractionDigits: 3 
      });
    }
    return balance.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatUsd = (value: number) => {
    return value.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Assets</h1>
          <p className="text-muted-foreground">Manage your Cardano token portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHideSmallBalances(!hideSmallBalances)}
            className="gap-2"
          >
            {hideSmallBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {hideSmallBalances ? 'Show All' : 'Hide Small'}
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Portfolio Value
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.4%
            </Badge>
          </CardTitle>
          <CardDescription>Total value of all assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {formatUsd(totalPortfolioValue)}
          </div>
          <div className="text-sm text-muted-foreground">
            {tokens.find(t => t.symbol === 'ADA')?.balance.toFixed(3)} ADA ≈ {formatUsd(tokens.find(t => t.symbol === 'ADA')?.usdValue || 0)}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Token List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Tokens ({filteredTokens.length})</h2>
          <Button variant="link" size="sm" className="gap-1">
            View on Explorer
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>

        <div className="grid gap-3">
          {filteredTokens.map((token) => (
            <Card 
              key={token.symbol} 
              className="transition-all duration-200 hover:bg-muted/50 hover:scale-[1.02] cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  {/* Token Info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${token.color} rounded-xl flex items-center justify-center text-xl shadow-lg`}>
                      {token.logo || (
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs font-medium">{token.symbol.slice(0, 2)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{token.symbol}</h3>
                        <Badge 
                          variant={token.change24h >= 0 ? "secondary" : "destructive"} 
                          className="gap-1 text-xs"
                        >
                          {token.change24h >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(token.change24h).toFixed(1)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatUsd(token.priceUsd)} per token
                      </p>
                    </div>
                  </div>

                  {/* Balance Info */}
                  <div className="text-right">
                    <div className="font-semibold">
                      {token.symbol === 'ADA' ? '₳ ' : ''}{formatBalance(token.balance, token.symbol)}
                      {token.symbol !== 'ADA' && <span className="text-sm font-normal text-muted-foreground ml-1">{token.symbol}</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatUsd(token.usdValue)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((token.usdValue / totalPortfolioValue) * 100).toFixed(1)}% of portfolio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                {searchQuery ? `No tokens found matching "${searchQuery}"` : 'No tokens to display'}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-muted-foreground">
          <span>Prices updated every 30 seconds</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
