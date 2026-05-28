import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../db/context";
import type { Context } from "../graphql-context"

export class OrganizationService extends Effect.Service<OrganizationService>()('OrganizationService', {
  dependencies: [DBServices.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices

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
    }
  })
}) { }
