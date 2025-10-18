#!/usr/bin/env bash
# Script: tái cấu trúc thư mục src/components theo yêu cầu
# Chạy từ /workspaces/D4E-project
set -euo pipefail
ROOT="/workspaces/D4E-project"
cd "$ROOT"

# Tạo cây thư mục đích
mkdir -p src/components/{layout,providers,dao,governance,proposals/steps,wizard/steps,dashboard,shared/figma,shared/modals,shared/buttons,shared/types,ui}

# helper để di chuyển (dùng git mv nếu repo git)
move() {
  local src="$1"
  local dst="$2"
  if [ ! -e "$src" ]; then
    echo "Missing: $src"
    return 0
  fi
  if git rev-parse --git-dir > /dev/null 2>&1; then
    git mv "$src" "$dst"
  else
    mv "$src" "$dst"
  fi
  echo "Moved: $src -> $dst"
}

# layout
move src/components/Footer.tsx src/components/layout/Footer.tsx
move src/components/Sidebar.tsx src/components/layout/Sidebar.tsx
move src/components/TopBar.tsx src/components/layout/TopBar.tsx
move src/components/UniversalHeader.tsx src/components/layout/UniversalHeader.tsx
move src/components/Homepage.tsx src/components/layout/Homepage.tsx
move src/components/HomepageHeader.tsx src/components/layout/HomepageHeader.tsx

# providers
move src/components/LanguageProvider.tsx src/components/providers/LanguageProvider.tsx
move src/components/ThemeProvider.tsx src/components/providers/ThemeProvider.tsx
move src/components/ThemeDemo.tsx src/components/providers/ThemeDemo.tsx
move src/components/WalletConnectModal.tsx src/components/providers/WalletConnectModal.tsx
move src/components/DemoNoticeModal.tsx src/components/providers/DemoNoticeModal.tsx
move src/components/FeedbackButton.tsx src/components/providers/FeedbackButton.tsx

# dao
move src/components/CreateDAO.tsx src/components/dao/CreateDAO.tsx
move src/components/CreateDAOWizard.tsx src/components/dao/CreateDAOWizard.tsx
move src/components/CreateMultiSig.tsx src/components/dao/CreateMultiSig.tsx
move src/components/DAODetails.tsx src/components/dao/DAODetails.tsx
move src/components/DAOSummary.tsx src/components/dao/DAOSummary.tsx
move src/components/EnterpriseDAOCreator.tsx src/components/dao/EnterpriseDAOCreator.tsx
move src/components/CrossDAOHub.tsx src/components/dao/CrossDAOHub.tsx
move src/components/CrossDAODetails.tsx src/components/dao/CrossDAODetails.tsx

# governance
move src/components/Governance.tsx src/components/governance/Governance.tsx
move src/components/MintGovernanceToken.tsx src/components/governance/MintGovernanceToken.tsx
move src/components/TreasuryDetails.tsx src/components/governance/TreasuryDetails.tsx
move src/components/multisigeditor.tsx src/components/governance/multisigeditor.tsx

# proposals + steps
move src/components/Proposals.tsx src/components/proposals/Proposals.tsx
move src/components/ProposalDetails.tsx src/components/proposals/ProposalDetails.tsx
move src/components/CreateProposalWizard.tsx src/components/proposals/CreateProposalWizard.tsx

move src/components/steps/AttachmentsStep.tsx src/components/proposals/steps/AttachmentsStep.tsx || move src/components/AttachmentsStep.tsx src/components/proposals/steps/AttachmentsStep.tsx
move src/components/steps/ProposalBasicsStep.tsx src/components/proposals/steps/ProposalBasicsStep.tsx || move src/components/ProposalBasicsStep.tsx src/components/proposals/steps/ProposalBasicsStep.tsx
move src/components/steps/ProposalDetailsStep.tsx src/components/proposals/steps/ProposalDetailsStep.tsx || move src/components/ProposalDetailsStep.tsx src/components/proposals/steps/ProposalDetailsStep.tsx
move src/components/steps/ProposalReviewStep.tsx src/components/proposals/steps/ProposalReviewStep.tsx || move src/components/ProposalReviewStep.tsx src/components/proposals/steps/ProposalReviewStep.tsx
move src/components/steps/VotingConfigStep.tsx src/components/proposals/steps/VotingConfigStep.tsx || move src/components/VotingConfigStep.tsx src/components/proposals/steps/VotingConfigStep.tsx

# wizard + steps
move src/components/steps/AddMembersStep.tsx src/components/wizard/steps/AddMembersStep.tsx || move src/components/AddMembersStep.tsx src/components/wizard/steps/AddMembersStep.tsx
move src/components/steps/DAOInfoStep.tsx src/components/wizard/steps/DAOInfoStep.tsx || move src/components/DAOInfoStep.tsx src/components/wizard/steps/DAOInfoStep.tsx
move src/components/steps/GovernanceSetupStep.tsx src/components/wizard/steps/GovernanceSetupStep.tsx || move src/components/GovernanceSetupStep.tsx src/components/wizard/steps/GovernanceSetupStep.tsx
move src/components/steps/ReviewConfirmStep.tsx src/components/wizard/steps/ReviewConfirmStep.tsx || move src/components/ReviewConfirmStep.tsx src/components/wizard/steps/ReviewConfirmStep.tsx
move src/components/steps/TreasuryMultisigStep.tsx src/components/wizard/steps/TreasuryMultisigStep.tsx || move src/components/TreasuryMultisigStep.tsx src/components/wizard/steps/TreasuryMultisigStep.tsx
move src/components/steps/VotingMethodStep.tsx src/components/wizard/steps/VotingMethodStep.tsx || move src/components/VotingMethodStep.tsx src/components/wizard/steps/VotingMethodStep.tsx
# optional wizard index
if [ -e src/components/index.wizard.ts ]; then
  move src/components/index.wizard.ts src/components/wizard/index.ts
fi

# dashboard
move src/components/Dashboard.tsx src/components/dashboard/Dashboard.tsx
move src/components/DashboardMembers.tsx src/components/dashboard/DashboardMembers.tsx
move src/components/Assets.tsx src/components/dashboard/Assets.tsx
move src/components/Documentation.tsx src/components/dashboard/Documentation.tsx

# shared
move src/components/ImageWithFallback.tsx src/components/shared/figma/ImageWithFallback.tsx

# ui files
ui_files=(
  accordion.tsx alert-dialog.tsx alert.tsx aspect-ratio.tsx avatar.tsx badge.tsx breadcrumb.tsx button.tsx
  calendar.tsx card.tsx carousel.tsx chart.tsx checkbox.tsx collapsible.tsx command.tsx context-menu.tsx
  dialog.tsx drawer.tsx dropdown-menu.tsx form.tsx hover-card.tsx input-otp.tsx input.tsx label.tsx menubar.tsx
  navigation-menu.tsx pagination.tsx popover.tsx progress.tsx radio-group.tsx resizable.tsx scroll-area.tsx
  select.tsx separator.tsx sheet.tsx sidebar.tsx skeleton.tsx slider.tsx sonner.tsx switch.tsx table.tsx tabs.tsx
  textarea.tsx toggle-group.tsx toggle.tsx tooltip.tsx use-mobile.ts utils.ts
)

for f in "${ui_files[@]}"; do
  move "src/components/${f}" "src/components/ui/${f}"
done

echo "Restructure complete."