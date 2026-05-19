import type { H3Event } from 'h3'
import { db } from '../db'
import type { User, Session } from 'better-auth'
import { auth } from '../auth'
import type { SessionType } from "~~/server/lib/db/schemas"

export interface GraphQLContext {
  db: typeof db
  user: User | null
  session: SessionType | null
}

export async function createContext(event: H3Event): Promise<GraphQLContext> {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  return {
    db,
    user: session?.user ?? null,
    session: session?.session ?? null,
  }
}
