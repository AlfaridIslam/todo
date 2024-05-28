import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { SERVER_PORT } from "./config/index";

import { initializeApp } from "./loaders/initializer";

dotenv.config();

// PORT



async function startApplication() {
  try {
    const app: express.Application = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      express.json({
        limit: "100mb",
      })
    );
    app.use(cors());
    await initializeApp(app);
    app.listen(SERVER_PORT, () => {
      console.log(`SERVER listening on PORT:${SERVER_PORT}`);
    });
  } catch (error) {
    console.error("ERROR in Starting Application", error);
    console.error("Killing Application process");
    process.exit(1);
  }
}

startApplication().catch((err) =>
  console.error("ERROR occurred while starting Application.", err)
);
