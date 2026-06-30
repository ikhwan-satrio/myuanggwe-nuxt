import { Effect } from "effect";
import { eq } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { auth } from "../lib/auth";
import { user } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class UserService extends Effect.Service<UserService>()('UserService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async signUp(input: Record<string, any>, c: Context) {
        const result = await auth.api.signUpEmail({
          body: {
            email: input.email,
            password: input.password,
            name: input.name,
            username: input.username,
          },
          headers: c.headers,
        })
        return result as any
      },

      async signIn(input: Record<string, any>, c: Context) {
        const result = await auth.api.signInEmail({
          body: {
            email: input.email,
            password: input.password,
          },
          headers: c.headers,
        })
        return result as any
      },

      async signOut(c: Context) {
        await auth.api.signOut({ headers: c.headers })
        return true
      },

      async updateUser(input: Record<string, any>, c: Context) {
        await auth.api.updateUser({
          body: input,
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!)
        const [updated] = await db.select().from(user).where(eq(user.id, c.user?.id!))
        return updated
      },

      async changePassword(currentPassword: string, newPassword: string, c: Context) {
        await auth.api.changePassword({
          body: { currentPassword, newPassword },
          headers: c.headers,
        })
        return true
      },

      async getInvitations(c: Context) {
        return db.query.invitation.findMany({
          where: (i, { eq }) => eq(i.email, c.user?.email!),
          with: { organization: true, inviter: true },
        })
      },
    }
  })
}) { }
