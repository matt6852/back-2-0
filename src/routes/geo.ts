
import { Router, Request, Response } from "express";



export const authRouter = Router({});

authRouter.post(
  "/geo",
 
  async (req: Request, res: Response) => {
    
   
  }
);
authRouter.post(
  "/refresh-token",
  checkCookies,
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    const accessToken = jwtAuth.createToken(req.user?.user?._id);
    const refreshToken = jwtAuth.createRefreshToken(
      req.user?.user?._id,
      req.user?.deviceId
    );
    const metaData = Buffer.from(
      refreshToken.split(".")[1],
      "base64"
    ).toString();
    const metaObj = JSON.parse(metaData);
    const lastActiveDate = new Date(metaObj.iat * 1000);
    console.log(lastActiveDate, "lastActiveDate  /refresh-token");

    const updateDevice = await devicesRepo.updatedDevice(
      metaObj.deviceId,
      metaObj.id,
      lastActiveDate
    );
    console.log(updateDevice, "updateDevice");

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
  "/password-recovery",
  antiDDoSMiddleware,
  validUserEmailResending,
  userInputValidator,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await authService.recoverPassword(email);
    res.sendStatus(204);
  }
);
authRouter.post(
  "/new-password",
  antiDDoSMiddleware,
  setNewPassword,
  userInputValidator,
  isRecoveryCodePasswordValid,
  async (req: Request, res: Response) => {
    const { newPassword, recoveryCode } = req.body;
    res.sendStatus(204);
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
    console.log(req.user?.deviceId);
    await devicesRepo.deleteDevice(req.user?.deviceId, req.user?.user.id);
    res.clearCookie("refreshToken");
    return res.sendStatus(204);
  }
);
authRouter.get(
  "/me",
  // checkCookies,
  authJWTMiddleware,
  async (req: Request, res: Response) => {
    const me = {
      email: req?.user?.user?.email,
      login: req?.user?.user?.login,
      userId: req?.user?.user?.id,
    };
    res.send(me);
  }
);
