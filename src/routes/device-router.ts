import { devicesRepo } from "./../repo/devices/device-repo";
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
import { queryDevicesRepo } from "../repo/devices/query-device-repo";
import { read } from "fs";

export const deviceRouter = Router({});

deviceRouter.get(
  "/devices",
  checkCookies,
  async (req: Request, res: Response) => {
    const userId = req.user.user.id;
    const devices = await queryDevicesRepo.getAllDevices(userId);
    res.send(devices);
  }
);
deviceRouter.delete(
  "/devices",
  checkCookies,
  async (req: Request, res: Response) => {
    const deletedAllDevice = await devicesRepo.deleteDeviceExceptOne(
      req.user.deviceId,
      req.user.user.id
    );
    res.sendStatus(204);
  }
);
deviceRouter.delete(
  "/devices/:id",
  checkCookies,
  async (req: Request, res: Response) => {
    console.log(req.user.user, "req.user.user");

    const deviceId = req.params.id;
    const deletedDevice = await devicesRepo.deleteDevice(
      deviceId,
      req.user.user._id
    );
    return res.sendStatus(204);
  }
);
