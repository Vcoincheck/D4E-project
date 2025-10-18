import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { 
  Home, FileText, Wallet, Users, Settings, Activity, Vote, 
  Bell, Search, Plus, Sun, Moon, TrendingUp, TrendingDown
} from 'lucide-react';

export function ThemeDemo() {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Cardano DAO Platform</h1>
        <p className="text-muted-foreground">Light & Dark Mode Showcase</p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Overview</h3>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Proposals</h3>
              <p className="text-sm text-muted-foreground">Governance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Treasury</h3>
              <p className="text-sm text-muted-foreground">2.8M ADA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Members</h3>
              <p className="text-sm text-muted-foreground">1,247 active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Elements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Interactive components showcase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Input</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search proposals..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button size="sm">Primary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark Mode</label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treasury Overview</CardTitle>
            <CardDescription>Financial metrics and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Value</span>
              <div className="text-right">
                <div className="font-bold">₳ 2,847,392</div>
                <div className="text-sm text-muted-foreground">$1,281,326 USD</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Funding Progress</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                +5.2%
              </Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingDown className="h-3 w-3" />
                -1.8%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token List Example */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Portfolio</CardTitle>
          <CardDescription>Your Cardano tokens and their values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { symbol: 'ADA', name: 'Cardano', balance: '2,847.39', value: '$1,281.33', change: '+5.2%', positive: true },
              { symbol: 'MIN', name: 'Minswap', balance: '15,420.58', value: '$185.05', change: '-2.8%', positive: false },
              { symbol: 'SUNDAE', name: 'SundaeSwap', balance: '3,241.12', value: '$14.58', change: '+12.4%', positive: true },
            ].map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{token.balance}</div>
                  <div className="text-sm text-muted-foreground">{token.value}</div>
                  <Badge variant={token.positive ? "secondary" : "destructive"} className="text-xs">
                    {token.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">12</div>
            <div className="text-sm text-green-700 dark:text-green-300">Active Proposals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">DAO Members</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">89%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Participation Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
