# Server — MyUangGwe Backend

Nitro server with Apollo GraphQL, Drizzle ORM (Turso/LibSQL), Better Auth, Upstash Redis, and Effect.ts service layer.

## Architecture

```
server/
├── routes/api/
│   ├── graphql.ts                # Apollo GraphQL endpoint (all resolvers)
│   ├── exchange-rates.ts         # Exchange rate proxy API
│   └── auth/[...all].ts          # Better Auth API routes
├── lib/
│   ├── auth.ts                   # Better Auth config (email+password, org, username)
│   ├── graphql-context.ts        # GraphQL context factory (db, user, session)
│   ├── db/
│   │   ├── index.ts              # Drizzle + LibSQL client
│   │   ├── context.ts            # Effect service tag for DB
│   │   └── schemas.ts           # Full Drizzle schema + relations
│   ├── redis/
│   │   ├── index.ts              # Redis client, cache helpers, logging
│   │   └── context.ts            # Effect service tag for Redis
│   └── services/                 # Effect-based service layer (one per entity)
│       ├── wallet.ts             # WalletService — full CRUD
│       ├── category.ts           # CategoryService — full CRUD
│       ├── transaction.ts        # TransactionService — full CRUD
│       ├── budget.ts             # BudgetService — full CRUD
│       ├── recurring.ts          # RecurringTransactionService — full CRUD
│       ├── goal.ts               # FinancialGoalService — full CRUD
│       └── organization.ts       # OrganizationService — queries only
└── schema.graphql               # GraphQL type definitions
```

## GraphQL

- **Endpoint:** `POST /api/graphql`
- **Schema:** `server/schema.graphql` (auto-imported as `#graphql/schema`)
- **Context:** Provides `db`, `user`, `session` with `activeOrganizationId`

All resolvers check authentication and scope queries by `session.activeOrganizationId` (when set) or `user.id`.

## Service Layer (Effect.ts)

Each entity has a service class extending `Effect.Service`:

```ts
export class WalletService extends Effect.Service<WalletService>()('WalletService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      // Queries (with Redis caching via withBackendCache)
      getAllWallets(c: Context): Promise<Wallet[]>
      getWallet(id: string, c: Context): Promise<Wallet | null>

      // Mutations (with cache invalidation)
      createWallet(input, c: Context): Promise<Wallet>
      updateWallet(id, input, c: Context): Promise<Wallet>
      deleteWallet(id, c: Context): Promise<boolean>
    }
  })
}) { }
```

Resolvers use `Effect.runPromise` with `Effect.provide(Service.Default)`:

```ts
wallets: async (_, __, c) => {
  if (!c.user) throw new Error('Unauthorized')
  return Effect.runPromise(
    Effect.gen(function* () {
      const svc = yield* WalletService
      return yield* Effect.promise(() => svc.getAllWallets(c))
    }).pipe(Effect.provide(WalletService.Default))
  )
}
```

## Database

- **Provider:** Turso (LibSQL)
- **ORM:** Drizzle with `@libsql/client`
- **Key conventions:**
  - Amounts stored as **integers** (no floats)
  - `exchangeRate` uses **1,000,000 multiplier** for precision
  - Primary keys use `crypto.randomUUID()`, not auto-increment
  - App tables use `{ mode: 'timestamp' }` (Unix epoch seconds)
  - Better Auth tables use `{ mode: 'timestamp_ms' }`

## Caching

- **Provider:** Upstash Redis
- **Wrapper:** `withBackendCache(key, fetcher, ttl?)` — cache-aside pattern
- **Default TTL:** 10 minutes
- **Key pattern:** `<entity>:user:<userId>` or `<entity>:org:<orgId>`
- **Invalidation:** Every mutation calls `invalidateUserCache(userId, orgId?)` to clear all related keys

## Auth

- **Library:** Better Auth
- **Plugins:** `emailAndPassword`, `organization()`, `username()`
- Session carries `activeOrganizationId` for organization-scoped data access
- Auth middleware redirects unauthenticated users to `/auth`

## Data Models

| Entity | Description |
|---|---|
| User | Profile with email, username |
| Wallet | Financial accounts (cash, bank, credit, investment) |
| Category | Transaction categories with icon and type |
| Transaction | income/expense/transfer records |
| Budget | Monthly/yearly spending limits per category |
| RecurringTransaction | Automated repeated transactions |
| FinancialGoal | Savings targets with deadline |
| Organization | Groups for collaborative finance |
| Member | Users with roles (owner, admin, member) |
| Invitation | Email-based invites |
