import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { useLanguage } from "./components/providers/LanguageProvider";
import { UniversalHeader } from "./components/layout/UniversalHeader";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Governance } from "./components/governance/Governance";
import { TreasuryDetails } from "./components/governance/TreasuryDetails";
import { ProposalDetails } from "./components/proposals/ProposalDetails";
import { DAOSummary } from "./components/dao/DAOSummary";
import { MintGovernanceToken } from "./components/governance/MintGovernanceToken";
import { CreateMultiSig } from "./components/dao/CreateMultiSig";
import { CreateDAOWizard } from "./components/dao/CreateDAOWizard";
import { CreateDAO } from "./components/dao/CreateDAO";
import { EnterpriseDAOCreator } from "./components/dao/EnterpriseDAOCreator";
import { CreateProposalWizard } from "./components/proposals/CreateProposalWizard";
import { Proposals } from "./components/proposals/Proposals";
import { Homepage } from "./components/layout/Homepage";
import { Members } from "./components/Members";
import { Documentation } from "./components/dashboard/Documentation";
import { DAODetails } from "./components/dao/DAODetails";
import { CrossDAOHub } from "./components/dao/CrossDAOHub";
import { CrossDAODetails } from "./components/dao/CrossDAODetails";
import { DemoNoticeModal } from "./components/providers/DemoNoticeModal";
import { FeedbackButton } from "./components/providers/FeedbackButton";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { LanguageProvider } from "./components/providers/LanguageProvider";
import { useTheme } from "./components/providers/ThemeProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { CheckCircle, Zap, Settings, ArrowRight, Info } from "lucide-react";
import lightBackground from './assets/theme/light.png';
import darkBackground from './assets/theme/dark.png';

type ViewMode =
  | "homepage"
  | "dashboard"
  | "members"
  | "documentation"
  | "treasury-details"
  | "proposal-details"
  | "dao-summary"
  | "dao-details"
  | "cross-dao-details";
type CreateMode =
  | "none"
  | "dao-wizard"
  | "dao-simple"
  | "dao-enterprise"
  | "proposal-wizard"
  | "mint-token"
  | "create-multisig";

type EnterpriseDAOMode = "choice" | "simple" | "advanced";

function AppContent() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>("homepage");
  const [activeTab, setActiveTab] = useState("overview");
  const [createMode, setCreateMode] = useState<CreateMode>("none");
  const [enterpriseDAOMode, setEnterpriseDAOMode] = useState<EnterpriseDAOMode>("choice");
  const [currentTreasuryAddress, setCurrentTreasuryAddress] = useState<string>("");
  const [currentProposalId, setCurrentProposalId] = useState<string>("");
  const [currentDAOName, setCurrentDAOName] = useState<string>("");
  const [currentDAODetails, setCurrentDAODetails] = useState<{type: 'enterprise' | 'community', id: string | number} | null>(null);
  const [currentCrossDAOId, setCurrentCrossDAOId] = useState<string>("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, ensure sidebar starts collapsed
      if (mobile) {
        setIsMobileSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []); // Remove dependency to avoid infinite loops

  // Initialize demo modal state safely
  useEffect(() => {
    if (isInitialized) return;
    
    const checkDemoModal = () => {
      try {
        const hasSeenDemo = sessionStorage.getItem('hasSeenDemoModal');
        if (!hasSeenDemo) {
          setShowDemoModal(true);
          sessionStorage.setItem('hasSeenDemoModal', 'true');
        }
      } catch (error) {
        // Handle case where sessionStorage is not available
        console.warn('SessionStorage not available:', error);
      }
      setIsInitialized(true);
    };

    // Use a small delay to ensure the component is fully mounted
    const timer = setTimeout(checkDemoModal, 100);
    return () => clearTimeout(timer);
  }, []); // Remove isInitialized dependency to avoid infinite loop

  // Memoized navigation handlers to prevent unnecessary re-renders
  const handleViewDAO = useCallback((daoName: string) => {
    console.log(`Navigating to ${daoName} DAO dashboard`);
    // For now, navigate to the main dashboard
    // In a real application, this would navigate to the specific DAO's dashboard
    setActiveTab("overview");
    setViewMode("dashboard");
  }, []);

  const handleViewTreasuryDetails = useCallback((treasuryAddress: string) => {
    setCurrentTreasuryAddress(treasuryAddress);
    setViewMode("treasury-details");
  }, []);

  const handleViewProposal = useCallback((proposalId: string) => {
    setCurrentProposalId(proposalId);
    setViewMode("proposal-details");
  }, []);

  const handleViewDAOSummary = useCallback((daoName: string) => {
    setCurrentDAOName(daoName);
    setViewMode("dao-summary");
  }, []);

  const handleViewDAODetails = useCallback((type: 'enterprise' | 'community', id: string | number) => {
    setCurrentDAODetails({ type, id });
    setViewMode("dao-details");
  }, []);

  const handleViewCrossDAODetails = useCallback((daoId: string) => {
    setCurrentCrossDAOId(daoId);
    setViewMode("cross-dao-details");
  }, []);

  const handleCloseDemoModal = useCallback(() => {
    setShowDemoModal(false);
  }, []);

  // Memoized navigation callbacks to prevent unnecessary re-renders
  const navigateToHomepage = useCallback(() => setViewMode("homepage"), []);
  const navigateToMembers = useCallback(() => setViewMode("members"), []);
  const navigateToDashboard = useCallback(() => setViewMode("dashboard"), []);
  const navigateToDocumentation = useCallback(() => setViewMode("documentation"), []);

  const createProposal = useCallback(() => setCreateMode("proposal-wizard"), []);
  const createDAOEnterprise = useCallback(() => setCreateMode("dao-enterprise"), []);
  const createDAOSimple = useCallback(() => setCreateMode("dao-simple"), []);
  const createDAOWizard = useCallback(() => setCreateMode("dao-wizard"), []);
  const createMintToken = useCallback(() => setCreateMode("mint-token"), []);
  const createMultiSig = useCallback(() => setCreateMode("create-multisig"), []);
  const clearCreateMode = useCallback(() => setCreateMode("none"), []);
  const toggleMobileSidebar = useCallback(() => setIsMobileSidebarOpen(!isMobileSidebarOpen), [isMobileSidebarOpen]);
  const closeMobileSidebar = useCallback(() => {
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  // Get background image based on theme
  const backgroundImage = theme === 'dark' ? darkBackground : lightBackground;

  // Determine if sidebar should be hidden
  const shouldHideSidebar = activeTab === "enterprise-dao" && enterpriseDAOMode !== "choice";

  // Handle create DAO modes and new governance modes
  if (createMode === "dao-wizard") {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <CreateDAOWizard onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  if (createMode === "dao-simple") {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <CreateDAO onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  if (createMode === "dao-enterprise") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        <div className="relative z-10">
          <EnterpriseDAOCreator onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  if (createMode === "proposal-wizard") {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <CreateProposalWizard onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  if (createMode === "mint-token") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        <div className="relative z-10">
          <MintGovernanceToken onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  if (createMode === "create-multisig") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={() => {
            clearCreateMode();
            navigateToHomepage();
          }}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={() => {
            clearCreateMode();
            navigateToMembers();
          }}
        />
        <div className="relative z-10">
          <CreateMultiSig onBack={clearCreateMode} />
        </div>
      </div>
    );
  }

  // Treasury Details view
  if (viewMode === "treasury-details") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
        />
        <div className="relative z-10">
          <TreasuryDetails 
            onBack={() => {
              setViewMode("dashboard");
              setActiveTab("governance");
            }}
            treasuryAddress={currentTreasuryAddress}
          />
        </div>
      </div>
    );
  }

  // Proposal Details view
  if (viewMode === "proposal-details") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
        />
        <div className="relative z-10">
          <ProposalDetails 
            onBackToDAO={handleViewDAOSummary}
          />
        </div>
      </div>
    );
  }

  // DAO Summary view
  if (viewMode === "dao-summary") {
    return (
      <div className="min-h-screen">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
        />
        <div className="relative z-10">
          <DAOSummary 
            daoName={currentDAOName}
            onBackToProposals={() => {
              setViewMode("dashboard");
              setActiveTab("proposals");
            }}
            onViewProposal={handleViewProposal}
            onCreateProposal={createProposal}
          />
        </div>
      </div>
    );
  }

  // DAO Details view
  if (viewMode === "dao-details" && currentDAODetails) {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <DAODetails 
            type={currentDAODetails.type}
            id={currentDAODetails.id}
            onBack={navigateToMembers}
            onViewProposal={handleViewProposal}
          />
        </div>
        
        {/* Feedback Button */}
        <FeedbackButton />
      </div>
    );
  }

  // Cross DAO Details view
  if (viewMode === "cross-dao-details" && currentCrossDAOId) {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <CrossDAODetails 
            daoId={currentCrossDAOId}
            onBack={() => {
              setActiveTab("cross-dao-hub");
              setViewMode("dashboard");
            }}
          />
        </div>
        
        {/* Feedback Button */}
        <FeedbackButton />
      </div>
    );
  }

  // Homepage view
  if (viewMode === "homepage") {
    return (
      <div className="min-h-screen relative">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <Homepage
            onNavigateToDashboard={navigateToDashboard}
            onCreateDAO={createDAOEnterprise}
            onNavigateToMembers={navigateToMembers}
            onNavigateToDocumentation={navigateToDocumentation}
            onCreateProposal={createProposal}
            onViewDAODetails={handleViewDAODetails}
          />
        </div>
        
        {/* Demo Notice Modal - Only render when initialized */}
        {isInitialized && (
          <DemoNoticeModal
            isOpen={showDemoModal}
            onClose={handleCloseDemoModal}
          />
        )}
        
        {/* Feedback Button */}
        <FeedbackButton />
      </div>
    );
  }

  // Members view
  if (viewMode === "members") {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
          onToggleMobileSidebar={toggleMobileSidebar}
          showMobileMenuButton={true}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="relative z-30">
              <Sidebar
                activeTab="members"
                onTabChange={(tab) => {
                  if (tab === "members") {
                    // Stay in members view
                    setViewMode("members");
                  } else {
                    // Navigate to dashboard with selected tab
                    setActiveTab(tab);
                    setViewMode("dashboard");
                  }
                  // Close mobile sidebar when navigating
                  closeMobileSidebar();
                }}
                onNavigateHome={() => {
                  navigateToHomepage();
                  closeMobileSidebar();
                }}
                isCollapsed={isMobile ? !isMobileSidebarOpen : undefined}
                onToggleCollapsed={isMobile ? toggleMobileSidebar : undefined}
              />
            </div>

            {/* Main Content */}
            <Members
              onNavigateHome={navigateToHomepage}
              onNavigateToDashboard={navigateToDashboard}
              onCreateDAO={createDAOEnterprise}
              onViewDetails={handleViewDAODetails}
              onViewCrossDAODetails={handleViewCrossDAODetails}
            />
          </div>
        </div>
        
        {/* Feedback Button */}
        <FeedbackButton />
      </div>
    );
  }

  // Documentation view
  if (viewMode === "documentation") {
    return (
      <div className="min-h-screen relative">
        {/* Universal Header */}
        <UniversalHeader
          onNavigateHome={navigateToHomepage}
          onCreateProposal={createProposal}
          onCreateDAO={createDAOEnterprise}
          onNavigateToMembers={navigateToMembers}
          onToggleMobileSidebar={toggleMobileSidebar}
          showMobileMenuButton={true}
        />
        {/* Background Image */}
        <div className="fixed inset-0 z-0 top-16">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="relative z-30">
              <Sidebar
                activeTab="documents"
                onTabChange={(tab) => {
                  if (tab !== "documents") {
                    setActiveTab(tab);
                    setViewMode("dashboard");
                  }
                  // Close mobile sidebar when navigating
                  closeMobileSidebar();
                }}
                onNavigateHome={() => {
                  navigateToHomepage();
                  closeMobileSidebar();
                }}
                isCollapsed={isMobile ? !isMobileSidebarOpen : undefined}
                onToggleCollapsed={isMobile ? toggleMobileSidebar : undefined}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-20">
              <div className="flex-1 overflow-auto relative z-10">
                <Documentation
                  onNavigateHome={navigateToHomepage}
                  onNavigateToDashboard={navigateToDashboard}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Feedback Button */}
        <FeedbackButton />
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen relative">
      {/* Universal Header */}
      <UniversalHeader
        onNavigateHome={navigateToHomepage}
        onCreateProposal={createProposal}
        onCreateDAO={createDAOEnterprise}
        onNavigateToMembers={navigateToMembers}
        onToggleMobileSidebar={toggleMobileSidebar}
        showMobileMenuButton={true}
      />
      {/* Background Image */}
      <div className="fixed inset-0 z-0 top-16">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar - Hidden when in specific creator modes */}
          {!shouldHideSidebar && (
            <div className="relative z-30">
              <Sidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  if (tab === "members") {
                    // Navigate to members view instead of showing dashboard members
                    setViewMode("members");
                  } else {
                    setActiveTab(tab);
                    // Reset enterprise DAO mode when switching tabs
                    if (tab !== "enterprise-dao") {
                      setEnterpriseDAOMode("choice");
                    }
                  }
                  // Close mobile sidebar when navigating
                  closeMobileSidebar();
                }}
                onNavigateHome={() => {
                  navigateToHomepage();
                  closeMobileSidebar();
                }}
                isCollapsed={isMobile ? !isMobileSidebarOpen : undefined}
                onToggleCollapsed={isMobile ? toggleMobileSidebar : undefined}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative z-20">

            {/* Dashboard Content */}
            <div className="flex-1 overflow-auto relative z-10">
              {activeTab === "overview" && <Dashboard />}
              {activeTab === "proposals" && (
                <Proposals
                  onCreateProposal={createProposal}
                  onViewProposal={handleViewProposal}
                />
              )}
              {activeTab === "cross-dao-hub" && (
                <CrossDAOHub
                  onNavigateHome={navigateToHomepage}
                  onNavigateToDashboard={navigateToDashboard}
                  onViewCrossDAODetails={handleViewCrossDAODetails}
                />
              )}
              {activeTab === "governance" && (
                <Governance
                  onMintToken={createMintToken}
                  onCreateMultiSig={createMultiSig}
                  onViewDAO={handleViewDAO}
                  onViewTreasuryDetails={handleViewTreasuryDetails}
                />
              )}
              {activeTab === "enterprise-dao" && (
                <div className="p-6">
                  {enterpriseDAOMode === "choice" && (
                    <>
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">
                          Enterprise DAO Creator
                        </h2>
                        <p className="text-muted-foreground">
                          Choose your preferred DAO creation method
                        </p>
                      </div>

                      {/* Notice */}
                      <div className="mb-8">
                        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              <CardTitle className="text-blue-800 dark:text-blue-200">Choose Your Creation Method</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="text-blue-700 dark:text-blue-300">
                            <p>
                              Select between our streamlined Simple creator for quick setup, or the Advanced wizard for 
                              comprehensive multi-step guidance and customization options.
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Choice Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Simple Option */}
                        <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary/20">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                  <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <CardTitle>Simple</CardTitle>
                                  <CardDescription>Quick & streamlined setup</CardDescription>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                Recommended for beginners
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                              Perfect for getting started quickly with essential DAO features and streamlined setup process.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Single-page setup</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Pre-configured templates</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Essential governance features</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Quick deployment</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setEnterpriseDAOMode("simple")}
                              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                            >
                              Start Simple Setup
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </CardContent>
                        </Card>

                        {/* Advanced Option */}
                        <Card className="cursor-pointer hover:shadow-lg transition-all border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Settings className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <CardTitle>Advanced</CardTitle>
                                  <CardDescription>6-step guided wizard</CardDescription>
                                </div>
                              </div>
                              <Badge className="bg-primary text-primary-foreground">
                                Default
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                              Comprehensive multi-step wizard with detailed guidance and advanced customization options.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>6-step guided process</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>Advanced governance models</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>Custom tokenomics design</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>Comprehensive customization</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setEnterpriseDAOMode("advanced")}
                              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                            >
                              Launch Advanced Wizard
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {enterpriseDAOMode === "simple" && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">
                            Simple DAO Creator
                          </h2>
                          <p className="text-muted-foreground">
                            Quick and streamlined DAO setup process
                          </p>
                        </div>
                        <button
                          onClick={() => setEnterpriseDAOMode("choice")}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                        >
                          Back to Options
                        </button>
                      </div>
                      <EnterpriseDAOCreator onBack={() => setEnterpriseDAOMode("choice")} />
                    </div>
                  )}

                  {enterpriseDAOMode === "advanced" && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">
                            Advanced DAO Wizard
                          </h2>
                          <p className="text-muted-foreground">
                            Comprehensive 6-step guided DAO creation process
                          </p>
                        </div>
                        <button
                          onClick={() => setEnterpriseDAOMode("choice")}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                        >
                          Back to Options
                        </button>
                      </div>
                      <CreateDAOWizard onBack={() => setEnterpriseDAOMode("choice")} />
                    </div>
                  )}
                </div>
              )}
              {activeTab === "multi-sig" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Multi-Signature Wallet
                      </h2>
                      <p className="text-muted-foreground">
                        Create and manage multi-signature wallets for enhanced security
                      </p>
                    </div>
                    <button
                      onClick={createMultiSig}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      Create Multi-Sig
                    </button>
                  </div>
                  <CreateMultiSig onBack={() => setActiveTab("overview")} />
                </div>
              )}
              {activeTab === "documents" && (
                <div className="relative z-10">
                  <Documentation
                    onNavigateHome={navigateToHomepage}
                    onNavigateToDashboard={navigateToDashboard}
                  />
                </div>
              )}
              {activeTab === "settings" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {t('settings.title')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('settings.description')}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={createDAOEnterprise}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
                      >
                        Enterprise Setup
                      </button>
                      <button
                        onClick={createDAOSimple}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                      >
                        {t('settings.quick_create')}
                      </button>
                      <button
                        onClick={createDAOWizard}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {t('settings.advanced_wizard')}
                      </button>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Settings panel coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Button - Always visible in dashboard */}
      <FeedbackButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
