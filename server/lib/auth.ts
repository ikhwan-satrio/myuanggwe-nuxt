import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { username, organization, role } from "better-auth/plugins";
import { betterAuth } from "better-auth";

const runtimeConfig = useRuntimeConfig();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  appName: "myuanggwe-nuxt",
  plugins: [
    organization({
      requireEmailVerificationOnInvitation: false,
    }),
    username()
  ],
  secret: runtimeConfig.betterAuthSecret,
  emailAndPassword: {
    enabled: true
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const member = await db.query.member.findFirst({
            where: (members, { eq }) => eq(members.userId, session.id ?? ""),
          })

          return {
            data: {
              ...session,
              ...(member?.organizationId && { activeOrganizationId: member?.organizationId }),
            },
          };
        },
      },
    },
  },
});
