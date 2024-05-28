import { Sequelize } from "sequelize";
import { config } from "dotenv";
import { resolve } from "path";
import { database } from "../config/index";
import { QueryTypes } from "sequelize";

// Load environment variables from .env file
config({ path: resolve(__dirname, "../../.env") });

const { database_name, user, password, host, port } = database;

// Validate required environment variables
if (!database_name || !user || !password || !host || !port) {
  throw new Error("Missing required database environment variables.");
}

let connection: Sequelize | null = null;

// types

export interface User {
  user_id: number;
  email: string;
  password: string;
}

export interface QueryResult {
  affectedRows?: number;
  insertId?: number;
}

export interface SelectQueryResult<T> {
  [key: string]: T;
}

export const sqlConnection = async (): Promise<Sequelize> => {
  try {
    if (connection) {
      return connection;
    }

    connection = new Sequelize(database_name, user, password, {
      dialect: "mysql",
      host,
      port: Number(port), // Ensure port is a number
    });
    return connection;
  } catch (error) {
    throw error;
  }
};

export async function executeQuery(
  query: string,
  type: QueryTypes,
  replacements: any = {},
  transaction: any = null
): Promise<any> {
  try {
    const connection = await sqlConnection();
    const result = await connection.query(query, {
      replacements,
      type,
      transaction,
    });

    // Ensure a valid result structure is always returned
    if (!result) {
      return { affectedRows: 0 };
    }
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
