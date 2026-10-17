// import { neon } from "@neondatabase/serverless"
// import { drizzle } from 'drizzle-orm/neon-http'
// import * as schema from './schema';

// const sql = neon(process.env.DATABASE_URL!)
// export const db = drizzle(sql, { schema });

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./schema";
neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema,
});