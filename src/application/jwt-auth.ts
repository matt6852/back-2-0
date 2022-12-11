import { devicesRepo } from "./../repo/devices/device-repo";
import { usersRepo } from "./../repo/users/users-repo";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { queryDevicesRepo } from "../repo/devices/query-device-repo";

export const jwtAuth = {
  createToken(id: string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE!,
    });
    return { accessToken: token };
  },
  createRefreshToken(id: string, deviceId: string) {
    const refreshToken = jwt.sign({ id, deviceId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE!,
    });
    return refreshToken;
  },
  checkJWT(token: string) {
    try {
      const result: any = jwt.verify(token, process.env.JWT_SECRET!);
      return result;
    } catch (err) {
      return null;
    }
  },
};

export const authJWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = headers.split(" ")[1];
  const result = jwtAuth.checkJWT(token);
  if (!result) return res.sendStatus(401);
  const user = await usersRepo.findUserById(result?.id!);
  if (!user) return res.sendStatus(401);
  req.user = { user };
  return next();
};
export const checkCookies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqId = req.params.id;
  console.log(reqId, "reqId");

  const token = req.cookies.refreshToken;
  const result = jwtAuth.checkJWT(token);
  if (!result) return res.sendStatus(401);
  const metaData: any = Buffer.from(token.split(".")[1], "base64").toString();
  const metaObj = JSON.parse(metaData);
  const lastActiveDate = new Date(metaObj.iat * 1000);
  const deviceId = metaObj.deviceId;
  console.log(deviceId, "deviceId checkCookies");
  console.log(lastActiveDate, "lastActiveDate checkCookies");
  console.log(metaData, "metaObj");
  const currentId = reqId ?? deviceId;
  const device = await queryDevicesRepo.findDevice(currentId);
  if (!device) return res.sendStatus(404);
  console.log(device?.userId, "device id");
  console.log(device, "device checkCookies");
  if (metaObj.id !== device?.userId) return res.sendStatus(403);
  const user = await usersRepo.findUserById(result?.id!);
  req.user = { user, deviceId };
  return next();
};
