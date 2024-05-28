import { Application, Response } from "express";
import v1Routes from "./v1";

export default function initializeRoutes(app: Application) {
  //   log.info("initializeRoutes()");
  app.use("/api/v1", v1Routes);
}
