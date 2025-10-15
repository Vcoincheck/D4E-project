import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import d4eLogo from '../assets/320f2a6e3c5e0ed6818301bbeb20e51c9cf971b9.png';

interface DemoNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoNoticeModal({ isOpen, onClose }: DemoNoticeModalProps) {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Don't call onClose inside setState callback - move it outside
          setTimeout(() => onClose(), 0);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <Card className="relative w-full max-w-lg mx-4 shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 demo-modal-mobile">
        {/* Header with Logo and Slogan */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            {/* Project Logo */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={d4eLogo} 
                alt="D4E Logo" 
                className="w-8 h-8 object-contain"
              />
          </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                D4E - Decentralized Governance Platform
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                for Enterprise & Everyone
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-6 pt-4">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              ⚡Important Notice⚡
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              - This product is currently under development, and its features and interface are subject to change at any time. 
              
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              
              - We are in a public pre-release phase and warmly welcome your contributions and feedback to help us improve.
            </p>
            <p className="italic text-gray-600 dark:text-gray-400 mt-3">
              D4E – a product built by VCC team and empowered by Cardano community
            </p>
            </div>

          {/* Auto-close timer */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Auto-closing in {timeLeft}s</span>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

