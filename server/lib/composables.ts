import { Effect, Layer } from "effect"
import type { Context } from "./graphql-context"

export function requireAuth(c: Context): asserts c is Context & { user: NonNullable<Context["user"]> } {
  if (!c.user) throw new Error("Unauthorized")
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
    }).pipe(Effect.provide(serviceTag.Default))
  )
}
