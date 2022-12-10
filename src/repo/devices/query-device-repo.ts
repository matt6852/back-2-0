import { DeviceModel } from "../../models/deviceModal";
const mappedDevices = (devices: any) => {
  const result = devices.map((d: any) => {
    return {
      deviceId: d.deviceId,
      lastActiveDate: d.lastActiveDate,
      ip: d.ip,
      title: d.title,
    };
  });
  return result;
};
export const queryDevicesRepo = {
  async getAllDevices() {
    try {
      const res = await DeviceModel.find({});
      // const mapped = mappedDevices(res);
      // console.log(mapped);

      return mappedDevices(res);
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
