import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from '../ui/button';
import { useLanguage } from '../providers/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useTheme } from '../providers/ThemeProvider';
import { HomepageHeader } from './HomepageHeader';
import { Footer } from './Footer';
import d4eLogo from '../assets/f753e5490cdb829cbaf4e9d9d3ecff3c33045995.png';
import { 
  ArrowRight, 
  Vote, 
  Shield, 
  BarChart3, 
  Users, 
  Github, 
  Twitter, 
  FileText,
  Sun,
  Moon,
  Search,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface HomepageProps {
  onNavigateToDashboard: () => void;
  onCreateDAO?: () => void;
  onNavigateToMembers?: () => void;
  onNavigateToDocumentation?: () => void;
  onCreateProposal?: () => void;
  onViewDAODetails?: (type: 'enterprise' | 'community', id: string | number) => void;
}

export function Homepage({ onNavigateToDashboard, onCreateDAO, onNavigateToMembers, onNavigateToDocumentation, onCreateProposal, onViewDAODetails }: HomepageProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  // Debug handlers
  const handleNavigateToDashboard = () => {
    console.log('Navigate to dashboard clicked');
    onNavigateToDashboard();
  };

  const handleCreateDAO = () => {
    console.log('Create DAO clicked');
    if (onCreateDAO) onCreateDAO();
  };

  const handleNavigateToDocumentation = () => {
    console.log('Navigate to documentation clicked');
    if (onNavigateToDocumentation) onNavigateToDocumentation();
  };

  // Mock DAO data
  const topDAOs = [
    {
      name: "Cardano Foundation",
      category: "Governance",
      members: "12.4K",
      votes: "847",
      status: "Verified" as const,
      activity: "High",
      treasury: "₳847K",
      type: "community" as const,
      id: 1,
      logo: "C"
    },
    {
      name: "IOHK Research",
      category: "Development", 
      members: "8.2K",
      votes: "523",
      status: "Active" as const,
      activity: "Medium",
      treasury: "₳523K",
      type: "community" as const,
      id: 2,
      logo: "I"
    },
    {
      name: "Catalyst Community",
      category: "Innovation",
      members: "15.7K", 
      votes: "1.2K",
      status: "New" as const,
      activity: "High",
      treasury: "₳1.2M",
      type: "community" as const,
      id: 3,
      logo: "🚀"
    },
    {
      name: "Apple Inc.",
      category: "Technology",
      members: "125K",
      votes: "89",
      status: "Enterprise" as const,
      activity: "High",
      treasury: "₳12.5M",
      type: "enterprise" as const,
      id: "apple",
      logo: "🍎"
    },
    {
      name: "VCC Capital",
      category: "Finance",
      members: "42K",
      votes: "78",
      status: "Enterprise" as const,
      activity: "Medium",
      treasury: "₳4.2M",
      type: "enterprise" as const,
      id: "vcc",
      logo: "💼"
    },
    {
      name: "MinSwap Protocol",
      category: "DeFi",
      members: "9.1K",
      votes: "674",
      status: "Verified" as const,
      activity: "Medium",
      treasury: "₳674K",
      type: "community" as const,
      id: 5,
      logo: "💧"
    }
  ];

  const features = [
    {
      icon: Vote,
      title: "On-chain Voting",
      description: "Transparent governance with immutable on-chain voting mechanisms"
    },
    {
      icon: Shield,
      title: "Multi-sig Wallet",
      description: "Secure treasury management with multi-signature wallet integration"
    },
    {
      icon: Search,
      title: "DAO on-chain blueprint",
      description: "Storage and editable DAO info by CIP-68 NFT"
    },
    {
      icon: Users,
      title: "DAO Directory",
      description: "Discover and connect with DAOs across the Cardano ecosystem"
    }
  ];

  // Statistics chart data
  const monthlyGrowthData = [
    { month: 'Jan', daos: 45, members: 8200, proposals: 234 },
    { month: 'Feb', daos: 62, members: 11500, proposals: 341 },
    { month: 'Mar', daos: 89, members: 15800, proposals: 456 },
    { month: 'Apr', daos: 124, members: 22100, proposals: 623 },
    { month: 'May', daos: 167, members: 31200, proposals: 834 },
    { month: 'Jun', daos: 203, members: 38900, proposals: 1028 },
    { month: 'Jul', daos: 247, members: 48200, proposals: 1287 }
  ];

  const categoryDistribution = [
    { name: 'DeFi', value: 35, color: '#3b82f6' },
    { name: 'Governance', value: 28, color: '#10b981' },
    { name: 'Development', value: 18, color: '#f59e0b' },
    { name: 'Community', value: 12, color: '#ef4444' },
    { name: 'Other', value: 7, color: '#8b5cf6' }
  ];

  const treasuryData = [
    { day: 'Mon', value: 2100000 },
    { day: 'Tue', value: 2150000 },
    { day: 'Wed', value: 2300000 },
    { day: 'Thu', value: 2280000 },
    { day: 'Fri', value: 2400000 },
    { day: 'Sat', value: 2380000 },
    { day: 'Sun', value: 2420000 }
  ];

  return (
    <div className="min-h-screen">
      {/* Homepage Header */}
      <HomepageHeader
        onNavigateHome={() => {}} // Already on homepage
        onNavigateToApp={onNavigateToDashboard}
      />

      {/* Hero Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              DAO For Enterprise, For Everyone
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-blue-600 dark:text-blue-400 font-semibold">From Blockchain to Boardroom</span> —{' '}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">Cardano Governance for the Real World</span>
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-4 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                onClick={handleNavigateToDashboard} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 relative z-30 shadow-lg"
              >
                {t('homepage.get_started')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              {onCreateDAO && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleCreateDAO} 
                  className="border-purple-200 dark:border-purple-800 bg-card/60 backdrop-blur-sm relative z-30 shadow-lg"
                >
                  {t('action.create')} DAO
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Statistics Dashboard */}
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-2 border-border/50 bg-card/70 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Cardano DAO Ecosystem Analytics
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Real-time insights into the growing decentralized governance landscape
                  </p>
                </motion.div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Growth Chart */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-center text-lg">Monthly Growth Trends</h3>
                    <div className="h-80 w-full min-h-80">
                      <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                        <LineChart data={monthlyGrowthData}>
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
                          <Line 
                            type="monotone" 
                            dataKey="daos" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            name="DAOs"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="members" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            name="Members"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="proposals" 
                            stroke="#f59e0b" 
                            strokeWidth={3}
                            name="Proposals"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Category Distribution */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-center text-lg">DAO Categories</h3>
                    <div className="h-80 w-full min-h-80">
                      <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                        <PieChart>
                          <Pie
                            data={categoryDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {categoryDistribution.map((entry, index) => (
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
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>

                {/* Treasury Value Chart */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-center text-lg">Total Treasury Value (7 Days)</h3>
                  <div className="h-64 w-full min-h-64">
                    <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                      <AreaChart data={treasuryData}>
                        <defs>
                          <linearGradient id="treasuryGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                        <XAxis dataKey="day" stroke="currentColor" opacity={0.6} />
                        <YAxis 
                          stroke="currentColor" 
                          opacity={0.6}
                          tickFormatter={(value) => `₳${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--card-foreground))'
                          }}
                          formatter={(value: number) => [`₳${(value / 1000000).toFixed(2)}M`, 'Treasury Value']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8b5cf6" 
                          fill="url(#treasuryGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Platform Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and participate in decentralized governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center border-2 border-border/50 bg-card/70 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DAO Statistics Section - Redesigned */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Top DAOs on Cardano
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the most active and innovative DAOs in the ecosystem
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search DAOs..." className="pl-10 w-80 bg-card/70 backdrop-blur-sm border-border/50" />
              </div>
              <Button 
                variant="outline" 
                onClick={onNavigateToMembers}
                className="border-border/50 bg-card/60 backdrop-blur-sm relative z-20"
              >
                Explore All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {topDAOs.map((dao, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-border/50 bg-card/70 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${dao.status === 'Enterprise' ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/30' : 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-border/50'} rounded-lg flex items-center justify-center text-lg`}>
                      {dao.logo}
                    </div>
                    <Badge 
                      variant={
                        dao.status === 'Verified' ? 'default' : 
                        dao.status === 'New' ? 'secondary' : 
                        dao.status === 'Enterprise' ? 'default' : 'outline'
                      }
                      className={`text-xs ${dao.status === 'Enterprise' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' : ''}`}
                    >
                      {dao.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {dao.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{dao.category}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-medium">{dao.members}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Votes</span>
                    <span className="font-medium">{dao.votes}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Treasury</span>
                    <span className="font-medium">{dao.treasury}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Activity</span>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        dao.activity === 'High' ? 'bg-emerald-500' :
                        dao.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="font-medium">{dao.activity}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-border/50 bg-card/40 backdrop-blur-sm group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all"
                    onClick={() => onViewDAODetails && onViewDAODetails(dao.type, dao.id)}
                  >
                    View DAO
                  </Button>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-2 border-border/50 bg-card/70 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">247</div>
                <div className="text-muted-foreground">Active DAOs</div>
              </CardContent>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-2 border-border/50 bg-card/70 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">48.2K</div>
                <div className="text-muted-foreground">Total Members</div>
              </CardContent>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-2 border-border/50 bg-card/70 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">12.8K</div>
                <div className="text-muted-foreground">Proposals Voted</div>
              </CardContent>
            </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-2 border-border/50 bg-card/70 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">₳2.4M</div>
                <div className="text-muted-foreground">Treasury Value</div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onNavigateToDocumentation={onNavigateToDocumentation}
        onCreateDAO={onCreateDAO}
        onNavigateToDashboard={onNavigateToDashboard}
      />
    </div>
  );
}

