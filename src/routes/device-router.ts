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
    const devices = await queryDevicesRepo.getAllDevices();
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
    const deviceId = req.params.id;
    const exists = await devicesRepo.findByDeviseId(deviceId, req.user.user.id);
    if (!exists) return res.sendStatus(404);
    const deletedDevice = await devicesRepo.deleteDevice(
      deviceId,
      req.user.user.id
    );
    if (!deletedDevice) return res.sendStatus(403);
    return res.sendStatus(204);
  }
);
