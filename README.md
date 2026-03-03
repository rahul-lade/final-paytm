<div align="center">
  <h1 align="center">🚀 Paytm Clone</h1>
  <h3>A production-grade, highly scalable financial wallet monorepo.</h3>

  <p align="center">
    <a href="https://github.com/rahul-lade/final-paytm/commits/main">
      <img src="https://img.shields.io/github/last-commit/rahul-lade/final-paytm.svg?style=flat-square&color=0080FF" alt="last commit" />
    </a>
    <a href="https://github.com/rahul-lade/final-paytm/issues">
      <img src="https://img.shields.io/github/issues/rahul-lade/final-paytm.svg?style=flat-square&color=0080FF" alt="issues" />
    </a>
    <a href="https://github.com/rahul-lade/final-paytm/pulls">
      <img src="https://img.shields.io/github/issues-pr/rahul-lade/final-paytm.svg?style=flat-square&color=0080FF" alt="pull requests" />
    </a>
  </p>
</div>

---

## 📖 Problem Statement
Building a financial application requires addressing critical engineering challenges: maintaining atomic transactions to prevent double-spending, creating a secure system for bank webhooks, managing complex state across multiple UIs, and scaling the codebase as different consumer domains (Users vs Merchants) evolve. 

## 💡 Solution Overview
This project is a high-performance **FinTech Monorepo** modeled after Paytm. It cleanly separates the core domains into individual applications (`user-app`, `merchant-app`, `bank-webhook`) while sharing core business logic, database client, and UI elements via deeply integrated local packages. Built for performance, security, and developer experience.

## ✨ Key Features
- 💸 **P2P Money Transfers:** Instant, secure, and atomic peer-to-peer wallet transfers avoiding race conditions.
- 🏦 **Dedicated Bank Webhook:** An independent, scalable Express.js server to asynchronously process simulated on-ramp bank transactions and credit user wallets safely.
- 🔐 **Robust Authentication:** Secure authentication leveraging Auth.js (NextAuth) with JWT strategies, Credentials, Google, and GitHub OAuth support.
- 📊 **Transaction Ledgers & Dashboards:** Rich, interactive dashboards highlighting wallet balances and transaction histories utilizing Recharts.
- 🛡️ **End-to-End Type Safety:** Strict TypeScript and Zod schemas shared across the frontend and backend to guarantee data integrity.

## 🛠 Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4 & Tailwind Animate
- shadcn/ui (Radix UI)
- Jotai (Atomic State Management)
- Recharts

**Backend Layer**
- Next.js Server Actions & API Routes
- Node.js + Express.js (Bank Webhook Server built with `esbuild`)

**Database & Modeling**
- PostgreSQL
- Prisma ORM (`@repo/db`)

**DevOps, Architecture & Quality**
- Turborepo (High-performance Monorepo build system)
- pnpm Workspaces
- ESLint Flat Config + Prettier
- Strict TypeScript configurations

## 🏗 Architecture & Repository Structure

The project strictly follows a monorepo setup orchestrated by **Turborepo** to maximize code-sharing, enable advanced caching, and guarantee type safety.

```text
├── apps/
│   ├── user-app/        # Core Next.js B2C application for handling users' wallets, profiles, and P2P transfers.
│   ├── merchant-app/    # B2B application dashboard and payment flow interface for merchants.
│   └── bank-webhook/    # High-throughput Express endpoint serving as a hook receiver for simulated incoming bank netbanking/UPI additions.
└── packages/
    ├── db/              # Single Source of Truth for the Prisma schema and the generated Prisma Client Singleton.
    ├── ui/              # Sharable robust Design System built over Tailwind & Radix UI.
    ├── validators/      # Isomorphic Zod validators to validate data structures shared across client and server.
    ├── eslint-config/   # Unified ESLint governance for Next.js, React, and Node tooling.
    └── typescript-config/ # Strict TS base configurations extended globally.
```

### Flow of Funds (On-Ramp Architecture)
1. User requests to add funds via `user-app`. E.g., Adding $100 to the wallet.
2. An `OnRampTransaction` is initialized in the DB as `Processing`.
3. The mock banking partner processes the payment and makes a POST call to `bank-webhook`.
4. The Webhook securely matches the transaction token and uses an **Atomic Database Transaction** (`prisma.$transaction`) to increment the user's `Balance` and mark the `OnRampTransaction` as `Success`.

## ⚙️ Installation & Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9.15+)
- PostgreSQL Database (Local or Neon/Supabase)

### 2. Clone and Install
```bash
git clone https://github.com/rahul-lade/final-paytm.git
cd final-paytm
pnpm install
```

### 3. Environment Configuration
Create an `.env` file at `packages/db/.env` (and respective app folders if defined):
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/paytm"

# Auth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your_highly_secure_random_string"
```

### 4. Database Seeding & Migrations
```bash
# Push the Prisma schema state to the DB
pnpm --filter @repo/db prisma db push

# (Optional) Seed the database with mock users and merchants
pnpm --filter @repo/db prisma db seed
```

### 5. Start Development Servers
Run the whole monorepo stack with a single command leveraging Turborepo:
```bash
pnpm dev
```
- **User App:** `http://localhost:3001`
- **Merchant App:** `http://localhost:3002`
- **Bank Webhook:** `http://localhost:3003` (Simulate via postman/curl)

## 🗄️ Core Database Schema

- **`User` & `Merchant`**: Distinct authentication layers.
- **`Balance`**: Locked to a single User mapping, tracks integer-based funds (cents/paise to avoid float precision issues).
- **`p2pTransfer`**: Double entry tracking for auditing from-to wallet flow.
- **`OnRampTransaction`**: Time-series log mapping Webhook tokens directly to fiat ingestion processing.

## 🚀 Performance & Scalability Considerations
- **Atomic Operations:** Uses `prisma.$transaction()` extensively to prevent race conditions during concurrent financial transfers.
- **Microservice Separation:** Decoupled `bank-webhook` avoids locking up the main `user-app` SSR process during intense third-party processing limits.
- **Integers for Currency:** Amounts in the DB are strict Integers to eliminate disastrous IEEE 754 floating point arithmetic precision errors.
- **Turbo Caching:** CI/CD builds are drastically accelerated through Turborepo's local and remote artifact caching mechanics.

## 🔒 Security Practices
- **Strict Role-Based Auth:** Distinct boundaries between Merchants and Users.
- **Server Actions over API Routes:** Utilizes Next.js Server Actions with embedded JWT validation checks before any sensitive Prisma executions.
- **Validation Before Interaction:** All API payloads and server mutations are heavily vetted through `@repo/validators` utilizing Zod. 

## 🚧 Future Improvements (Roadmap)
- [ ] Implement message queues (`RabbitMQ` / `Kafka`) for high-throughput transactional logging.
- [ ] Integrate a real PG (Payment Gateway) sandbox (e.g. Stripe or Razorpay) alongside the bank webhook.
- [ ] E2E Testing using Playwright for critical UI transaction flows.
- [ ] Implement robust Redis-based rate limiting on all API routes.

---
*Built from the ground up to explore best-in-class full-stack architecture paradigms.*