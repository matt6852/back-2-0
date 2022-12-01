import { IUser, UserModel } from "../../models/userModal";

export const usersRepo = {
  async createUser(newUser: any) {
    const result = await UserModel.create(newUser);
    console.log(result, "newUser");

    return {
      login: result.login,
      email: result.email,
      id: result.id,
      createdAt: result.createdAt,
    };
  },
  async findUserById(id: string) {
    const result = await UserModel.findById(id);
    return result;
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
  async getUserByCode(code: string) {
    try {
      const result = await UserModel.findOneAndUpdate(
        { confirmCode: code },
        { isConfirmed: true }
      );
      return result;
    } catch (error) {
      return null;
    }
  },
  async findUserByEmail(email: string) {
    try {
      const result = await UserModel.findOne({ email });
      return result;
    } catch (error) {
      return null;
    }
  },
};
