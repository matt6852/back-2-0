import { userService } from "./user-service";
import { usersRepo } from "../repo/users/users-repo";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

import { jwtAuth } from "../application/jwt-auth";
import { emailManager } from "../application/emailManager";
export const authService = {
  async loginUser(loginOrEmail: string, password: string) {
    const user = await usersRepo.loginUser(loginOrEmail, password);
    const correctPassword = await this._comparePassword(
      password,
      user?.password
    );

    if (!correctPassword) return null;
    const accessToken = jwtAuth.createToken(user?.id);
    const refreshToken = jwtAuth.createRefreshToken(user?.id);

    return { accessToken, refreshToken };
  },

  async _comparePassword(password: string, hashPassword: string = "") {
    return await bcrypt.compare(password, hashPassword);
  },

  async registrationUser(login: string, email: string, password: string) {
    const hashPassword = await userService._hashPassword(password);
    const confirmCode = uuidv4();
    const newUserRegistration = {
      login,
      email,
      password: hashPassword,
      confirmCode,
      expirationCodeDate: add(new Date(), {
        hours: 1,
        minutes: 3,
      }),
    };
    const result = await usersRepo.createUser(newUserRegistration);
    await emailManager.sendEmail(email, confirmCode);
    return result;
  },
  async resendingEmail(email: string, id: string) {
    const confirmCode = uuidv4();
    const newUserRegistration = {
      confirmCode,
      expirationCodeDate: add(new Date(), {
        hours: 1,
        minutes: 3,
      }),
    };
    const result = await usersRepo.resendEmail(id, newUserRegistration);
    await emailManager.sendEmail(email, confirmCode);
    return result;
  },
};
