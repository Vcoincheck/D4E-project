import { useState } from 'react';
import { Bell, Plus, Search, Wallet, Sun, Moon, ChevronDown, FileText, Users, Globe } from 'lucide-react';
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

interface TopBarProps {
  onNavigateHome?: () => void;
  onCreateProposal?: () => void;
  onCreateDAO?: () => void;
}

export function TopBar({ onNavigateHome, onCreateProposal, onCreateDAO }: TopBarProps = {}) {
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
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onNavigateHome}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">₳</span>
            </div>
            <div>
              <h1 className="font-semibold text-card-foreground">{t('topbar.dao_name')}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t('topbar.treasury')}</span>
                <span className="font-medium text-green-500">2,847,392 ADA</span>
                <Badge variant="secondary" className="text-xs">
                  +5.2%
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('topbar.search_placeholder')}
              className="w-80 pl-10"
            />
          </div>
          
          {/* Mobile search button */}
          <Button variant="outline" size="icon" className="md:hidden">
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
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          
          {/* Connect Wallet / Wallet Info */}
          {mockConnectedWallet && mockWalletAddress ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Wallet className="h-3 w-3 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-card-foreground">{mockConnectedWallet}</div>
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
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">{t('action.connect')}</span>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t('action.create')}</span>
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
                {t('topbar.create_proposal')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  console.log('Creating DAO...');
                  onCreateDAO?.();
                }} 
                className="gap-2 cursor-pointer"
              >
                <Users className="h-4 w-4" />
                {t('topbar.create_dao')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <WalletConnectModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal}
      />
    </>
  );
}
