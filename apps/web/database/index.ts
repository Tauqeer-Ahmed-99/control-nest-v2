import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { relations } from "./relations";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const database = drizzle({ client: pool, relations });

export default database;
