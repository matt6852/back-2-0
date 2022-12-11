import { BlogModel, IBlog } from "../../models/blogModel";
import { DeviceModel, IDevice } from "../../models/deviceModal";

export const devicesRepo = {
  async createDevice(newDeviceSession: IDevice) {
    return await DeviceModel.create(newDeviceSession);
  },

  async updatedDevice(deviceId: string, userId: string, lastActiveDate: Date) {
    try {
      const result = await DeviceModel.updateOne(
        { deviceId, userId },
        { $set: { lastActiveDate: lastActiveDate } }
      );
      return result;
    } catch (error) {
      return null;
    }
  },
  async deleteDevice(deviceId: string, userId: string) {
    try {
      const result = await DeviceModel.findOneAndRemove({ deviceId, userId });
      return result;
    } catch (error) {
      return null;
    }
  },
  async deleteDeviceExceptOne(deviceId: string, userId: string) {
    try {
      const result = await DeviceModel.deleteMany({
        deviceId: { $ne: deviceId },
      });
      return result;
    } catch (error) {
      return null;
    }
  },
  async findByDeviseId(deviceId: string, userId: string) {
    try {
      const result = await DeviceModel.findOne({ deviceId, userId });
      return result;
    } catch (error) {
      return null;
    }
  },
};
