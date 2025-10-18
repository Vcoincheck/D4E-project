import { useLanguage } from "./LanguageProvider";
import { Github, Twitter } from "lucide-react";

interface FooterProps {
  onNavigateToDocumentation?: () => void;
  onCreateDAO?: () => void;
  onNavigateToDashboard?: () => void;
}

export function Footer({ 
  onNavigateToDocumentation, 
  onCreateDAO, 
  onNavigateToDashboard 
}: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-auto">
      <div className="bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* D4E Branding Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D4E</span>
                </div>
                <span className="font-semibold text-lg">D4E</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                From Blockchain to Boardroom — Cardano Governance for the Real World. 
                The premier platform for creating and managing DAOs on Cardano.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
                <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
            </div>

            {/* Platform Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Platform
              </h3>
              <nav className="space-y-3">
                <button
                  onClick={onNavigateToDashboard}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Explore DAOs
                </button>
                <button
                  onClick={onCreateDAO}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create DAO
                </button>
                <button
                  onClick={onNavigateToDocumentation}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </button>
                <a
                  href="https://vcc.gitbook.io/D4E-project/"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="https://vcc.gitbook.io/D4E-project/"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tutorials
                </a>
              </nav>
            </div>

            {/* Community Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Community
              </h3>
              <nav className="space-y-3">
                <a
                  href="https://t.me/ADA_VIET"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forum
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2024 D4E. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a
                  href="https://t.me/ADA_VIET"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="https://t.me/ADA_VIET"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
