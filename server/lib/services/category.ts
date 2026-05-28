import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../db/context";
import { RedisService } from "../redis/context";
import { categories } from "../db/schemas";
import type { Context } from "../graphql-context"

export class CategoryService extends Effect.Service<CategoryService>()('CategoryService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllCategories(c: Context, type?: string | null) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `categories:org:${orgId}` : `categories:user:${c.user?.id}`

        return redis.withBackendCache(key, () => {
          return db.query.categories.findMany({
            where: (ct, { eq, and }) => {
              const base = orgId ? eq(ct.organizationId, orgId) : eq(ct.userId, c.user?.id!)
              return type ? and(base, eq(ct.type, type)) : base
            },
          })
        })
      },

      async getCategory(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `category:${id}:org:${orgId}` : `category:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.categories.findFirst({
            where: (ct, { eq, and }) =>
              orgId
                ? and(eq(ct.id, id), eq(ct.organizationId, orgId))
                : and(eq(ct.id, id), eq(ct.userId, c.user?.id!)),
          }) ?? null
        })
      },

      async createCategory(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(categories).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateCategory(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(categories)
          .set(input)
          .where(
            orgId
              ? and(eq(categories.id, id), eq(categories.organizationId, orgId))
              : and(eq(categories.id, id), eq(categories.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Category not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteCategory(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(categories).where(
          orgId
            ? and(eq(categories.id, id), eq(categories.organizationId, orgId))
            : and(eq(categories.id, id), eq(categories.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
