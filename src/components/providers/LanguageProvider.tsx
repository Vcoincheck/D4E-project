import { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'vi' | 'es' | 'fr' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation files
const translations = {
  en: {
    // Navigation & Common
    'nav.dashboard': 'Dashboard',
    'nav.proposals': 'Proposals',
    'nav.treasury': 'Treasury',
    'nav.assets': 'Assets',
    'nav.members': 'Members',
    'nav.governance': 'Governance',
    'nav.activity': 'Activity',
    'nav.documents': 'Documents',
    'nav.settings': 'Settings',
    'nav.homepage': 'Homepage',
    'nav.documentation': 'Documentation',
    
    // Common Actions
    'action.create': 'Create',
    'action.connect': 'Connect Wallet',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.submit': 'Submit',
    'action.view': 'View',
    'action.close': 'Close',
    
    // TopBar
    'topbar.dao_name': 'Cardano Innovation DAO',
    'topbar.treasury': 'Treasury:',
    'topbar.search_placeholder': 'Search proposals, members...',
    'topbar.create_proposal': 'Your Proposal',
    'topbar.create_dao': 'Your DAO',
    
    // Dashboard
    'dashboard.title': 'Dashboard Overview',
    'dashboard.treasury_stats': 'Treasury Statistics',
    'dashboard.proposal_stats': 'Proposal Statistics',
    'dashboard.member_stats': 'Member Statistics',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.active_proposals': 'Active Proposals',
    'dashboard.treasury_balance': 'Treasury Balance',
    'dashboard.total_members': 'Total Members',
    'dashboard.voting_power': 'Voting Power',
    
    // DAO Creation Wizard
    'wizard.create_dao': 'Create New DAO',
    'wizard.step_of': 'Step {current} of {total}',
    'wizard.dao_info': 'DAO Information',
    'wizard.add_members': 'Add Members',
    'wizard.treasury_multisig': 'Treasury & Multisig',
    'wizard.voting_method': 'Submit Proposal Requirements',
    'wizard.governance_setup': 'Governance Setup',
    'wizard.review_confirm': 'Review & Confirm',
    
    // DAO Info Step
    'dao_info.title': 'Tell us about your DAO',
    'dao_info.description': 'Provide basic information about your decentralized autonomous organization.',
    'dao_info.name_label': 'DAO Name',
    'dao_info.name_placeholder': 'Enter your DAO name',
    'dao_info.symbol_label': 'Token Symbol',
    'dao_info.symbol_placeholder': 'e.g., INNOV',
    'dao_info.description_label': 'Description',
    'dao_info.description_placeholder': 'Describe your DAO\'s mission and purpose...',
    'dao_info.category_label': 'Category',
    'dao_info.category_placeholder': 'Select category',
    'dao_info.website_label': 'Website (Optional)',
    'dao_info.website_placeholder': 'https://your-dao-website.com',
    
    // Governance Setup
    'governance.title': 'Governance Setup',
    'governance.description': 'Configure your DAO\'s governance parameters',
    'governance.voting_requirements': 'Voting Requirements',
    'governance.timing_parameters': 'Timing Parameters',
    'governance.advanced_features': 'Advanced Features',
    'governance.quorum_percentage': 'Quorum Percentage',
    'governance.proposal_threshold': 'Proposal Threshold',
    'governance.proposal_bond': 'Proposal Bond',
    'governance.voting_period': 'Voting Period',
    'governance.execution_delay': 'Execution Delay',
    'governance.enable_delegation': 'Enable Delegation',
    'governance.emergency_proposals': 'Emergency Proposals',
    'governance.veto_rights': 'Veto Rights',
    'governance.epochs_info': '(1 epoch = ~5 days)',
    
    // Proposal Requirements
    'proposal_req.title': 'Who can submit proposals?',
    'proposal_req.description': 'Define who has the authority to create new proposals in your DAO.',
    'proposal_req.anyone_title': 'Anyone Can Submit',
    'proposal_req.anyone_desc': 'Any member of the DAO can submit proposals without restrictions.',
    'proposal_req.owner_title': 'Only Owner Team',
    'proposal_req.owner_desc': 'Only the DAO creators and designated team members can submit proposals.',
    'proposal_req.whitelist_title': 'Whitelist',
    'proposal_req.whitelist_desc': 'Pre-approved members can submit proposals. Addresses can be added via platform account, ADA handle, or wallet address.',
    'proposal_req.big_holder_title': 'Big Holder',
    'proposal_req.big_holder_desc': 'Members holding a minimum percentage of tokens can submit proposals.',
    
    // Members
    'members.title': 'DAO Members',
    'members.description': 'Manage and view all DAO members',
    'members.total_members': 'Total Members',
    'members.active_voters': 'Active Voters',
    'members.voting_power_dist': 'Voting Power Distribution',
    'members.recent_joiners': 'Recent Joiners',
    
    // Proposals
    'proposals.title': 'Proposals',
    'proposals.active': 'Active',
    'proposals.passed': 'Passed',
    'proposals.rejected': 'Rejected',
    'proposals.create_new': 'Create New Proposal',
    'proposals.voting_ends': 'Voting ends in',
    'proposals.votes_cast': 'votes cast',
    
    // Assets
    'assets.title': 'Assets',
    'assets.total_value': 'Total Portfolio Value',
    'assets.ada_balance': 'ADA Balance',
    'assets.native_tokens': 'Native Tokens',
    'assets.nfts': 'NFTs',
    
    // Settings
    'settings.title': 'Settings',
    'settings.description': 'Configure your DAO preferences',
    'settings.quick_create': 'Quick Create DAO',
    'settings.advanced_wizard': 'Advanced DAO Wizard',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.spanish': 'Español',
    'language.french': 'Français',
    
    // Time units
    'time.epoch': 'epoch',
    'time.epochs': 'epochs',
    'time.day': 'day',
    'time.days': 'days',
    'time.week': 'week',
    'time.weeks': 'weeks',
    'time.immediate': 'Immediate',
    'time.custom_period': 'Custom period',
    'time.custom_delay': 'Custom delay',
    
    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.draft': 'Draft',
    'status.live': 'Live',
    
    // Tooltips
    'tooltip.quorum': 'Minimum percentage of total tokens that must participate for a vote to be valid',
    'tooltip.proposal_threshold': 'Minimum tokens required to create a proposal',
    'tooltip.proposal_bond': 'ADA deposit required to create a proposal (returned if proposal passes)',
    'tooltip.voting_period': 'How long members have to vote on proposals',
    'tooltip.execution_delay': 'Time delay between proposal passage and execution',
    
    // Homepage
    'homepage.hero_title': 'Build the Future of Cardano Governance',
    'homepage.hero_subtitle': 'Create, manage, and participate in decentralized autonomous organizations on the Cardano blockchain with powerful tools and seamless user experience.',
    'homepage.get_started': 'Get Started',
    'homepage.explore_daos': 'Explore DAOs',
    'homepage.watch_demo': 'Watch Demo',
    'homepage.features_title': 'Everything You Need for DAO Success',
    'homepage.feature_governance': 'Smart Governance',
    'homepage.feature_governance_desc': 'Advanced voting mechanisms and proposal management',
    'homepage.feature_treasury': 'Treasury Management',
    'homepage.feature_treasury_desc': 'Multi-signature wallets and automated fund distribution',
    'homepage.feature_community': 'Community Tools',
    'homepage.feature_community_desc': 'Member management and collaboration features',
    'homepage.feature_analytics': 'Analytics & Insights',
    'homepage.feature_analytics_desc': 'Real-time data and governance analytics',
    'homepage.stats_title': 'Leading Cardano DAOs',
    'homepage.stats_total_value': 'Total Value Locked',
    'homepage.stats_active_daos': 'Active DAOs',
    'homepage.stats_proposals': 'Proposals Created',
    'homepage.stats_members': 'Community Members',
    'homepage.footer_about': 'About',
    'homepage.footer_features': 'Features',
    'homepage.footer_pricing': 'Pricing',
    'homepage.footer_docs': 'Documentation',
    'homepage.footer_support': 'Support',
    'homepage.footer_blog': 'Blog',
    'homepage.footer_privacy': 'Privacy Policy',
    'homepage.footer_terms': 'Terms of Service',
    'homepage.footer_copyright': '© 2024 Cardano DAO Platform. All rights reserved.',
    
    // Proposal Creation
    'proposal.create_title': 'Create New Proposal',
    'proposal.step_of': 'Step {current} of {total}',
    'proposal.basics': 'Proposal Basics',
    'proposal.details': 'Proposal Details',
    'proposal.voting_config': 'Voting Configuration',
    'proposal.attachments': 'Attachments',
    'proposal.review': 'Review & Submit',
    'proposal.title_label': 'Proposal Title',
    'proposal.title_placeholder': 'Enter a clear, concise title for your proposal',
    'proposal.category_label': 'Category',
    'proposal.summary_label': 'Summary',
    'proposal.summary_placeholder': 'Provide a brief summary of your proposal...',
    
    // Documentation
    'docs.title': 'Documentation',
    'docs.getting_started': 'Getting Started',
    'docs.user_guide': 'User Guide',
    'docs.developer_guide': 'Developer Guide',
    'docs.api_reference': 'API Reference',
  },
  
  vi: {
    // Navigation & Common
    'nav.dashboard': 'Bảng Điều Khiển',
    'nav.proposals': 'Đề Xuất',
    'nav.treasury': 'Kho Bạc',
    'nav.assets': 'Tài Sản',
    'nav.members': 'Thành Viên',
    'nav.governance': 'Quản Trị',
    'nav.activity': 'Hoạt Động',
    'nav.documents': 'Tài Liệu',
    'nav.settings': 'Cài Đặt',
    'nav.homepage': 'Trang Chủ',
    'nav.documentation': 'Tài Liệu Hướng Dẫn',
    
    // Common Actions
    'action.create': 'Tạo',
    'action.connect': 'Kết Nối Ví',
    'action.save': 'Lưu',
    'action.cancel': 'Hủy',
    'action.edit': 'Chỉnh Sửa',
    'action.delete': 'Xóa',
    'action.back': 'Quay Lại',
    'action.next': 'Tiếp Theo',
    'action.previous': 'Trước Đó',
    'action.submit': 'Gửi',
    'action.view': 'Xem',
    'action.close': 'Đóng',
    
    // TopBar
    'topbar.dao_name': 'DAO Đổi Mới Cardano',
    'topbar.treasury': 'Kho Bạc:',
    'topbar.search_placeholder': 'Tìm kiếm đề xuất, thành viên...',
    'topbar.create_proposal': 'Đề Xuất Của Bạn',
    'topbar.create_dao': 'DAO Của Bạn',
    
    // Dashboard
    'dashboard.title': 'Tổng Quan Bảng Điều Khiển',
    'dashboard.treasury_stats': 'Thống Kê Kho Bạc',
    'dashboard.proposal_stats': 'Thống Kê Đề Xuất',
    'dashboard.member_stats': 'Thống Kê Thành Viên',
    'dashboard.recent_activity': 'Hoạt Động Gần Đây',
    'dashboard.active_proposals': 'Đề Xuất Đang Hoạt Động',
    'dashboard.treasury_balance': 'Số Dư Kho Bạc',
    'dashboard.total_members': 'Tổng Số Thành Viên',
    'dashboard.voting_power': 'Quyền Biểu Quyết',
    
    // DAO Creation Wizard
    'wizard.create_dao': 'Tạo DAO Mới',
    'wizard.step_of': 'Bước {current} trong {total}',
    'wizard.dao_info': 'Thông Tin DAO',
    'wizard.add_members': 'Thêm Thành Viên',
    'wizard.treasury_multisig': 'Kho Bạc & Đa Chữ Ký',
    'wizard.voting_method': 'Yêu Cầu Gửi Đề Xuất',
    'wizard.governance_setup': 'Thiết Lập Quản Trị',
    'wizard.review_confirm': 'Xem Lại & Xác Nhận',
    
    // DAO Info Step
    'dao_info.title': 'Hãy cho chúng tôi biết về DAO của bạn',
    'dao_info.description': 'Cung cấp thông tin cơ bản về tổ chức tự trị phi tập trung của bạn.',
    'dao_info.name_label': 'Tên DAO',
    'dao_info.name_placeholder': 'Nhập tên DAO của bạn',
    'dao_info.symbol_label': 'Ký Hiệu Token',
    'dao_info.symbol_placeholder': 'ví dụ: INNOV',
    'dao_info.description_label': 'Mô Tả',
    'dao_info.description_placeholder': 'Mô tả sứ mệnh và mục đích của DAO...',
    'dao_info.category_label': 'Danh Mục',
    'dao_info.category_placeholder': 'Chọn danh mục',
    'dao_info.website_label': 'Trang Web (Không bắt buộc)',
    'dao_info.website_placeholder': 'https://trang-web-dao-cua-ban.com',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.spanish': 'Español',
    'language.french': 'Français',
    
    // Add more Vietnamese translations...
    'governance.title': 'Thiết Lập Quản Trị',
    'governance.epochs_info': '(1 epoch = ~5 ngày)',
    'proposal_req.anyone_title': 'Bất Kỳ Ai Có Thể Gửi',
    'time.epoch': 'epoch',
    'time.epochs': 'epochs',
    'time.immediate': 'Ngay Lập Tức',
    
    // Homepage
    'homepage.hero_title': 'Xây Dựng Tương Lai Quản Trị Cardano',
    'homepage.hero_subtitle': 'Tạo, quản lý và tham gia vào các tổ chức tự trị phi tập trung trên blockchain Cardano với công cụ mạnh mẽ và trải nghiệm người dùng liền mạch.',
    'homepage.get_started': 'Bắt Đầu',
    'homepage.explore_daos': 'Khám Phá DAOs',
    'homepage.watch_demo': 'Xem Demo',
  },
  
  es: {
    // Navigation & Common
    'nav.dashboard': 'Panel de Control',
    'nav.proposals': 'Propuestas',
    'nav.treasury': 'Tesorería',
    'nav.assets': 'Activos',
    'nav.members': 'Miembros',
    'nav.governance': 'Gobernanza',
    'nav.activity': 'Actividad',
    'nav.documents': 'Documentos',
    'nav.settings': 'Configuración',
    'nav.homepage': 'Página Principal',
    'nav.documentation': 'Documentación',
    
    // Common Actions
    'action.create': 'Crear',
    'action.connect': 'Conectar Cartera',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.edit': 'Editar',
    'action.delete': 'Eliminar',
    'action.back': 'Atrás',
    'action.next': 'Siguiente',
    'action.previous': 'Anterior',
    'action.submit': 'Enviar',
    'action.view': 'Ver',
    'action.close': 'Cerrar',
    
    // TopBar
    'topbar.dao_name': 'DAO de Innovación Cardano',
    'topbar.treasury': 'Tesorería:',
    'topbar.search_placeholder': 'Buscar propuestas, miembros...',
    'topbar.create_proposal': 'Tu Propuesta',
    'topbar.create_dao': 'Tu DAO',
    
    // Dashboard
    'dashboard.title': 'Resumen del Panel',
    'dashboard.treasury_stats': 'Estadísticas de Tesorería',
    'dashboard.proposal_stats': 'Estadísticas de Propuestas',
    'dashboard.member_stats': 'Estadísticas de Miembros',
    'dashboard.recent_activity': 'Actividad Reciente',
    'dashboard.active_proposals': 'Propuestas Activas',
    'dashboard.treasury_balance': 'Balance de Tesorería',
    'dashboard.total_members': 'Total de Miembros',
    'dashboard.voting_power': 'Poder de Voto',
    
    // DAO Creation Wizard
    'wizard.create_dao': 'Crear Nuevo DAO',
    'wizard.step_of': 'Paso {current} de {total}',
    'wizard.dao_info': 'Información del DAO',
    'wizard.add_members': 'Agregar Miembros',
    'wizard.treasury_multisig': 'Tesorería y Multifirma',
    'wizard.voting_method': 'Requisitos para Enviar Propuestas',
    'wizard.governance_setup': 'Configuración de Gobernanza',
    'wizard.review_confirm': 'Revisar y Confirmar',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.spanish': 'Español',
    'language.french': 'Français',
    
    // Add more Spanish translations...
    'governance.title': 'Configuración de Gobernanza',
    'governance.epochs_info': '(1 epoch = ~5 días)',
    'proposal_req.anyone_title': 'Cualquiera Puede Enviar',
    'time.epoch': 'época',
    'time.epochs': 'épocas',
    'time.immediate': 'Inmediato',
    
    // Homepage
    'homepage.hero_title': 'Construye el Futuro de la Gobernanza de Cardano',
    'homepage.hero_subtitle': 'Crea, gestiona y participa en organizaciones autónomas descentralizadas en la blockchain de Cardano con herramientas poderosas y experiencia de usuario fluida.',
    'homepage.get_started': 'Comenzar',
    'homepage.explore_daos': 'Explorar DAOs',
    'homepage.watch_demo': 'Ver Demo',
  },
  
  fr: {
    // Navigation & Common
    'nav.dashboard': 'Tableau de Bord',
    'nav.proposals': 'Propositions',
    'nav.treasury': 'Trésorerie',
    'nav.assets': 'Actifs',
    'nav.members': 'Membres',
    'nav.governance': 'Gouvernance',
    'nav.activity': 'Activité',
    'nav.documents': 'Documents',
    'nav.settings': 'Paramètres',
    'nav.homepage': 'Page d\'Accueil',
    'nav.documentation': 'Documentation',
    
    // Common Actions
    'action.create': 'Créer',
    'action.connect': 'Connecter Portefeuille',
    'action.save': 'Sauvegarder',
    'action.cancel': 'Annuler',
    'action.edit': 'Modifier',
    'action.delete': 'Supprimer',
    'action.back': 'Retour',
    'action.next': 'Suivant',
    'action.previous': 'Précédent',
    'action.submit': 'Soumettre',
    'action.view': 'Voir',
    'action.close': 'Fermer',
    
    // TopBar
    'topbar.dao_name': 'DAO Innovation Cardano',
    'topbar.treasury': 'Trésorerie:',
    'topbar.search_placeholder': 'Rechercher propositions, membres...',
    'topbar.create_proposal': 'Votre Proposition',
    'topbar.create_dao': 'Votre DAO',
    
    // Dashboard
    'dashboard.title': 'Aperçu du Tableau de Bord',
    'dashboard.treasury_stats': 'Statistiques de Trésorerie',
    'dashboard.proposal_stats': 'Statistiques des Propositions',
    'dashboard.member_stats': 'Statistiques des Membres',
    'dashboard.recent_activity': 'Activité Récente',
    'dashboard.active_proposals': 'Propositions Actives',
    'dashboard.treasury_balance': 'Solde de Trésorerie',
    'dashboard.total_members': 'Total des Membres',
    'dashboard.voting_power': 'Pouvoir de Vote',
    
    // DAO Creation Wizard
    'wizard.create_dao': 'Créer Nouveau DAO',
    'wizard.step_of': 'Étape {current} sur {total}',
    'wizard.dao_info': 'Informations DAO',
    'wizard.add_members': 'Ajouter Membres',
    'wizard.treasury_multisig': 'Trésorerie & Multi-signature',
    'wizard.voting_method': 'Exigences de Soumission',
    'wizard.governance_setup': 'Configuration Gouvernance',
    'wizard.review_confirm': 'Réviser et Confirmer',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.spanish': 'Español',
    'language.french': 'Français',
    'language.japanese': '日本語',
    
    // Add more French translations...
    'governance.title': 'Configuration de la Gouvernance',
    'governance.epochs_info': '(1 époque = ~5 jours)',
    'proposal_req.anyone_title': 'N\'importe Qui Peut Soumettre',
    'time.epoch': 'époque',
    'time.epochs': 'époques',
    'time.immediate': 'Immédiat',
    
    // Homepage
    'homepage.hero_title': 'Construire l\'Avenir de la Gouvernance Cardano',
    'homepage.hero_subtitle': 'Créez, gérez et participez à des organisations autonomes décentralisées sur la blockchain Cardano avec des outils puissants et une expérience utilisateur fluide.',
    'homepage.get_started': 'Commencer',
    'homepage.explore_daos': 'Explorer les DAOs',
    'homepage.watch_demo': 'Voir la Démo',
  },

  ja: {
    // Navigation & Common
    'nav.dashboard': 'ダッシュボード',
    'nav.proposals': '提案',
    'nav.treasury': '財務',
    'nav.assets': '資産',
    'nav.members': 'メンバー',
    'nav.governance': 'ガバナンス',
    'nav.activity': 'アクティビティ',
    'nav.documents': 'ドキュメント',
    'nav.settings': '設定',
    'nav.homepage': 'ホームページ',
    'nav.documentation': 'ドキュメンテーション',
    
    // Common Actions
    'action.create': '作成',
    'action.connect': 'ウォレット接続',
    'action.save': '保存',
    'action.cancel': 'キャンセル',
    'action.edit': '編集',
    'action.delete': '削除',
    'action.back': '戻る',
    'action.next': '次へ',
    'action.previous': '前へ',
    'action.submit': '送信',
    'action.view': '表示',
    'action.close': '閉じる',
    
    // TopBar
    'topbar.dao_name': 'Cardano イノベーション DAO',
    'topbar.treasury': '財務:',
    'topbar.search_placeholder': '提案、メンバーを検索...',
    'topbar.create_proposal': 'あなたの提案',
    'topbar.create_dao': 'あなたのDAO',
    
    // Dashboard
    'dashboard.title': 'ダッシュボード概要',
    'dashboard.treasury_stats': '財務統計',
    'dashboard.proposal_stats': '提案統計',
    'dashboard.member_stats': 'メンバー統計',
    'dashboard.recent_activity': '最近のアクティビティ',
    'dashboard.active_proposals': 'アクティブな提案',
    'dashboard.treasury_balance': '財務残高',
    'dashboard.total_members': '総メンバー数',
    'dashboard.voting_power': '投票権',
    
    // DAO Creation Wizard
    'wizard.create_dao': '新しいDAO作成',
    'wizard.step_of': 'ステップ {current} / {total}',
    'wizard.dao_info': 'DAO情報',
    'wizard.add_members': 'メンバー追加',
    'wizard.treasury_multisig': '財務・マルチシグ',
    'wizard.voting_method': '提案送信要件',
    'wizard.governance_setup': 'ガバナンス設定',
    'wizard.review_confirm': '確認・承認',
    
    // DAO Info Step
    'dao_info.title': 'DAOについて教えてください',
    'dao_info.description': '分散自律組織の基本情報を提供してください。',
    'dao_info.name_label': 'DAO名',
    'dao_info.name_placeholder': 'DAO名を入力',
    'dao_info.symbol_label': 'トークンシンボル',
    'dao_info.symbol_placeholder': '例: INNOV',
    'dao_info.description_label': '説明',
    'dao_info.description_placeholder': 'DAOのミッションと目的を説明してください...',
    'dao_info.category_label': 'カテゴリ',
    'dao_info.category_placeholder': 'カテゴリを選択',
    'dao_info.website_label': 'ウェブサイト（オプション）',
    'dao_info.website_placeholder': 'https://your-dao-website.com',
    
    // Governance Setup
    'governance.title': 'ガバナンス設定',
    'governance.description': 'DAOのガバナンスパラメータを設定',
    'governance.voting_requirements': '投票要件',
    'governance.timing_parameters': 'タイミングパラメータ',
    'governance.advanced_features': '高度な機能',
    'governance.quorum_percentage': 'クォーラム率',
    'governance.proposal_threshold': '提案閾値',
    'governance.proposal_bond': '提案保証金',
    'governance.voting_period': '投票期間',
    'governance.execution_delay': '実行遅延',
    'governance.enable_delegation': '委任を有効にする',
    'governance.emergency_proposals': '緊急提案',
    'governance.veto_rights': '拒否権',
    'governance.epochs_info': '(1エポック = 約5日)',
    
    // Proposal Requirements
    'proposal_req.title': '誰が提案を送信できますか？',
    'proposal_req.description': 'DAOで新しい提案を作成する権限を定義します。',
    'proposal_req.anyone_title': '誰でも送信可能',
    'proposal_req.anyone_desc': 'DAOのメンバーなら制限なく提案を送信できます。',
    'proposal_req.owner_title': 'オーナーチームのみ',
    'proposal_req.owner_desc': 'DAO創設者と指定されたチームメンバーのみが提案を送信できます。',
    'proposal_req.whitelist_title': 'ホワイトリスト',
    'proposal_req.whitelist_desc': '事前承認されたメンバーが提案を送信できます。',
    'proposal_req.big_holder_title': '大口保有者',
    'proposal_req.big_holder_desc': '最小パーセンテージのトークンを保有するメンバーが提案を送信できます。',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.spanish': 'Español',
    'language.french': 'Français',
    'language.japanese': '日本語',
    
    // Time units
    'time.epoch': 'エポック',
    'time.epochs': 'エポック',
    'time.immediate': '即座',
    
    // Settings
    'settings.title': '設定',
    'settings.description': 'DAO設定を構成',
    'settings.quick_create': 'クイック DAO 作成',
    'settings.advanced_wizard': '高度な DAO ウィザード',
    
    // Homepage
    'homepage.hero_title': 'Cardano ガバナンスの未来を構築',
    'homepage.hero_subtitle': 'Cardanoブロックチェーン上で分散自律組織を作成、管理、参加し、強力なツールとシームレスなユーザーエクスペリエンスを提供します。',
    'homepage.get_started': '始める',
    'homepage.explore_daos': 'DAOを探索',
    'homepage.watch_demo': 'デモを見る',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if there's a saved language in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && ['en', 'vi', 'es', 'fr', 'ja'].includes(saved)) {
        return saved;
      }
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('vi')) return 'vi';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('ja')) return 'ja';
      return 'en';
    }
    return 'en';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('language', language);
    
    // Set document language
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      // Fallback to English if translation not found
      return translations.en[key] || key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
