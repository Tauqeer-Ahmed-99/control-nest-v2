import { boolean, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { resourceStatus, timestampDefault } from "../common";
import { controllerDevices } from "./controller-devices";

export const houses = pgTable(
  "houses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    controllerDeviceId: uuid("controllerDeviceId")
      .notNull()
      .references(() => controllerDevices.id),
    name: text("name").notNull(),
    resourceStatus: resourceStatus(),
    createdAt: timestampDefault("createdAt"),
    createdBy: text("createdBy").notNull(),
    modifiedAt: timestampDefault("modifiedAt", { frequent: true }),
    modifiedBy: text("modifiedBy"),
  },
  (table) => [
    index("house_controller_device_index").on(table.controllerDeviceId),
  ],
);

export const houseMembers = pgTable(
  "house_members",
  {
    userId: text("userId"),
    houseId: uuid("houseId")
      .notNull()
      .references(() => houses.id),
    name: text("name").notNull(),
    isAdmin: boolean("isAdmin").notNull().default(false),
    resourceStatus: resourceStatus(),
    createdAt: timestampDefault("createdAt"),
    createdBy: text("createdBy").notNull(),
    modifiedAt: timestampDefault("modifiedAt", { frequent: true }),
    modifiedBy: text("modifiedBy"),
  },
  (table) => [
    index("house_member_user_index").on(table.userId),
    index("house_member_house_index").on(table.houseId),
  ],
);
