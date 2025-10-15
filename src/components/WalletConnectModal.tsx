import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Wallet, ExternalLink, CheckCircle2, AlertCircle, Download, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import subwalletLogo from '../assets/cdf88002033f44055486f7dfa30e8e32dd79666b.png';
import yoroiLogo from '../assets/f49a919ab3baf303a01f8bf30010184404beac29.png';

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WalletInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  downloadUrl: string;
  isInstalled: boolean;
  connecting: boolean;
  color: string;
}

// Custom wallet logo components
const LaceLogo = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  </div>
);

const EternlLogo = () => (
  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5z"/>
    </svg>
  </div>
);

const VesprLogo = () => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
      <path d="M12 2.5L13.09 8.26L19 4L14.74 9.91L20.5 12L14.74 14.09L19 20L13.09 15.74L12 21.5L10.91 15.74L5 20L9.26 14.09L3.5 12L9.26 9.91L5 4L10.91 8.26L12 2.5Z"/>
    </svg>
  </div>
);

const MidnightLogo = () => (
  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
      <path d="M12 2L15.09 8.26L22 9L17.27 13.74L18.18 20.5L12 17.27L5.82 20.5L6.73 13.74L2 9L8.91 8.26L12 2Z"/>
    </svg>
  </div>
);

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const [wallets, setWallets] = useState<WalletInfo[]>([
    {
      id: 'subwallet',
      name: 'SubWallet',
      icon: (
        <ImageWithFallback
          src={subwalletLogo}
          alt="SubWallet"
          className="w-full h-full object-cover rounded-xl"
        />
      ),
      description: 'Multi-chain wallet for Cardano and Polkadot',
      downloadUrl: 'https://www.subwallet.app/',
      isInstalled: false,
      connecting: false,
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'lace',
      name: 'Lace',
      icon: <LaceLogo />,
      description: 'A lightweight wallet for Cardano by IOG',
      downloadUrl: 'https://www.lace.io/',
      isInstalled: false,
      connecting: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'yoroi',
      name: 'Yoroi',
      icon: (
        <ImageWithFallback
          src={yoroiLogo}
          alt="Yoroi"
          className="w-full h-full object-cover rounded-xl"
        />
      ),
      description: 'Light wallet for Cardano by Emurgo',
      downloadUrl: 'https://yoroi-wallet.com/',
      isInstalled: false,
      connecting: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'eternl',
      name: 'Eternl',
      icon: <EternlLogo />,
      description: 'Feature-rich Cardano wallet with advanced tools',
      downloadUrl: 'https://eternl.io/',
      isInstalled: false,
      connecting: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'vespr',
      name: 'Vespr',
      icon: <VesprLogo />,
      description: 'Privacy-focused Cardano wallet',
      downloadUrl: 'https://vespr.xyz/',
      isInstalled: false,
      connecting: false,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      icon: <MidnightLogo />,
      description: 'Privacy-preserving wallet for Midnight protocol',
      downloadUrl: 'https://midnight.network/',
      isInstalled: false,
      connecting: false,
      color: 'from-slate-500 to-gray-600'
    }
  ]);

  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Check for installed wallets on component mount
  useEffect(() => {
    const checkWalletInstallation = () => {
      setWallets(prev => prev.map(wallet => ({
        ...wallet,
        isInstalled: checkWalletAvailable(wallet.id)
      })));
    };

    if (open) {
      checkWalletInstallation();
      setConnectionError(null);
      setConnectedWallet(null);
    }
  }, [open]);

  const checkWalletAvailable = (walletId: string): boolean => {
    // Mock wallet detection - in real implementation, this would check window.cardano
    if (typeof window === 'undefined') return false;
    
    const cardano = (window as any).cardano;
    if (!cardano) return false;

    // Simulate some wallets being installed (randomly for demo)
    const randomInstalled = Math.random() > 0.5;
    const mockInstalledWallets = randomInstalled ? ['lace', 'yoroi', 'eternl'] : ['subwallet', 'vespr'];
    return mockInstalledWallets.includes(walletId);
  };

  const connectWallet = async (walletId: string) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, connecting: true }
        : wallet
    ));
    setConnectionError(null);

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate occasional connection failures for demo
      if (Math.random() > 0.8) {
        throw new Error('Failed to connect to wallet. Please try again.');
      }
      
      setConnectedWallet(walletId);
      
      // Close modal after successful connection
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : 'Connection failed');
    } finally {
      setWallets(prev => prev.map(wallet => 
        wallet.id === walletId 
          ? { ...wallet, connecting: false }
          : wallet
      ));
    }
  };

  const installedWallets = wallets.filter(wallet => wallet.isInstalled);
  const notInstalledWallets = wallets.filter(wallet => !wallet.isInstalled);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a Cardano wallet to connect to the DAO platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {connectedWallet && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Successfully connected to {wallets.find(w => w.id === connectedWallet)?.name}!
              </AlertDescription>
            </Alert>
          )}

          {connectionError && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {connectionError}
              </AlertDescription>
            </Alert>
          )}

          {installedWallets.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-foreground">Available Wallets</h3>
              <div className="grid grid-cols-1 gap-3">
                {installedWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 shrink-0">
                        {wallet.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{wallet.name}</span>
                          <Badge variant="secondary" className="gap-1 shrink-0">
                            <CheckCircle2 className="h-3 w-3" />
                            Installed
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {wallet.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => connectWallet(wallet.id)}
                      disabled={wallet.connecting || connectedWallet === wallet.id}
                      className="min-w-[90px] shrink-0 ml-3"
                      variant={connectedWallet === wallet.id ? "secondary" : "default"}
                    >
                      {wallet.connecting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : connectedWallet === wallet.id ? (
                        'Connected'
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notInstalledWallets.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-foreground">Install a Wallet</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notInstalledWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="flex flex-col p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 shrink-0 opacity-60">
                        {wallet.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{wallet.name}</span>
                          <Badge variant="outline" className="gap-1 text-xs">
                            <AlertCircle className="h-3 w-3" />
                            Not detected
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {wallet.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(wallet.downloadUrl, '_blank')}
                      className="gap-2 w-full"
                    >
                      <Download className="h-4 w-4" />
                      Install
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {installedWallets.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No Cardano wallets detected. Please install a wallet to continue.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>New to Cardano?</span>
            <Button
              variant="link"
              size="sm"
              onClick={() => window.open('https://cardano.org/wallets/', '_blank')}
              className="gap-1 h-auto p-0 text-primary hover:text-primary/80"
            >
              Learn about wallets
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
