import { useState } from 'react';
import { Bell, Plus, Search, Wallet, Sun, Moon, ChevronDown, FileText, Users, Globe, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
import d4eLogo from '../../assets/320f2a6e3c5e0ed6818301bbeb20e51c9cf971b9.png';

interface UniversalHeaderProps {
  onNavigateHome?: () => void;
  onCreateProposal?: () => void;
  onCreateDAO?: () => void;
  onNavigateToMembers?: () => void;
  onToggleMobileSidebar?: () => void;
  showMobileMenuButton?: boolean;
}

export function UniversalHeader({ onNavigateHome, onCreateProposal, onCreateDAO, onNavigateToMembers, onToggleMobileSidebar, showMobileMenuButton = false }: UniversalHeaderProps = {}) {
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

  return (
    <>
      {/* Universal Header */}
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left Section: Mobile Menu, DAO Logo, Name, and Treasury */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {showMobileMenuButton && (
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={onToggleMobileSidebar}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onNavigateHome}
            >
              {/* D4E Logo */}
              <img 
                src={d4eLogo} 
                alt="D4E Logo" 
                className="w-12 h-12 object-contain"
              />
              
              {/* D4E Name and Tagline */}
              <div>
                <h1 className="font-semibold text-foreground">D4E</h1>
                <div className="text-xs text-muted-foreground">
                  From Blockchain to Boardroom — Cardano Governance for the Real World
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Search, Actions, and Controls */}
          <div className="flex items-center gap-3">


            {/* Search Bar - Hidden on mobile */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search proposals, members..."
                className="w-80 pl-10 bg-muted/50 border-border/50 focus:bg-background focus:border-border"
              />
            </div>
            
            {/* Mobile search button */}
            <Button variant="outline" size="icon" className="lg:hidden">
              <Search className="h-4 w-4" />
            </Button>
            
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
            
            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
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
            
            {/* Create Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border-0"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Create</span>
                  <span className="sm:hidden">+</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => {
                    console.log('Creating proposal...');
                    onCreateProposal?.();
                  }} 
                  className="gap-2 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  Create Proposal
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    console.log('Creating DAO...');
                    onCreateDAO?.();
                  }} 
                  className="gap-2 cursor-pointer"
                >
                  <Users className="h-4 w-4" />
                  Create DAO
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

