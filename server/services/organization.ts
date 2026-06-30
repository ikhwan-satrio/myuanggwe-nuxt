import { Effect } from "effect";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { auth } from "../lib/auth";
import type { Context } from "../lib/graphql-context"

export class OrganizationService extends Effect.Service<OrganizationService>()('OrganizationService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getOrganizations(c: Context) {
        const members = await db.query.member.findMany({
          where: (m, { eq }) => eq(m.userId, c.user?.id!),
          with: { organization: true },
        })
        return members.map((m) => m.organization)
      },

      async getOrganization(id: string, c: Context) {
        const m = await db.query.member.findFirst({
          where: (m, { eq, and }) =>
            and(eq(m.organizationId, id), eq(m.userId, c.user?.id!)),
          with: { organization: true },
        })
        return m?.organization ?? null
      },

      async getOrganizationBySlug(slug: string, c: Context) {
        const org = await db.query.organization.findFirst({
          where: (o, { eq }) => eq(o.slug, slug),
        })
        if (!org) return null
        const m = await db.query.member.findFirst({
          where: (m, { eq, and }) =>
            and(eq(m.organizationId, org.id), eq(m.userId, c.user?.id!)),
        })
        return m ? org : null
      },

      async getMembers(organizationId: string, c: Context) {
        return db.query.member.findMany({
          where: (m, { eq }) => eq(m.organizationId, organizationId),
          with: { user: true },
        })
      },

      async createOrganization(input: Record<string, any>, c: Context) {
        const result = await auth.api.createOrganization({
          body: {
            name: input.name,
            slug: input.slug,
            logo: input.logo,
            metadata: input.metadata,
          },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, result.id)
        return result as any
      },

      async updateOrganization(id: string, input: Record<string, any>, c: Context) {
        const result = await auth.api.updateOrganization({
          body: {
            data: {
              name: input.name,
              slug: input.slug,
              logo: input.logo,
              metadata: input.metadata,
            },
            organizationId: id,
          },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, id)
        return result as any
      },

      async deleteOrganization(id: string, c: Context) {
        const result = await auth.api.deleteOrganization({
          body: { organizationId: id },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, id)
        return true
      },

      async createInvitation(organizationId: string, email: string, role: "member" | "admin" | undefined, c: Context) {
        const result = await auth.api.createInvitation({
          body: { email, role: role || 'member', organizationId },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, organizationId)
        return result as any
      },

      async removeMember(memberId: string, c: Context) {
        const m = await db.query.member.findFirst({
          where: (m, { eq }) => eq(m.id, memberId),
        })
        const result = await auth.api.removeMember({
          body: { memberIdOrEmail: memberId, organizationId: m?.organizationId },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, m?.organizationId)
        return result as any
      },

      async updateMemberRole(memberId: string, role: string, c: Context) {
        const result = await auth.api.updateMemberRole({
          body: { role, memberId },
          headers: c.headers,
        })
        await redis.invalidateUserCache(c.user?.id!, (result as any)?.organizationId)
        return result as any
      },

      async acceptInvitation(invitationId: string, c: Context) {
        const result = await auth.api.acceptInvitation({
          body: { invitationId },
          headers: c.headers,
        })
        return result as any
      },

      async rejectInvitation(invitationId: string, c: Context) {
        const result = await auth.api.rejectInvitation({
          body: { invitationId },
          headers: c.headers,
        })
        return result as any
      },

      async cancelInvitation(invitationId: string, c: Context) {
        const result = await auth.api.cancelInvitation({
          body: { invitationId },
          headers: c.headers,
        })
        return result as any
      },
    }
  })
}) { }
