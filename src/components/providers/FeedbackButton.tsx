import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MessageSquare, ExternalLink, Send, Twitter } from 'lucide-react';

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const feedbackOptions = [
    {
      label: 'Google Form',
      icon: MessageSquare,
      href: 'https://docs.google.com/forms/d/1AX6yMzL9dbyxmeE-s2rBPnwRa4UqTbVazanDgxX90wk',
      description: 'Submit detailed feedback'
    },
    {
      label: 'Telegram',
      icon: Send,
      href: 'https://t.me/ADA_VIET',
      description: 'Join our community'
    },
    {
      label: 'Twitter',
      icon: Twitter,
      href: 'https://x.com/VCoinCheck',
      description: 'Follow for updates'
    }
  ];

  return (
    <div className="fixed top-20 right-4 z-40 feedback-mobile">
      {/* Feedback Button */}
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
          text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105
          rounded-full px-4 py-2.5 flex items-center gap-2 group
          ${isOpen ? 'scale-105 shadow-xl' : ''}
        `}
      >
        <MessageSquare className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-12' : 'group-hover:rotate-12'}`} />
        <span className="font-medium">Feedback</span>
        <div className={`w-2 h-2 bg-white/30 rounded-full transition-all duration-200 ${isOpen ? 'scale-150' : ''}`}></div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-64 shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200"
        >
          <CardContent className="p-2">
            {feedbackOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-150 group"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  role="menuitem"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-150">
                    <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {option.label}
                      </h4>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-150" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </CardContent>
          
          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200/50 dark:border-gray-700/50">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Your feedback helps us improve
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
