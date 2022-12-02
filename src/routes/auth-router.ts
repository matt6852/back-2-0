import { tokensRepo } from "./../repo/tokenBlackList/tokenBlackList-repo";
import {
  isCodeValid,
  isEmailOrLoginValid,
  isEmailValid,
} from "./../middlewares/users-middleware";
import { Router, Request, Response } from "express";
import {
  authJWTMiddleware,
  checkCookies,
  jwtAuth,
} from "../application/jwt-auth";
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
import { usersRepo } from "../repo/users/users-repo";

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

    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        // secure: true,
      });
      return res.status(200).json(result.accessToken);
    }
    return res.sendStatus(401);
  }
);
authRouter.post(
  "/refresh-token",
  checkCookies,
  async (req: Request, res: Response) => {
    const accessToken = jwtAuth.createToken(req.user?.id);
    const refreshToken = jwtAuth.createRefreshToken(req.user?.id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
    });
    return res.status(200).json(accessToken);
  }
);
authRouter.post(
  "/registration",
  validUser,
  userInputValidator,
  isEmailOrLoginValid,
  async (req: Request, res: Response) => {
    const { email, password, login } = req.body;
    const result = await authService.registrationUser(login, email, password);
    if (result) return res.sendStatus(204);
    return res.status(400).send({ errorRegistrationUser: result });
  }
);
authRouter.post(
  "/registration-confirmation",
  validUserCode,
  userInputValidator,
  isCodeValid,
  async (req: Request, res: Response) => {
    return res.sendStatus(204);
  }
);
authRouter.post(
  "/registration-email-resending",
  validUserEmailResending,
  userInputValidator,
  isEmailValid,
  async (req: Request, res: Response) => {
    return res.sendStatus(204);
  }
);
authRouter.post(
  "/logout",
  checkCookies,
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    res.clearCookie("refreshToken");
    await tokensRepo.addExpireTokenToDB(token);
    return res.send(204);
  }
);
authRouter.get(
  "/me",
  authJWTMiddleware,
  // checkCookies,
  async (req: Request, res: Response) => {
    const me = {
      email: req?.user?.email,
      login: req?.user?.login,
      userId: req?.user?.id,
    };
    res.send(me);
  }
);
