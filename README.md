# NOVA — AI Productivity Platform

NOVA is an enterprise-grade, production-ready AI Productivity Platform built with **React + Vite**, **Node.js + Express**, **Prisma ORM**, **MongoDB Atlas**, **JWT Authentication**, and **bcrypt**.

It unifies workspace management, project tracking, interactive Kanban task boards, AI Copilot assistance, and team collaboration into a modern SaaS interface.

---

## 🎨 Architecture & Flow

```text
                    NOVA APPLICATION

              ┌─────────────────────┐
              │   React + Vite      │
              │      Frontend       │
              │       Vercel        │
              └──────────┬──────────┘
                         │
                         │ HTTPS REST API
                         ▼
              ┌─────────────────────┐
              │   Node.js + Express │
              │       Backend       │
              │       Render        │
              └──────────┬──────────┘
                         │
                         │ Prisma ORM
                         ▼
              ┌─────────────────────┐
              │    MongoDB Atlas    │
              │     (Cloud DB)      │
              └─────────────────────┘
```

### Authentication Flow
```text
React Client
    │
    ├─► POST /api/auth/register or /api/auth/login
    │
Express Server
    │
    ├─► Input Validation (Zod)
    ├─► Password Verification (bcryptjs)
    ├─► Prisma ORM -> MongoDB Query
    ├─► Generate Signed JWT Token
    │
React Client
    │
    └─► Store JWT Token -> Access Authenticated Workspace & Dashboard
```

### Deployment Flow Diagram
```text
GitHub Repo
   │
   ├──────────────► Vercel (Frontend)
   │                 │
   │                 │ React + Vite App
   │                 ▼
   │          VITE_API_URL
   │                 │
   └──────────────► Render (Backend)
                     │
                     │ Node.js + Express API
                     ▼
                 MongoDB Atlas Cluster
```

---

## 🚀 Features

- **Preserved Premium UI & Landing Page**: Micro-animations, dark-mode glassmorphism styling, responsive hero, feature showcase, pricing tables, testimonials, interactive FAQ, and responsive mobile navigation.
- **Full Authentication System**: User registration, login, JWT token management, bcrypt password hashing, and session auto-restoration (`GET /api/auth/me`).
- **SaaS Workspace Architecture**: User creation automatically provisions default workspace and OWNER role membership.
- **Relational Data Management**:
  - **Projects**: Real CRUD operations persisted in MongoDB database with status (`PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`) and priority.
  - **Tasks**: Dynamic Kanban board (`TODO`, `IN_PROGRESS`, `DONE`) connected to database backends.
  - **User Profiles**: View and update user profile data (`name`, `company`, `jobTitle`, `avatar`).
- **Public Contact & Newsletter**: Leads and newsletter subscriptions saved cleanly into database models with duplicate email detection.
- **Backend AI Copilot Proxy**: Secure AI integration keeping API keys hidden from client browser scripts.
- **Stripe Integration Architecture**: Ready-to-connect endpoints (`/api/billing/create-checkout-session`, `/api/billing/create-portal-session`, `/api/billing/webhook`).
- **Production-Ready Security**: Helmet security headers, CORS origin restriction, Zod input validation, express-rate-limit protection, and central error handling.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Vanilla CSS Design System, Lucide Icons, Context API (`AuthContext`).
- **Backend**: Node.js, Express.js, JWT (`jsonwebtoken`), bcryptjs, Zod, Helmet, Cors, express-rate-limit.
- **ORM & Database**: Prisma ORM with **MongoDB Atlas**.
- **Deployment Targets**: Frontend on **Vercel**, Backend on **Render**, Database on **MongoDB Atlas**.

---

## 📁 Project Structure

```text
nova/
│
├── frontend/
│   ├── src/
│   │   ├── components/       # UI sections, Navbar, Footer, Modals, ProtectedRoute
│   │   ├── context/          # AuthContext & ThemeContext
│   │   ├── data/             # Features, pricing, FAQ static data
│   │   ├── hooks/            # Scroll & animation custom hooks
│   │   ├── pages/            # LandingPage, LoginPage, RegisterPage, DashboardPage
│   │   ├── services/         # Centralized API service (api.js)
│   │   ├── App.jsx           # App routing & provider setup
│   │   ├── main.jsx          # React DOM entry
│   │   └── index.css         # Custom CSS tokens & variables
│   │
│   ├── package.json
│   ├── .env.example          # VITE_API_URL template
│   └── vite.config.js
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # MongoDB models & enums
│   │   └── seed.js           # Demo user & workspace seed script
│   │
│   ├── src/
│   │   ├── config/           # Database & Prisma configuration
│   │   ├── controllers/      # Auth, User, Workspace, Project, Task, Contact, AI, Billing, Health
│   │   ├── middleware/       # AuthMiddleware (JWT verification) & ErrorHandler
│   │   ├── routes/           # REST API routes
│   │   ├── services/         # Stripe & AI proxy services
│   │   ├── validators/       # Zod payload validation schemas
│   │   ├── app.js            # Express app configuration & middleware
│   │   └── server.js         # HTTP Server listener with dynamic PORT
│   │
│   ├── package.json
│   ├── .env.example          # Backend environment variables template
│   └── .gitignore
│
├── README.md
└── .gitignore
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
DATABASE_URL="mongodb+srv://admin:Dhanu777@cluster0.grswdjk.mongodb.net/nova?appName=Cluster0"
JWT_SECRET="replace-with-a-long-random-secret"
CLIENT_URL="http://localhost:5173"
OPENAI_API_KEY=""
STRIPE_SECRET_KEY=""
NODE_ENV="development"
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Setup (MongoDB Atlas)

The database models are configured in `backend/prisma/schema.prisma`.

### Initializing Database
```bash
cd backend

# Generate Prisma Client for MongoDB
npx prisma generate

# Sync collection indexes to MongoDB Atlas
npx prisma db push

# Seed demo user & workspace data
npm run db:seed
```

### Demo Account Credentials
- **Email**: `dhanu@example.com`
- **Password**: `StrongPassword123`

---

## 📡 API Documentation

### Health Check
- `GET /api/health`: Verify API server status.

### Authentication
- `POST /api/auth/register`: Register user, create default workspace & generate JWT token.
- `POST /api/auth/login`: Authenticate email + password & return JWT token.
- `GET /api/auth/me`: Get current authenticated user details.

### Users
- `GET /api/users/me`: Get current profile details.
- `PUT /api/users/me`: Update profile (name, company, job title, avatar).

### Workspaces
- `GET /api/workspaces`: List user workspaces.
- `POST /api/workspaces`: Create a new workspace.
- `GET /api/workspaces/:id`: Fetch workspace by ID.

### Projects
- `GET /api/projects`: List workspace projects.
- `POST /api/projects`: Create project.
- `GET /api/projects/:id`: Get project details.
- `PUT /api/projects/:id`: Update project.
- `DELETE /api/projects/:id`: Delete project.

### Tasks
- `GET /api/tasks`: List workspace tasks.
- `GET /api/projects/:projectId/tasks`: List project tasks.
- `POST /api/projects/:projectId/tasks`: Create task.
- `PUT /api/tasks/:id`: Update task status/priority.
- `DELETE /api/tasks/:id`: Delete task.

### Public Leads & Newsletter
- `POST /api/contact`: Store sales/contact form submissions.
- `POST /api/newsletter`: Subscribe user to newsletter list.

### AI Assistant & Billing
- `POST /api/ai/chat`: AI chat interface.
- `POST /api/billing/create-checkout-session`: Stripe checkout session initialization.
- `POST /api/billing/create-portal-session`: Stripe billing portal session.
- `POST /api/billing/webhook`: Stripe webhook listener.

---

## 🚀 Local Installation & Execution

### Step 1: Start Backend Server
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The backend API server will start on `http://localhost:5000/api`.

### Step 2: Start Frontend Development Server
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
The React frontend will start on `http://localhost:5173`.

---

## 🌐 Deploy Backend to Render

Follow these exact steps to deploy the Express backend to **Render**:

1. Push your repository to **GitHub**.
2. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your GitHub repository (`dhanushmatcha/Nova`).
4. Configure Web Service settings:
   - **Name**: `nova-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Select closest region to users
   - **Branch**: `main`
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push`
   - **Start Command**: `npm start`
5. Add Environment Variables under **Environment** tab:
   - `DATABASE_URL`: `mongodb+srv://admin:Dhanu777@cluster0.grswdjk.mongodb.net/nova?appName=Cluster0`
   - `JWT_SECRET`: `super-secret-jwt-key-nova-2026-xyz-987`
   - `CLIENT_URL`: `https://YOUR-FRONTEND.vercel.app`
   - `NODE_ENV`: `production`
6. Click **Create Web Service**.
7. Verify deployment by visiting: `https://YOUR-RENDER-SERVICE.onrender.com/api/health`.

---

## 🌐 Deploy Frontend to Vercel

Follow these exact steps to deploy the React frontend to **Vercel**:

1. Log in to [Vercel Dashboard](https://vercel.com/) and click **Add New...** -> **Project**.
2. Import your GitHub repository (`dhanushmatcha/Nova`).
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable under **Environment Variables**:
   - `VITE_API_URL`: `https://YOUR-RENDER-SERVICE.onrender.com/api`
5. Click **Deploy**.
6. Once deployed, copy your Vercel URL (e.g. `https://nova-ai.vercel.app`).
7. Return to **Render Dashboard** and update the `CLIENT_URL` environment variable to match your new Vercel URL.

---

## 🔒 Production Security Checklist

- [x] No raw passwords in database (hashed with bcryptjs, salt 10).
- [x] Secrets (`JWT_SECRET`, `DATABASE_URL`, `OPENAI_API_KEY`) stored exclusively in server environment variables.
- [x] `.env` files added to `.gitignore`.
- [x] CORS configured with strict client origin checks.
- [x] Express helmet security headers active.
- [x] Auth rate limiting enabled (`express-rate-limit`).
- [x] Zod payload schemas enforced on input parameters.
- [x] Render dynamic `process.env.PORT` support implemented.

---

## 📄 License

MIT License © 2026 NOVA AI Platform
