import { usersRepo } from "../repo/users/users-repo";
import { blogsRepo } from "../repo/blogs/blogs-repo";
import { IPost } from "./../models/postModel";
import { postsRepo } from "../repo/posts/posts-repo";
import { blogsQueryRepo } from "../repo/blogs/query-blogs-repo";
import { IUser } from "../models/userModal";
import bcrypt from "bcrypt";
import { jwtAuth } from "../application/jwt-auth";
export const authService = {
  async loginUser(loginOrEmail: string, password: string) {
    const user = await usersRepo.loginUser(loginOrEmail, password);
    const correctPassword = await this._comparePassword(
      password,
      user?.password
    );

    if (!correctPassword) return null;
    const login = jwtAuth.createToken(user?.id);

    return login;
  },

  async _comparePassword(password: string, hashPassword: string = "") {
    return await bcrypt.compare(password, hashPassword);
  },
};