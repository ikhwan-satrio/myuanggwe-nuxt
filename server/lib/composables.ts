import { Effect, Layer } from "effect"
import type { Context } from "./graphql-context"
import { db } from "./db"

export function requireAuth(c: Context): asserts c is Context & { user: NonNullable<Context["user"]> } {
  if (!c.user) throw new Error("Unauthorized")
}

export function requireDeveloper(c: Context): asserts c is Context & { user: NonNullable<Context["user"]> } {
  requireAuth(c)
  if ((c.user as Record<string, unknown>).role !== "developer") throw new Error("Forbidden")
}

type ServiceWithDefault<S> = Effect.Effect<S, never, S> & { Default: Layer.Layer<S> }

export function runEffect<S, T>(
  serviceTag: ServiceWithDefault<S>,
  gen: (svc: S) => Promise<T>,
): Promise<T> {
  return Effect.runPromise(
    Effect.gen(function* () {
      const svc = yield* serviceTag
      return yield* Effect.promise(() => gen(svc))
    }).pipe(Effect.provide(serviceTag.Default))  // otomatis pakai .Default dari tag
  )
}

export async function requireRole(c: Context, ...roles: string[]): Promise<void> {
  requireAuth(c)
  if (!c.session?.activeOrganizationId) return
  const result = await db.query.member.findFirst({
    where: (m, { eq, and }) =>
      and(eq(m.userId, c.user!.id), eq(m.organizationId, c.session!.activeOrganizationId!)),
  })
  if (!result || !roles.includes(result.role)) {
    throw new Error("Forbidden")
  }
}
