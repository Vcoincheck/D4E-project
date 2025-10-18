import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft,
  Search,
  BookOpen,
  Code,
  Users,
  Settings,
  ExternalLink,
  FileText,
  Video,
  Download,
  Star,
  Clock,
  ChevronRight
} from 'lucide-react';

interface DocumentationProps {
  onNavigateHome: () => void;
  onNavigateToDashboard: () => void;
}

export function Documentation({ onNavigateHome, onNavigateToDashboard }: DocumentationProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of DAO creation and management',
      articles: [
        { title: 'What is a DAO?', type: 'guide', duration: '5 min read', popular: true },
        { title: 'Creating your first DAO', type: 'tutorial', duration: '10 min read', popular: true },
        { title: 'Understanding Cardano governance', type: 'guide', duration: '8 min read' },
        { title: 'Setting up your wallet', type: 'tutorial', duration: '5 min read' }
      ]
    },
    {
      id: 'governance',
      title: 'Governance & Voting',
      icon: Users,
      description: 'Master the art of decentralized decision making',
      articles: [
        { title: 'Voting mechanisms explained', type: 'guide', duration: '7 min read', popular: true },
        { title: 'Creating effective proposals', type: 'tutorial', duration: '12 min read' },
        { title: 'Managing voting periods', type: 'guide', duration: '6 min read' },
        { title: 'Delegation and proxy voting', type: 'tutorial', duration: '9 min read' }
      ]
    },
    {
      id: 'treasury',
      title: 'Treasury Management',
      icon: Settings,
      description: 'Secure and manage your DAO\'s financial resources',
      articles: [
        { title: 'Multi-signature wallets', type: 'guide', duration: '8 min read' },
        { title: 'Treasury allocation strategies', type: 'guide', duration: '10 min read' },
        { title: 'Financial reporting', type: 'tutorial', duration: '7 min read' },
        { title: 'Budget management', type: 'guide', duration: '6 min read' }
      ]
    },
    {
      id: 'development',
      title: 'Developer Resources',
      icon: Code,
      description: 'Technical documentation and API references',
      articles: [
        { title: 'API Reference', type: 'api', duration: 'Reference' },
        { title: 'SDK Documentation', type: 'api', duration: 'Reference' },
        { title: 'Smart contract integration', type: 'tutorial', duration: '15 min read' },
        { title: 'Webhook integration', type: 'tutorial', duration: '12 min read' }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Video Tutorials', icon: Video, description: 'Watch step-by-step guides', href: '#' },
    { title: 'API Reference', icon: Code, description: 'Complete API documentation', href: '#' },
    { title: 'Community Forum', icon: Users, description: 'Get help from the community', href: '#' },
    { title: 'Release Notes', icon: FileText, description: 'Latest updates and changes', href: '#' }
  ];

  const popularArticles = [
    { title: 'Creating your first DAO', category: 'Getting Started', readTime: '10 min', views: '15.2K' },
    { title: 'Voting mechanisms explained', category: 'Governance', readTime: '7 min', views: '12.8K' },
    { title: 'Multi-signature wallets', category: 'Treasury', readTime: '8 min', views: '9.4K' },
    { title: 'What is a DAO?', category: 'Getting Started', readTime: '5 min', views: '8.7K' }
  ];

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-50 via-transparent to-cyan-50 dark:from-emerald-900/10 dark:via-transparent dark:to-cyan-900/10" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onNavigateHome} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Documentation
                </h1>
                <p className="text-sm text-muted-foreground">Learn everything about DAOs</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onNavigateToDashboard} className="border-border/50 bg-card/50 backdrop-blur-sm">
              Dashboard
            </Button>
            <Button variant="outline" className="border-border/50 bg-card/50 backdrop-blur-sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            DAO Hub Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to know about creating, managing, and participating in DAOs
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-card/60 backdrop-blur-sm border-border/50"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Card key={index} className="group hover:bg-card/80 transition-all duration-300 hover:scale-105 border-2 border-border/50 bg-card/60 backdrop-blur-md cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-border/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Documentation Sections */}
            <div className="space-y-8">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card key={section.id} className="border-2 border-border/50 bg-card/60 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-border/50 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.articles.map((article, index) => (
                          <div key={index} className="group flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/60 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {article.type === 'guide' && <BookOpen className="h-4 w-4 text-emerald-600" />}
                                {article.type === 'tutorial' && <Video className="h-4 w-4 text-blue-600" />}
                                {article.type === 'api' && <Code className="h-4 w-4 text-purple-600" />}
                                <span className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {article.title}
                                </span>
                              </div>
                              {article.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {article.duration}
                              <ChevronRight className="h-3 w-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div key={index} className="group p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/60 transition-colors cursor-pointer">
                    <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {article.views} views
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Get help from our community.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Community Forum
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Latest Updates */}
            <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg">Latest Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-1">v2.4.0 Released</div>
                  <div className="text-muted-foreground text-xs">
                    New proposal wizard and improved governance features
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">2 days ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-1">Multi-sig Enhancement</div>
                  <div className="text-muted-foreground text-xs">
                    Enhanced treasury management capabilities
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">1 week ago</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
