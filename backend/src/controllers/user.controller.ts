import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";
import { UserDocument } from "../models/user.model";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const { user } = (await getCurrentUserService(userId)) as { user: UserDocument };

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});
