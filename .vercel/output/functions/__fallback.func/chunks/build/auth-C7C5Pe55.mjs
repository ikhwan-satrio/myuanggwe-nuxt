import { u as executeAsync } from '../nitro/nitro.mjs';
import { u as defineNuxtRouteMiddleware, D as useNuxtApp, E as useRequestHeaders, w as navigateTo } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@iconify/utils';
import 'consola';
import 'xss';
import 'vue';
import 'pinia';
import '@tanstack/vue-query';
import 'perfect-debounce';
import '@vue/shared';
import '@iconify/vue';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'vue/server-renderer';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import '@lucide/vue';
import '@iconify/utils/lib/css/icon';
import 'class-variance-authority';
import 'vue-sonner';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const auth = defineNuxtRouteMiddleware(async () => {
  let __temp, __restore;
  const { $authClient } = useNuxtApp();
  const users = ([__temp, __restore] = executeAsync(() => $authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(["cookie"])
    }
  })), __temp = await __temp, __restore(), __temp);
  if (!users.data?.user) return navigateTo("/auth");
});

export { auth as default };
//# sourceMappingURL=auth-C7C5Pe55.mjs.map
