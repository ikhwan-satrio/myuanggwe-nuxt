# AGENTS.md

## Commands

- `bun install` — install deps (bun is the package manager; don't use npm/pnpm/yarn)
- `bun run dev` — dev server at `http://localhost:3000`
- `bun run build` — production build (Nitro preset: vercel)
- `bun run generate` — static site generation
- `bun run preview` — preview production build
- `bun run postinstall` → runs `nuxt prepare` (auto after install; generates `.nuxt/` types)
- No lint, typecheck, or test scripts exist.

## Structure

Nuxt 4 (`app/` directory layout):
- `app/` — frontend (pages, components, composables, lib, stores, middleware, plugins)
- `app/pages/(auth-onnly)/` — authenticated routes (guarded by `app/middleware/auth.ts`)
- `server/` — Nitro backend
- `server/routes/api/graphql.ts` — Apollo GraphQL server (typeDefs / resolvers in one file)
- `server/lib/db/` — Drizzle ORM + LibSQL (Turso) client
- `server/lib/auth.ts` — Better Auth config
- `server/lib/redis.ts` — Upstash Redis cache wrapper

## GraphQL

- Schema: `server/schema.graphql` → auto-imported as `#graphql/schema`
- Context: `server/lib/graphql/context.ts` — provides `db`, `user`, `session`
- Endpoint: `POST /api/graphql`
- All resolvers check auth, and scope queries by `session.activeOrganizationId` (when set) or `user.id`
- Mutations **must** call `invalidateUserCache(user.id, orgId)` from `server/lib/redis.ts`

## Database

- LibSQL (Turso) via Drizzle ORM
- Schemas: `server/lib/db/schemas.ts` (app tables + Better Auth tables)
- App tables use `{ mode: 'timestamp' }` (Unix epoch seconds); Better Auth tables use `{ mode: 'timestamp_ms' }`
- Primary keys use `crypto.randomUUID()`, not auto-increment
- No `drizzle.config` or migration commands found locally — schema may be pushed directly

## Auth

- Better Auth with `emailAndPassword`, `organization()`, `username()` plugins
- Server config: `server/lib/auth.ts`
- Client plugin: `app/plugins/auth-client.ts`
- Middleware `app/middleware/auth.ts` redirects unauthenticated users to `/auth`
- Session carries `activeOrganizationId` — used to scope all queries to an org or personal scope

## UI / Styling

- Tailwind CSS 4 with `@tailwindcss/vite` plugin
- shadcn-vue components in `app/components/ui/` (reka-ui based)
- Use `cn()` from `app/lib/utils.ts` for class merging
- Dark mode via `@nuxtjs/color-mode`
- Icons: Lucide via `@nuxt/icon`

## i18n

- 5 locales: `id` (default), `en`, `jp`, `my`, `sg`
- Cookie-based detection: `i18n_locale`
- Config in `nuxt.config.ts` `i18n` section

## Caching

- Upstash Redis for server-side caching via `withBackendCache(key, fetcher, ttl?)`
- Cache keys follow pattern `<entity>:user:<userId>` or `<entity>:org:<orgId>`
- Default TTL: 10 minutes
- Every mutation invalidates relevant cache keys

## CRUD Page Pattern

Each CRUD entity (wallets, categories, budgets, recurring, goals) follows this structure:
- **Page** (`app/pages/`) — data fetching via `useAsyncData` + Apollo, delete mutation, thin template
- **Form components** (`app/components/forms/<entity>/`) — create/edit dialogs/sheets, self-contained mutations
- **Table components** (`app/components/tables/<entity>/`) — card/list views with skeleton/empty states
- **Pinia store** (`app/stores/crud/<entity>.ts`) — shared UI state (dialog open/close, editing item) so components don't need props for dialog coordination

## Conventions

- Amounts stored as integers; `exchangeRate` uses 1,000,000 multiplier for precision
- `<script setup lang="ts">` for all Vue components
- Runtime validation: Zod or Arktype
- State management: Pinia for CRUD UI state (dialog/sheet open, editing item), TanStack Vue Query for server data
- GraphQL resolvers live in `server/routes/api/graphql.ts` (not split by entity)
