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
import { antiDDoSMiddleware } from "../middlewares/ddos-midleware";
import { tokensBlackListRepo } from "../repo/tokenBlackList/tokenBlackList-repo";

export const authRouter = Router({});

authRouter.post(
  "/login",
  antiDDoSMiddleware,
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
        secure: process.env.NODE_ENV! === "prod",
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
    const token = req.cookies.refreshToken;
    const accessToken = jwtAuth.createToken(req.user?.id);
    const refreshToken = jwtAuth.createRefreshToken(req.user?.id);
    if (!token) return res.sendStatus(401);
    const tokenFromDB = await tokensBlackListRepo.findToken(token);
    if (tokenFromDB) return res.sendStatus(401);
    await tokensBlackListRepo.addExpireTokenToDB(token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV! === "prod",
    });
    return res.status(200).json(accessToken);
  }
);
authRouter.post(
  "/registration",
  antiDDoSMiddleware,
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
  antiDDoSMiddleware,
  validUserCode,
  userInputValidator,
  isCodeValid,
  async (req: Request, res: Response) => {
    return res.sendStatus(204);
  }
);
authRouter.post(
  "/registration-email-resending",
  antiDDoSMiddleware,
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
    if (!token) return res.sendStatus(401);
    const tokenFromDB = await tokensBlackListRepo.findToken(token);
    if (tokenFromDB) return res.sendStatus(401);
    await tokensBlackListRepo.addExpireTokenToDB(token);
    res.clearCookie("refreshToken");
    return res.sendStatus(204);
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
