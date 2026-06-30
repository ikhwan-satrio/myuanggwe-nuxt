import type { H3Event } from 'h3'
import { db } from './db'
import type { User } from 'better-auth'
import { auth } from './auth'
import type { SessionType } from "./db/schemas"

interface SessionWithOrg extends SessionType {
  activeOrganizationId: string | null
}

interface GraphQLContext {
  db: typeof db
  user: User | null
  session: SessionWithOrg | null
  headers: Headers
}

export async function createContext(event: H3Event): Promise<GraphQLContext> {
  const headers = event.headers
  const session = await auth.api.getSession({
    headers,
  }) as { user: User, session: SessionWithOrg }

  return {
    db,
    user: session?.user ?? null,
    session: session?.session ?? null,
    headers,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
