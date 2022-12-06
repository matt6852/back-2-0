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
import { antiDDoSMiddleware } from "../middlewares/ddos-midleware";

export const deviceRouter = Router({});

deviceRouter.get(
  "/devices",
  checkCookies,
  async (req: Request, res: Response) => {
    res.send("Get ALL Devices");
    //   const accessToken = jwtAuth.createToken(req.user?.id);
    //   const refreshToken = jwtAuth.createRefreshToken(req.user?.id);
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV! === "prod",
    //   });
    //   return res.status(200).json(accessToken);
  }
);
deviceRouter.delete(
  "/devices",
  checkCookies,
  async (req: Request, res: Response) => {
    res.send("delete All devices");
    // const accessToken = jwtAuth.createToken(req.user?.id);
    // const refreshToken = jwtAuth.createRefreshToken(req.user?.id);
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV! === "prod",
    // });
    // return res.status(200).json(accessToken);
  }
);
deviceRouter.delete(
  "/devices/:id",
  checkCookies,
  async (req: Request, res: Response) => {
    res.send("delete single device");
    //   const accessToken = jwtAuth.createToken(req.user?.id);
    //   const refreshToken = jwtAuth.createRefreshToken(req.user?.id);
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV! === "prod",
    //   });
    //   return res.status(200).json(accessToken);
  }
);
