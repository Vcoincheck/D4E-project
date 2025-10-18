# 🌐 D4E Project

A modular DAO management platform built with **React + TypeScript**, featuring an **AppShell architecture**, dynamic routing, and reusable UI components (powered by [shadcn/ui](https://ui.shadcn.com)).

---

## 🚀 Features

- 🧱 **Modular structure** — clear separation between layouts, pages, and features  
- 🧭 **AppShell layout** — shared sidebar, topbar, and footer  
- 🧩 **Component-based architecture** — reusable UI elements under `/ui`  
- ⚙️ **TypeScript** — strong typing for safety and scalability  
- 💬 **Multi-language support** via `LanguageProvider`  
- 🎨 **Theme customization** using `ThemeProvider`  
- 🔗 **WalletConnect integration**  
- 📦 **DAO creation wizard**, **proposal steps**, and **governance tools**

---

## 🗂 Project Structure

src/
│
├── app/
│ ├── App.tsx # Router + AppShell layout
│ ├── layouts/ # Global shell components
│ │ ├── AppShell.tsx
│ │ ├── Sidebar.tsx
│ │ ├── TopBar.tsx
│ │ └── Footer.tsx
│ ├── routes/ # Page routes (DAO, Dashboard, Docs, etc.)
│ ├── features/ # Domain-specific modules (DAO, Proposal, etc.)
│ ├── ui/ # shadcn-based reusable UI components
│ ├── providers/ # Theme, Language, Wallet contexts
│ ├── assets/ # Static images, logos, icons
│ ├── hooks/ # Custom React hooks
│ └── index.css
│
└── main.tsx # ReactDOM entry point

yaml
Copy code

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-org>/D4E-project.git
cd D4E-project
2. Install dependencies
bash
Copy code
npm install
3. Run the development server
bash
Copy code
npm run dev
App will start on http://localhost:5173

🧰 Tech Stack
Category	Tools
Framework	React + TypeScript
Routing	React Router v6
UI Library	Shadcn/UI, Radix Primitives
Styling	TailwindCSS
State Management	React Context / Hooks
Wallet Integration	WalletConnect
Build Tool	Vite

🧪 Scripts
Command	Description
npm run dev	Start the development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint checks

📚 Development Notes
Each feature module (e.g., DAO, Proposal) contains:

components/ → UI blocks

steps/ → wizard step logic

hooks/ → internal logic

Global providers (Theme, Language, Wallet) are initialized in /src/app/providers.

🤝 Contributing
Contributions are welcome!
Fork the repo, create a feature branch, and submit a PR.
