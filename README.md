# 🚀 NOVA — AI Productivity Platform

**NOVA** is an enterprise-grade, production-ready AI Productivity Platform built with **React 18**, **Vite**, **Node.js**, **Express**, **Prisma ORM**, **MongoDB Atlas**, **JWT Authentication**, and **bcrypt**.

It unifies project management, sprint velocity tracking, dynamic Kanban task boards, AI Copilot assistance, and team collaboration into an intelligent SaaS workspace.

---

## 🌐 Live Demo URLs

- **Frontend Application (Vercel)**: [https://nova-gamma-topaz.vercel.app/](https://nova-gamma-topaz.vercel.app/)
- **Backend REST API (Render)**: [https://nova-buzz.onrender.com/](https://nova-buzz.onrender.com/)
- **API Health Check**: [https://nova-buzz.onrender.com/api/health](https://nova-buzz.onrender.com/api/health)

---

## 📄 Project Description

NOVA is a full-stack SaaS application designed for modern product and software teams. It provides a landing page featuring dark-mode glassmorphism aesthetics, interactive feature showcases, pricing tiers, testimonial carousels, and an integrated video walkthrough player. 

Behind the landing page lies an authenticated SaaS workspace where users can:
- Manage multi-stage projects (Planning, In Progress, Completed, On Hold).
- Drag and transition tasks across Kanban columns (TODO, In Progress, Done).
- Interact with NOVA Copilot AI assistant for automated backlog triage and workflow drafting.
- Manage user profiles, enterprise sales leads, and newsletter subscriptions.

---

## 🛠️ Technologies Used

### Frontend (`/frontend`)
- **React 18** — Component-driven user interface framework.
- **Vite 5** — Lightning-fast development server & production bundler.
- **Vanilla CSS3** — Custom properties, design tokens, HSL colors, glassmorphism, responsive grid & flexbox layouts.
- **Lucide React** — Crisp vector icons.
- **Context API** — `AuthContext` for global session management and `ThemeContext` for dark/light themes.
- **Centralized API Client** — Reusable HTTP service layer with automatic token injection.

### Backend (`/backend`)
- **Node.js & Express.js** — Scalable RESTful API server.
- **Prisma ORM** — Type-safe object-relational mapping for MongoDB documents.
- **MongoDB Atlas** — High-availability cloud document database.
- **JWT (`jsonwebtoken`)** — Stateless authentication with Bearer tokens.
- **bcryptjs** — Password hashing with salt rounds.
- **Zod** — Payload schema validation.
- **Helmet & CORS** — Web security headers and strict cross-origin access control.
- **express-rate-limit** — Brute-force protection on authentication routes.

---

## ✨ Features

- **Authentication & Security**: Registration, Login, JWT session restoration, bcrypt password hashing, input validation, and protected routes (`/dashboard`).
- **Workspace Architecture**: Automatic default workspace creation and OWNER membership assignment upon user registration.
- **Project Management**: CRUD operations for projects with statuses (`PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`) and priority levels (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
- **Interactive Task Kanban Board**: Dynamic status switching between `TODO`, `IN_PROGRESS`, and `DONE` with instant database synchronization.
- **AI Copilot Proxy**: Secure backend proxy (`/api/ai/chat`) preventing API key exposure to browser scripts.
- **Public Contact & Newsletter**: Leads and newsletter subscriptions saved directly into database collections with duplicate prevention.
- **Stripe-Ready Architecture**: Prepared endpoints (`/api/billing/create-checkout-session`, `/api/billing/create-portal-session`, `/api/billing/webhook`).
- **Preserved Landing Page Identity**: Smooth scrolling, feature grid, interactive FAQ, pricing toggle, testimonial carousel, and responsive navigation.

---

## 🖼️ Screenshots

### Landing Page & Hero Showcase
![NOVA Landing Page](screenshots/nova_landing_page.png)

### Authenticated SaaS Dashboard & Projects Overview
![NOVA Dashboard](screenshots/nova_dashboard.png)

---

## 🚀 Installation & Local Setup Instructions

### Prerequisites
- **Node.js** v18+ installed.
- **MongoDB Atlas Connection URI** or local MongoDB instance.

### 1. Clone Repository
```bash
git clone https://github.com/dhanushmatcha/Nova.git
cd Nova
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment configuration
cp .env.example .env
```

Configure `backend/.env`:
```env
PORT=5000
DATABASE_URL="mongodb+srv://admin:Dhanu777@cluster0.grswdjk.mongodb.net/nova?appName=Cluster0"
JWT_SECRET="super-secret-jwt-key-nova-2026-xyz-987"
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

Initialize Prisma Client & Seed Database:
```bash
# Generate Prisma Client for MongoDB
npx prisma generate

# Sync collection indexes to MongoDB
npx prisma db push

# Seed demo user & workspace data
npm run db:seed

# Start backend server (Port 5000)
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create environment configuration
cp .env.example .env
```

Configure `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend Dev Server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials
- **Email**: `dhanu@example.com`
- **Password**: `StrongPassword123`

---

## 💡 Short Technical Explanation

### 1. Design Decisions
- **Custom CSS Design Tokens**: Built using vanilla CSS custom properties (variables for HSL colors, glassmorphism backdrop filters, elevation shadows, and font hierarchies) rather than heavy utility frameworks. This yields zero CSS bundle bloat, maximum design flexibility, and consistent dark-mode glassmorphism visual identity.
- **Stateful View Architecture**: Implemented custom single-page router switching combined with `ProtectedRoute` wrappers to guarantee seamless transitions between public landing pages, auth modals, and authenticated workspace views without page reloads.

### 2. Technology Choices
- **React 18 + Vite**: Chosen for instant Hot Module Replacement (HMR) during development and compact production bundle size (`dist/` built in <2 seconds).
- **Express.js + Node.js**: Chosen for non-blocking asynchronous event handling, clean middleware chaining (CORS, Helmet, Rate Limiting, Auth), and straightforward REST endpoint routing.
- **Prisma ORM + MongoDB Atlas**: Selected to provide type-safe document queries, schema validation, and automatic relationship resolving while maintaining MongoDB's flexibility and high availability.
- **JWT + bcryptjs**: Selected for stateless, scalable authentication that passes token headers safely across domain boundaries (Vercel ➔ Render).

### 3. Component Structure
The project follows a decoupled client-server architecture:
```text
nova/
├── frontend/src/
│   ├── components/    # Reusable UI sections (Hero, Navbar, Features, Modals, ProtectedRoute)
│   ├── context/       # AuthContext (session state) & ThemeContext (dark/light state)
│   ├── pages/         # LandingPage, LoginPage, RegisterPage, DashboardPage
│   ├── services/      # Centralized HTTP API client (api.js)
│   ├── App.jsx        # Root routing container
│   └── index.css      # Global CSS tokens, resets & utility utilities
└── backend/src/
    ├── controllers/   # Request controllers (Auth, User, Workspace, Project, Task, Contact, AI)
    ├── middleware/    # AuthMiddleware (JWT verification), Rate Limiter & ErrorHandler
    ├── routes/        # Express router definitions
    ├── services/      # Stripe & AI service integrations
    └── server.js      # Server entry point with dynamic port binding
```

### 4. Challenges Faced & Solutions
- **Cross-Origin Resource Sharing (CORS)**: Accessing Render API (`https://nova-buzz.onrender.com`) from Vercel (`https://nova-gamma-topaz.vercel.app`) initially posed CORS pre-flight checks. Solved by implementing dynamic origin matching in Express CORS middleware supporting explicit client origins with `credentials: true`.
- **API URL Normalization**: Ensured `frontend/src/services/api.js` automatically normalizes `import.meta.env.VITE_API_URL` regardless of whether trailing slashes or `/api` suffixes are present.
- **MongoDB ObjectId Mapping in Prisma**: MongoDB primary keys rely on `@db.ObjectId`. Configured Prisma schema models with `@id @default(auto()) @map("_id") @db.ObjectId` to guarantee schema compatibility across all relational entities.

### 5. How AI Tools Were Used
AI assistance (Google Antigravity AI agent, Gemini API Docs, and specialized coding tools) was utilized throughout development for:
- **Schema & Architecture Design**: Drafting relational & document Prisma models, foreign key cascading definitions, and index structures.
- **Scaffolding REST Controllers**: Generating Zod payload validation rules and Express controller boilerplate.
- **Diagnostic Troubleshooting**: Resolving Render dynamic port binding (`process.env.PORT || 5000`) and verifying environment variable loading.
- **Documentation Synthesis**: Formatting comprehensive setup guides, deployment architecture flowcharts, and technical API references.

---

## 🤖 AI Tools Disclosure

The following AI tools and SDKs were utilized in building NOVA:
- **Google Antigravity Agentic AI Coding Assistant**
- **Gemini API Documentation MCP Server**
- **Prisma Schema Generator**
- **Zod Validation Helper**

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Server Health Check | Public |
| `POST` | `/api/auth/register` | Register User & Workspace | Public |
| `POST` | `/api/auth/login` | Login User & Generate JWT | Public |
| `GET` | `/api/auth/me` | Fetch Current Authenticated User | Bearer JWT |
| `GET` | `/api/users/me` | Get Profile Details | Bearer JWT |
| `PUT` | `/api/users/me` | Update Profile (Name, Company, Job) | Bearer JWT |
| `GET/POST` | `/api/workspaces` | Workspace Listing & Creation | Bearer JWT |
| `GET/POST/PUT/DELETE` | `/api/projects` | Project CRUD | Bearer JWT |
| `GET/POST/PUT/DELETE` | `/api/tasks` | Task Kanban CRUD | Bearer JWT |
| `POST` | `/api/contact` | Submit Contact Lead Form | Public |
| `POST` | `/api/newsletter` | Newsletter Subscription | Public |
| `POST` | `/api/ai/chat` | AI Copilot Assistant Chat | Bearer JWT |

---

## 📄 License

MIT License © 2026 NOVA AI Platform
