# GEMINI.md - Project Context & Instructions

This file provides the necessary context and instructions for AI agents working on the **myuanggwe-nuxt** project.

## Project Overview

**myuanggwe-nuxt** is a comprehensive finance management application built with **Nuxt 4**. It supports personal and organizational financial tracking, including wallets, categories, transactions, budgets, and financial goals.

### Main Technologies

- **Frontend Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3, Vite)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn-nuxt](https://ui.shadcn.com/) / [reka-ui](https://reka-ui.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Data Fetching & State:** [TanStack Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview) & [TanStack Vue DB](https://tanstack.com/vue-db)
- **Database & ORM:** [LibSQL](https://turso.tech/libsql) (SQLite) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (with Organization and Username plugins)
- **Utilities:** [VueUse](https://vueuse.org/), [Zod](https://zod.dev/), [Effect](https://effect.website/)
- **Caching/Queue:** [Upstash Redis](https://upstash.com/redis)

## Project Structure

The project follows the **Nuxt 4** directory structure (with the `app/` folder).

- `app/`: Main frontend application code.
  - `assets/css/main.css`: Global Tailwind CSS 4 styles.
  - `components/`: Vue components. Business logic components and `ui/` (shadcn).
  - `composables/`: Reusable Vue composables.
  - `lib/`: Shared client-side logic, DTOs, and TanStack collections.
  - `pages/`: Nuxt pages (routing).
  - `plugins/`: Client-side Nuxt plugins.
  - `stores/`: Pinia stores.
- `server/`: Backend Nitro server code.
  - `lib/`: Server-only libraries (DB client, Auth configuration, Redis).
  - `routes/`: API endpoints.
- `public/`: Static assets.

## Key Development Workflows

### Building and Running

- **Development:** `pnpm dev`
- **Build:** `pnpm build`
- **Preview Production:** `pnpm preview`
- **Database Migrations (Drizzle):** Use `drizzle-kit` for schema management and migrations. (TODO: Verify specific commands for this project).

### Coding Standards

- **TypeScript:** Strict typing is preferred. Use Zod or Arktype for runtime validation.
- **Components:** Use the `script setup` syntax for Vue components. Prefer functional and reusable components.
- **Styling:** Adhere to Tailwind CSS 4 conventions. Use `cn` utility from `app/lib/utils.ts` for class merging.
- **Database:** Define schemas in `server/lib/db/schemas.ts`. Use Drizzle's relational query API when appropriate.
- **State:** Use Pinia for global UI state. Use TanStack Query/Vue DB for server-synced data.

### Authentication

The project uses **Better Auth**. Auth configuration is located in `server/lib/auth.ts`. Organizations are supported via the Better Auth plugin.

## Future Instructions

- When adding new features, ensure they are compatible with the Nuxt 4 structure.
- Always check `server/lib/db/schemas.ts` before creating new database-related features.
- Maintain consistency with the existing shadcn-based UI patterns.
