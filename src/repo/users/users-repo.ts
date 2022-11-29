import { IUser, UserModel } from "../../models/userModal";

export const usersRepo = {
  async createUser(newUser: IUser) {
    return await UserModel.create(newUser);
  },
  async loginUser(loginOrEmail: string, password: string) {
    try {
      return await UserModel.findOne({
        $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
      });
    } catch (error) {
      return null;
    }
  },

  async deleteUser(id: string) {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return null;
    }
  },
};
