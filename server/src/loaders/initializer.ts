
import { Application } from "express";

import initializeRoutes from "../routes";
import { sqlConnection } from "../db/connection";



export async function initializeApp(app: Application) {
  try {
    initializeRoutes(app);
  } catch (error) {
    console.error("ERROR occurred in initializeApp().", error);
    throw error;
  }
}
