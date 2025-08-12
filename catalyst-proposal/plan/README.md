# Plan

#### 🧩 **Milestone 1 – UI/UX Design & DAO Architecture Planning (Month 1)**

* **Main task:**
  * Conduct research on existing DAO platforms (Snapshot, Clarity, SummonDAO...)
  * Design UI/UX for multi-functional DAO platform supporting on-chain/off-chain voting, multi-sig, and DAO directory
  * Define system architecture and technical scope
* **Output:**
  * Wireframes and mockups for key features (voting, proposal, DAO hub)
  * System blueprint (data flow, component interaction, DAO types)
* **Deliverable:**
  * Figma designs for homepage, create DAO flow, proposal page, voting interface, DAO hub
  * Documentation of technical architecture and feature specs
  * Open GitHub repo initialized with structure and planning docs
* **Budget:** **20,850 ADA**

***

#### 🧩 **Milestone 2 – Voting Mechanism Integration (Month 2–3)**

* **Main task:**
  * Implement frontend logic for off-chain voting and on-chain voting options
  * Connect to wallet APIs (CIP-30, Nami, Eternl...)
  * Simulate voting lifecycle with placeholder contracts/scripts
* **Output:**
  * Voting component (proposal display, options, cast vote, vote count)
  * Wallet integration and signing process
  * Backend logic stubbed (to be extended in future)
* **Deliverable:**
  * React-based frontend connected to Cardano wallet
  * Dummy data and voting simulation working in-browser
  * Gitbook pages explaining voting types and flow
* **Budget:** **21,675 ADA**

***

#### 🧩 **Milestone 3 – Multi-Sig & DAO Management Modules (Month 3–4)**

* **Main task:**
  * Develop interface for creating and managing DAO using multi-sig
  * Support DAO metadata entry, member roles, treasury address configuration
  * Simulate proposal submission and approval using multi-sig logic
* **Output:**
  * DAO Creation Wizard (name, policy, members, config)
  * Multi-sig logic simulation in frontend (mock signatures, quorum logic)
* **Deliverable:**
  * Create DAO UI fully functional with front-end logic
  * DAO profile page with editable metadata
  * GitHub source code for DAO management module
  * Gitbook update on DAO creation and multi-sig mechanism
* **Budget:** **20,707 ADA**

***

#### 🧩 **Milestone 4 – DAO Hub Integration & Cross-DAO Explorer (Month 5)**

* **Main task:**
  * Build explorer page to show data from external DAOs (on-chain / off-chain)
  * Implement logic to **close out proposals** and display finalized statuses
  * Integrate DAO registry or allow manual import of DAO metadata
* **Output:**
  * DAO overview section listing multiple DAOs
  * Stats view (number of proposals, members, latest activity)
  * Proposal lifecycle handler (active → closed → archived)
* **Deliverable:**
  * Functional DAO Hub + DAO Explorer in UI
  * Script/API to fetch and render external DAO metadata
  * Proposal close-out module (finalize voting, update status)
  * Final Gitbook documentation and close-out report for this proposal
* **Budget:** **20,533 ADA**
