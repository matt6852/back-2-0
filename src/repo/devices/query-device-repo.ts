import { DeviceModel } from "../../models/deviceModal";

export const devicesRepo = {
  async getAllDevices(id: string) {
    try {
      return await DeviceModel.findById(id);
    } catch (error) {
      return null;
    }
  },
};
