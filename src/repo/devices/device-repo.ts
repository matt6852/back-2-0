import { BlogModel, IBlog } from "../../models/blogModel";
import { DeviceModel } from "../../models/deviceModal";

export const devicesRepo = {
  async createDevice(newBlog: IBlog) {
    return await DeviceModel.create(newBlog);
  },

  async updatedDevice(id: string, data: IBlog) {
    try {
      const result = await DeviceModel.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      return null;
    }
  },
  async deleteDevice(id: string) {
    try {
      const result = await DeviceModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return null;
    }
  },
};
