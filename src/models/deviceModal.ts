import { Schema, model } from "mongoose";

export interface IDevice {
  deviceId: string;
  lastActiveDate: number;
  title: string;
  ip: string;
  userId: string;
}

const userDeviceSchema = new Schema<IDevice>({
  deviceId: { type: String, required: true },
  lastActiveDate: { type: Number, required: true },
  ip: { type: String, required: true },
  title: { type: String, required: true },
  userId: { type: String, required: true },
});

export const DeviceModel = model<IDevice>("Device", userDeviceSchema);
