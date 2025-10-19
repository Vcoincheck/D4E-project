import { useState } from 'react';
import { Plus, Sun, Moon, ChevronDown, Wallet, Globe, TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { WalletConnectModal } from '../providers/WalletConnectModal';
import { useTheme } from '../providers/ThemeProvider';
import { useLanguage, type Language } from '../providers/LanguageProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import d4eLogo from '../../assets/projectlogo/D4E.png';

interface HomepageHeaderProps {
  onNavigateToApp?: () => void;
  onNavigateHome?: () => void;
}

export function HomepageHeader({ onNavigateToApp, onNavigateHome }: HomepageHeaderProps = {}) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Mock connected wallet state
  const mockConnectedWallet = connectedWallet || null;
  const mockWalletAddress = walletAddress || null;

  const handleWalletConnect = () => {
    setShowWalletModal(true);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const languages = [
    { code: 'en' as Language, name: t('language.english'), flag: '🇺🇸' },
    { code: 'vi' as Language, name: t('language.vietnamese'), flag: '🇻🇳' },
    { code: 'es' as Language, name: t('language.spanish'), flag: '🇪🇸' },
    { code: 'fr' as Language, name: t('language.french'), flag: '🇫🇷' },
    { code: 'ja' as Language, name: t('language.japanese'), flag: '🇯🇵' },
  ];

  // Platform activities data for horizontal scroll
  const platformActivities = [
    { icon: TrendingUp, text: "247 DAOs actively governing", color: "text-emerald-500" },
    { icon: Users, text: "48.2K members participating", color: "text-blue-500" },
    { icon: Activity, text: "1,287 proposals this month", color: "text-purple-500" },
    { icon: Calendar, text: "₳2.4M treasury value", color: "text-orange-500" },
    { icon: TrendingUp, text: "23% growth this quarter", color: "text-green-500" },
    { icon: Users, text: "New DAO every 2 hours", color: "text-cyan-500" },
  ];

  return (
    <>
      {/* Homepage Header */}
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left Section: DAO Logo, Name, and Treasury */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onNavigateHome}
            >
              {/* D4E Logo */}
              <img 
                src={d4eLogo} 
                alt="D4E Logo" 
                className="w-10 h-10 object-contain"
              />
              
              {/* D4E Name and Tagline */}
              <div>
                <h1 className="font-semibold text-foreground">D4E</h1>
                <div className="text-xs text-muted-foreground">
                  Cardano Governance for the real world
                </div>
              </div>
            </div>
          </div>

          {/* Center Section: Platform Activities Scroll */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8 overflow-hidden">
            <div className="flex items-center gap-8 animate-scroll">
              {[...platformActivities, ...platformActivities].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                    <span className="text-sm text-muted-foreground">{activity.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section: Actions and Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`gap-2 cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && <span className="ml-auto text-xs">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle Button */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              className="relative"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
            
            {/* Connect Wallet / Wallet Info */}
            {mockConnectedWallet && mockWalletAddress ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border/50 rounded-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{mockConnectedWallet}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatAddress(mockWalletAddress)}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Wallet className="h-4 w-4 text-green-500" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleWalletConnect}
                className="gap-2 bg-muted/50 border-border/50 hover:bg-background hover:border-border"
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            )}
            
            {/* Go to App Button */}
            <Button 
              onClick={onNavigateToApp}
              className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border-0"
            >
              <span className="hidden sm:inline">Go to App</span>
              <span className="sm:hidden">App</span>
            </Button>
          </div>
        </div>
      </div>

      <WalletConnectModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal}
      />
    </>
  );
}


