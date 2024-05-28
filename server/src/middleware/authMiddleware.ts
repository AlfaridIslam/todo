import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../controller/customTypes";

interface JwtPayload {
  userId: any;
  email: any;
}

const authUser: any = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token required.." });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = (await jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    )) as JwtPayload;

    if (!decodedToken) {
      res.status(401).json({ error: "Invalid userID from token" });
    }

    req.userSession = {
      userId: decodedToken.userId,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ error:  error});
  }
};

export default authUser;
