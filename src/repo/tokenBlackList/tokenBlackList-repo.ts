import { TokenModel } from "../../models/tokenModal";

export const tokensRepo = {
  async findToken(token: string) {
    try {
      return await TokenModel.findOne({
        token,
      });
    } catch (error) {
      return null;
    }
  },
  async addExpireTokenToDB(token: string) {
    const result = await TokenModel.create({ token });
  },
};
