import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/lib/db/schemas.ts',
  out: './server/lib/db/out',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    authToken: process.env.DATABASE_AUTH_TOKEN || '',
  },
})
