import {
  Home,
  FileText,
  Wallet,
  Users,
  Settings,
  Activity,
  Vote,
  ChevronRight,
  BookOpen,
  Menu,
  X,
  Building2,
  Clock,
  Briefcase,
  KeyRound,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { useLanguage } from "../providers/LanguageProvider";
import { useState, useEffect } from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigateHome?: () => void;
  isCollapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  onNavigateHome,
  isCollapsed: externalIsCollapsed,
  onToggleCollapsed,
}: SidebarProps) {
  const { t } = useLanguage();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use external collapsed state if provided, otherwise use internal state
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Collapse sidebar by default on mobile (only if using internal state)
      if (mobile && externalIsCollapsed === undefined) {
        setInternalIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, [externalIsCollapsed]);

  const navigationItems = [
    { id: "overview", label: t("nav.dashboard"), icon: Home },
    { id: "members", label: t("All DAOs"), icon: Users },
    {
      id: "proposals",
      label: t("nav.proposals"),
      icon: FileText,
    },

    {
      id: "governance",
      label: t("nav.governance"),
      icon: Vote,
    },
  ];

  const buildingFeatures = [
    {
      id: "enterprise-dao",
      label: "Enterprise DAO",
      icon: Briefcase,
    },
    {
      id: "multi-sig",
      label: "Multi-sig",
      icon: KeyRound,
    },
        {
      id: "cross-dao-hub",
      label: "Cross DAO Hub",
      icon: Share2,
    },
  ];

  const incomingFeatures = [
    { id: "treasury", label: t("nav.treasury"), icon: Wallet },
    {
      id: "activity",
      label: t("nav.activity"),
      icon: Activity,
    },
  ];

  const bottomNavigationItems = [
    {
      id: "documents",
      label: t("nav.documents"),
      icon: BookOpen,
    },
    {
      id: "settings",
      label: t("nav.settings"),
      icon: Settings,
    },
  ];

  const toggleSidebar = () => {
    if (onToggleCollapsed) {
      onToggleCollapsed();
    } else {
      setInternalIsCollapsed(!internalIsCollapsed);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden top-16"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-sidebar border-r border-sidebar-border h-full flex flex-col transition-all duration-300",
          // Desktop behavior: show collapsed (16) or expanded (64) sidebar
          !isMobile && (isCollapsed ? "w-16" : "w-64"),
          // Mobile behavior: hide completely when collapsed, overlay when expanded
          isMobile && isCollapsed && "hidden",
          isMobile && !isCollapsed && "fixed left-0 top-16 bottom-0 w-64 shadow-2xl z-50"
        )}
      >
        {/* Toggle Button */}
        <div className="p-4 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full justify-center hover:bg-sidebar-accent"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 px-4 flex flex-col">
          {/* Main Navigation */}
          <div className="space-y-1 pt-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full gap-3 h-10 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                    isActive &&
                      "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    isCollapsed
                      ? "justify-center px-2"
                      : "justify-start",
                  )}
                  onClick={() => onTabChange(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Building Features Section */}
          {!isCollapsed && (
            <div className="pt-6">
              <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span>Building Features</span>
              </div>
              <div className="space-y-1">
                {buildingFeatures.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full gap-3 h-10 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                        isActive &&
                          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                        "justify-start",
                      )}
                      onClick={() => onTabChange(item.id)}
                      title={item.label}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Incoming Features Section */}
          {!isCollapsed && (
            <div className="pt-6">
              <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Incoming Features</span>
              </div>
              <div className="space-y-1">
                {incomingFeatures.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      disabled
                      className="w-full gap-3 h-10 text-muted-foreground opacity-60 cursor-not-allowed justify-start"
                      title={`${item.label} - Coming Soon`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">
                        Soon
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="space-y-1 pb-4 mt-auto">
            {bottomNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full gap-3 h-10 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                    isActive &&
                      "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    isCollapsed
                      ? "justify-center px-2"
                      : "justify-start",
                  )}
                  onClick={() => onTabChange(item.id)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
