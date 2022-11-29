import { usersRepo } from "../repo/users/users-repo";
import { blogsRepo } from "../repo/blogs/blogs-repo";
import { IPost } from "./../models/postModel";
import { postsRepo } from "../repo/posts/posts-repo";
import { blogsQueryRepo } from "../repo/blogs/query-blogs-repo";
import { IUser } from "../models/userModal";
import bcrypt from "bcrypt";
export const userService = {
  async createSingleUser(newUser: IUser) {
    const hashPassword = await this._hashPassword(newUser.password);
    const usersWithHashPassword = {
      ...newUser,
      password: hashPassword,
    };

    const result = await usersRepo.createUser(usersWithHashPassword);
    return result;
  },
  async deleteUser(id: string) {
    const result = await usersRepo.deleteUser(id);
    return result;
  },
  async _hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
};
