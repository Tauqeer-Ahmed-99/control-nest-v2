import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  controllerDevices: {
    house: r.one.houses({
      from: r.controllerDevices.id,
      to: r.houses.controllerDeviceId,
      alias: "ControllerDevice_To_House",
    }),
  },

  houses: {
    controllerDevice: r.one.controllerDevices({
      from: r.houses.controllerDeviceId,
      to: r.controllerDevices.id,
      alias: "ControllerDevice_To_House",
    }),
    houseMembers: r.many.houseMembers({
      from: r.houses.id,
      to: r.houseMembers.houseId,
      alias: "House_To_HouseMembers",
    }),
    rooms: r.many.rooms({
      from: r.houses.id,
      to: r.rooms.houseId,
      alias: "House_To_Rooms",
    }),
  },

  rooms: {
    house: r.one.houses({
      from: r.rooms.houseId,
      to: r.houses.id,
      alias: "House_To_Rooms",
    }),
    devices: r.many.devices({
      from: r.rooms.id,
      to: r.devices.roomId,
      alias: "Rooms_To_Devices",
    }),
  },

  devices: {
    room: r.one.rooms({
      from: r.devices.roomId,
      to: r.rooms.id,
      alias: "Rooms_To_Devices",
    }),
    deviceControlLogs: r.many.deviceControlLogs({
      from: r.devices.id,
      to: r.deviceControlLogs.deviceId,
      alias: "Devices_To_DeviceControlLogs",
    }),
  },

  deviceControlLogs: {
    device: r.one.devices({
      from: r.deviceControlLogs.deviceId,
      to: r.devices.id,
      alias: "Devices_To_DeviceControlLogs",
    }),
  },
}));
