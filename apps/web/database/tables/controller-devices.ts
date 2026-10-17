import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { resourceStatus, timestampDefault } from "../common";

export const controllerDevices = pgTable("controller_devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  resourceStatus: resourceStatus(),
  createdAt: timestampDefault("createdAt"),
  createdBy: text("createdBy").notNull(),
  modifiedAt: timestampDefault("modifiedAt", { frequent: true }),
  modifiedBy: text("modifiedBy"),
});
