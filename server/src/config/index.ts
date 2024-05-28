import { config } from "dotenv";
import { resolve } from "path";

// connecting with .env

config({ path: resolve(__dirname, "../../.env") });

// creating connection pool 

export const database = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database_name: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_DATABASE_PORT),
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT),
};

export const SERVER_PORT = process.env.SERVER_PORT;
