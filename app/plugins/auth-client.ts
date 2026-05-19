import { createAuthClient } from "better-auth/vue";
import type { auth } from "~~/server/lib/auth";
import {
  inferAdditionalFields,
  usernameClient,
  organizationClient,
} from "better-auth/client/plugins";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig(); // ✅ Aman di dalam plugin

  const authClient = createAuthClient({
    baseURL: runtimeConfig.public.appBaseUrl,
    plugins: [
      inferAdditionalFields<typeof auth>(),
      usernameClient(),
      organizationClient(),
    ],
  });

  return {
    provide: {
      authClient,
    },
  };
});
