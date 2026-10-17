import "dotenv/config";
import { type Config, defineConfig } from "drizzle-kit";

import env from "./env/vars";

const config: Config & { dbCredentials: { url: string } } = {
  out: "./database/migrations/development",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.variables.DEV_DATABASE_URL,
  },
};

if (env.variables.DB_ENV === "production") {
  config.out = "./database/migrations/production";
  config.dbCredentials.url = env.variables.PROD_DATABASE_URL;
}

console.log("Drizzle Config:");
console.log(JSON.stringify(config, null, 2));

export default defineConfig(config);
