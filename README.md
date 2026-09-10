# NOVA — Full-Stack AI Productivity Platform

**NOVA** is a complete, production-structured full-stack SaaS platform built with **React 18**, **Vite**, **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**. It unifies project management, workflow automation, and team collaboration into an intelligent workspace.

The application features a modern SaaS landing page, user registration, JWT authentication, user profile management, workspace organization, project CRUD, task Kanban board, AI Copilot assistant REST endpoint, and an authenticated Dashboard UI.

---

## 🏗️ Architecture Overview

```text
               ┌──────────────────────────────────────────────┐
               │              React + Vite Client             │
               │   (Landing Page + Auth Modals + Dashboard)   │
               └──────────────────────┬───────────────────────┘
                                      │ REST API (Bearer JWT)
                                      ▼
               ┌──────────────────────────────────────────────┐
               │           Node.js + Express Server           │
               │     (Zod Validation, Auth, Error Handler)    │
               └──────────────────────┬───────────────────────┘
                                      │ Prisma ORM
                                      ▼
               ┌──────────────────────────────────────────────┐
               │              PostgreSQL Database             │
               │  (Users, Workspaces, Projects, Tasks, etc.)  │
               └──────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend (`/frontend`)
- **React 18** — Component UI framework
- **Vite 5** — Build tool & dev server
- **Vanilla CSS** — Custom properties, design tokens, glassmorphism, responsive grid
- **Lucide React** — Icon library
- **AuthContext** & **Centralized API Service** — State & HTTP communication

### Backend (`/backend`)
- **Node.js & Express.js** — REST API Web Server
- **Prisma ORM** — Relational database management & migrations
- **PostgreSQL** — Relational database
- **JWT (`jsonwebtoken`)** — Stateless authentication
- **bcryptjs** — Password hashing
- **Zod** — Strict request payload validation
- **Helmet & CORS** — Web security headers and cross-origin controls

---

## 📁 Directory Structure

```text
nova/
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Landing page sections, modals, ProtectedRoute
│   │   ├── context/          # AuthContext & ThemeContext
│   │   ├── data/             # Structured mock data & features
│   │   ├── hooks/            # useScrollAnimation & useCounter
│   │   ├── pages/            # LandingPage, LoginPage, RegisterPage, DashboardPage
│   │   ├── services/         # Centralized API HTTP client (api.js)
│   │   ├── App.jsx           # Main router & AuthProvider
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Design system & tokens
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Relational PostgreSQL schema
│   │   └── seed.js           # Database seed script
│   ├── src/
│   │   ├── config/           # Database & Prisma client setup
│   │   ├── controllers/      # Auth, Users, Workspaces, Projects, Tasks, Contact, AI, Health
│   │   ├── middleware/       # AuthMiddleware (JWT verification) & ErrorHandler
│   │   ├── routes/           # Express router endpoints
│   │   ├── services/         # Stripe billing service architecture
│   │   ├── validators/       # Zod schemas for payload validation
│   │   ├── app.js            # Express application setup
│   │   └── server.js         # Entry point (Port 5000)
│   ├── .env.example          # Environment variables template
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Schema

Managed via Prisma in `backend/prisma/schema.prisma`:

- **User**: `id`, `name`, `email` (unique), `passwordHash`, `avatar`, `company`, `jobTitle`, `createdAt`, `updatedAt`
- **Workspace**: `id`, `name`, `ownerId`, `createdAt`, `updatedAt`
- **WorkspaceMember**: `id`, `workspaceId`, `userId`, `role` (`OWNER`, `ADMIN`, `MEMBER`), `createdAt`
- **Project**: `id`, `workspaceId`, `name`, `description`, `status` (`PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), `dueDate`, `createdAt`, `updatedAt`
- **Task**: `id`, `projectId`, `assignedToId`, `title`, `description`, `status` (`TODO`, `IN_PROGRESS`, `DONE`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), `dueDate`, `createdAt`, `updatedAt`
- **Subscription**: `id`, `userId`, `plan` (`FREE`, `PRO`, `BUSINESS`), `status`, `billingCycle` (`MONTHLY`, `YEARLY`), `startDate`, `endDate`, `createdAt`
- **ContactMessage**: `id`, `name`, `email`, `company`, `message`, `createdAt`
- **NewsletterSubscriber**: `id`, `email` (unique), `createdAt`

---

## 📡 API Endpoint Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register new user, create default workspace & JWT | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | ❌ |
| `GET` | `/api/auth/me` | Fetch authenticated user & workspace info | ✅ |

### User Profile (`/api/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/users/me` | Get current profile | ✅ |
| `PUT` | `/api/users/me` | Update profile information | ✅ |

### Workspaces (`/api/workspaces`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/workspaces` | Fetch user workspaces | ✅ |
| `POST` | `/api/workspaces` | Create new workspace | ✅ |
| `GET` | `/api/workspaces/:workspaceId/members` | Get workspace members | ✅ |

### Projects (`/api/projects`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/projects` | Fetch workspace projects | ✅ |
| `POST` | `/api/projects` | Create new project | ✅ |
| `GET` | `/api/projects/:id` | Fetch project details | ✅ |
| `PUT` | `/api/projects/:id` | Update project details | ✅ |
| `DELETE` | `/api/projects/:id` | Delete project | ✅ |

### Tasks (`/api/tasks` & `/api/projects/:projectId/tasks`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/tasks` | Fetch all workspace tasks | ✅ |
| `GET` | `/api/projects/:projectId/tasks` | Fetch tasks for specific project | ✅ |
| `POST` | `/api/projects/:projectId/tasks` | Create new task | ✅ |
| `PUT` | `/api/tasks/:id` | Update task status/priority | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete task | ✅ |

### Public Leads & Newsletter
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/contact` | Submit contact/sales lead form | ❌ |
| `POST` | `/api/newsletter` | Subscribe email to newsletter | ❌ |

### AI Assistant & Health Check
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/ai/chat` | AI Copilot response engine | ✅ |
| `GET` | `/api/health` | API server health check | ❌ |

---

## 🚀 Local Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install

# Copy environment template
cp .env.example .env

# Generate Prisma Client & Run Migrations (when PostgreSQL is running)
npx prisma generate
npx prisma db push
npx prisma db seed

# Start Express REST API Server (Port 5000)
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Start Vite Development Server (Port 3000)
npm run dev
```

---

## 🔑 Demo Credentials

- **Email**: `dhanu@example.com`
- **Password**: `StrongPassword123`

---

## 🛡️ Security Best Practices Implemented

- Passwords are strictly hashed with **bcryptjs** (salt rounds: 10).
- Requests authorized using **JSON Web Tokens (JWT)** passed in `Authorization: Bearer <token>` headers.
- Input data validated on the server using **Zod**.
- Sensitive environment variables (`JWT_SECRET`, `DATABASE_URL`, `OPENAI_API_KEY`) loaded via `dotenv`.
- Production bundle protected against cross-origin scripting with **Helmet**.

---

## 🤖 AI Tools Disclosure

AI assistance was utilized during development for:
- Database relational schema design & Prisma mapping
- REST API controller & Express router scaffolding
- Zod schema validation rules
- Component structure refinement & documentation synthesis

*All code was reviewed, refactored, customized, and verified for production standards.*
