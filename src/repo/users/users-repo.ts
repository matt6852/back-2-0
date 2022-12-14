import { IUser, UserModel } from "../../models/userModal";

export const usersRepo = {
  async createUser(newUser: any) {
    const result = await UserModel.create(newUser);
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
  async updateUserPassword(id: string, newPassword: string) {
    const result = await UserModel.findByIdAndUpdate(id, {
      password: newPassword,
    });
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
      if (result && result.isConfirmed) {
        return null;
      }
      return result;
    } catch (error) {
      return null;
    }
  },
  async getUserByRecoveryCodePassword(code: string) {
    console.log(code, "code");

    try {
      const result = await UserModel.findOne({ passwordCodeRecovery: code });

      return result;
    } catch (error) {
      return null;
    }
  },
  async findUserByEmailOrLogin(email: string, login: string) {
    try {
      const result = await UserModel.findOne({
        $or: [{ login: login }, { email: email }],
      });
      return result;
    } catch (error) {
      return null;
    }
  },
  async findUserByEmail(email: string) {
    try {
      const result = await UserModel.findOne({
        $and: [{ isConfirmed: false }, { email: email }],
      });
      return result;
    } catch (error) {
      return null;
    }
  },
  async resendEmail(id: string, content: any) {
    try {
      const result = await UserModel.findByIdAndUpdate(id, content);
      return result;
    } catch (error) {
      return null;
    }
  },
  async resetPassword(email: string, content: any) {
    try {
      const result = await UserModel.findOneAndUpdate({ email }, content);
      return result;
    } catch (error) {
      return null;
    }
  },
};
