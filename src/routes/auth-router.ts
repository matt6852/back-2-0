import { usersRepo } from "./../repo/users/users-repo";
import { userService } from "./../services/user-service";
import { Router, Request, Response } from "express";
import { emailManager } from "../application/emailManager";
import { authJWTMiddleware } from "../application/jwt-auth";
import {
  credentialsInputValidator,
  validCredentials,
} from "../middlewares/auth-middleware";
import {
  userInputValidator,
  validUser,
  validUserCode,
  validUserEmailResending,
} from "../middlewares/users-middleware";
import { authService } from "../services/auth-service";

export const authRouter = Router({});

authRouter.post(
  "/login",
  validCredentials,
  credentialsInputValidator,
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(
      req.body.loginOrEmail,
      req.body.password
    );

    if (result) return res.status(200).json(result);
    return res.sendStatus(401);
  }
);
authRouter.post(
  "/registration",
  validUser,
  userInputValidator,
  async (req: Request, res: Response) => {
    const { email, password, login } = req.body;
    const isUserExists = await usersRepo.findUserByEmailOrLogin(email, login);
    if (isUserExists) {
      return res.status(400).send({
        errorsMessages: [
          {
            message: "Invalid value",
            field: "email",
          },
        ],
      });
    }
    const result = await authService.registrationUser(login, email, password);

    if (result) return res.sendStatus(204);
  }
);
authRouter.post(
  "/registration-confirmation",
  validUserCode,
  userInputValidator,
  async (req: Request, res: Response) => {
    const { code } = req.body;
    const findUserByCode = await userService.getUserByCode(code);
    if (!findUserByCode)
      return res.status(400).send({
        errorsMessages: [
          {
            message: "Invalid value",
            field: "code",
          },
        ],
      });
    return res.sendStatus(204);
  }
);
authRouter.post(
  "/registration-email-resending",
  validUserEmailResending,
  userInputValidator,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const isUserExists = await usersRepo.findUserByEmail(email);
    if (!isUserExists)
      return res.status(400).send({
        errorsMessages: [
          {
            message: "Invalid value",
            field: "email",
          },
        ],
      });
    await authService.resendingEmail(isUserExists.email, isUserExists.id);

    return res.sendStatus(204);
  }
);
authRouter.get(
  "/me",
  authJWTMiddleware,
  async (req: Request, res: Response) => {
    const me = {
      email: req?.user?.email,
      login: req?.user?.login,
      userId: req?.user?.id,
    };
    res.send(me);
  }
);
