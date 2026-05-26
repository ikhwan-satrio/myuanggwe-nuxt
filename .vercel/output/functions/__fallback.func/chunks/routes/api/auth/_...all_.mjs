import { n as defineEventHandler, S as toWebRequest } from '../../../nitro/nitro.mjs';
import { a as auth } from '../../../_/auth.mjs';
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
import 'better-auth/adapters/drizzle';
import 'drizzle-orm/libsql';
import '@libsql/client';
import 'drizzle-orm';
import 'drizzle-orm/sqlite-core';
import 'better-auth/plugins';
import 'better-auth';

const ____all_ = defineEventHandler(async (event) => {
  return auth.handler(toWebRequest(event));
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
