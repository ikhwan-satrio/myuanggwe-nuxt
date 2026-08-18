# MyUangGwe

**Kelola Keuangan dengan Tenang** — A free, no-ad, multi-currency personal & collaborative finance tracker.

## Features

- **Multi-Wallet** — Cash, bank, credit, investment accounts in one place
- **Transactions** — Income, expense, and transfers with categories
- **Budgets** — Monthly/yearly spending limits per category
- **Recurring Transactions** — Automate bills & subscriptions (daily/weekly/monthly/yearly)
- **Financial Goals** — Savings targets with progress tracking
- **Organizations** — Team finance management with members, roles, and invitations
- **Multi-Currency** — IDR, USD, JPY, MYR, SGD with exchange rate conversion
- **Dashboard** — Overview of balances, recent transactions, and budget status
- **Dark Mode** — Full dark/light theme support
- **i18n** — Indonesian, English, Japanese, Malay, Singapore English

## Tech Stack

| Layer | Stack |
|---|---|
| **Framework** | [Nuxt 4](https://nuxt.com) (Vue 3.5, Composition API) |
| **Server** | Nitro (Nuxt server engine) |
| **API** | GraphQL via Apollo Server 4 |
| **Database** | Turso (LibSQL) via Drizzle ORM |
| **Auth** | Better Auth (email/password, organizations, username) |
| **Caching** | Upstash Redis |
| **UI** | Tailwind CSS 4 + shadcn-vue (Reka UI) |
| **State** | Pinia (UI state) + TanStack Vue Query (server state) |
| **Forms** | TanStack Vue Form + VeeValidate |
| **Tables** | TanStack Vue Table |
| **Icons** | Lucide via @nuxt/icon |
| **Effect System** | [Effect](https://effect.website) for service layer |
| **Deployment** | Vercel (Nitro preset) |

## Getting Started

```bash
aube install
aube run dev
```

Open `http://localhost:3000`.

## Commands

| Command | Purpose |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server |
| `bun run build` | Production build (Vercel) |
| `bun run generate` | Static site generation |
| `bun run preview` | Preview production build |
| Command            | Purpose                   |
| ------------------ | ------------------------- |
| `aube install`     | Install dependencies      |
| `aube run dev`     | Start dev server          |
| `aube run build`   | Production build (Vercel) |
| `aube run generate`| Static site generation    |
| `aube run preview` | Preview production build  |

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Turso database URL |
| `DATABASE_AUTH_TOKEN` | Turso auth token |
| `UPSTASH_REDIS_REST_URL` | Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST token |
| `BETTER_AUTH_SECRET` | Auth secret key |
| `BETTER_AUTH_APP_URL` | Auth app URL |
| `PUBLIC_APP_BASE_URL` | Public base URL |
| `EXCHANGE_RATE_API_KEY` | Exchange rate API key |

## Project Structure

```
├── app/                        # Frontend (Nuxt 4 app dir)
│   ├── pages/                  # Routes (landing, auth, dashboard, CRUD pages)
│   │   └── (auth-onnly)/       # Authenticated routes
│   ├── components/             # Vue components
│   │   ├── ui/                 # shadcn-vue components
│   │   ├── forms/              # Create/edit form dialogs
│   │   └── tables/             # Card/list views
│   ├── stores/                 # Pinia stores
│   ├── lib/                    # Client utilities (Apollo client, GraphQL schemas)
│   ├── plugins/                # Vue plugins
│   └── middleware/             # Auth guard
├── server/                     # Backend (Nitro)
│   ├── routes/api/             # API endpoints (GraphQL, auth, exchange rates)
│   ├── lib/                    # Server utilities
│   │   ├── services/           # Effect-based service layer
│   │   ├── db/                 # Drizzle ORM schemas + client
│   │   ├── redis/              # Redis cache wrapper
│   │   └── auth.ts             # Better Auth config
│   └── schema.graphql          # GraphQL schema
└── nuxt.config.ts
```

See [server/README.md](./server/README.md) for server architecture details.
