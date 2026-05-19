import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as DBschema from './schemas';

const runtime = useRuntimeConfig()

const client = createClient({
  url: runtime.databaseUrl,
  authToken: runtime.databaseAuthToken,
});

export const db = drizzle(client, { schema: DBschema });
