import { Request } from "express";

export interface CustomRequest extends Request {
  userSession: {
    userId: any; // Adjust the type according to your actual userSession structure
    email?: any;
  };
}
