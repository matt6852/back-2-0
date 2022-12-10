import { DeviceModel } from "../../models/deviceModal";

export const queryDevicesRepo = {
  async getAllDevices() {
    try {
      return await DeviceModel.find({});
    } catch (error) {
      return null;
    }
  },
  async findDevice(deviceId: string, lastActiveDate: Date) {
    try {
      return await DeviceModel.findOne({ lastActiveDate, deviceId });
    } catch (error) {
      return null;
    }
  },
};
