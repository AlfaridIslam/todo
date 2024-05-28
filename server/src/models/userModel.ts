import * as bcrypt from "bcryptjs";
import { executeQuery } from "../db/connection";
import { QueryTypes } from "sequelize";

const saltRounds: number = 10;

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// LOGIC OF SIGNUP

const signup = async (email: string, password: string) => {
  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert new user into the database
    const query = `INSERT INTO users(email, password) VALUES(:email, :hashedPassword)`;
    const [result] = await executeQuery(query, QueryTypes.INSERT, {
      email,
      hashedPassword,
    });

    if (result) {
      return { user_id: result }; // Adjust result to return the correct user_id
    } else {
      throw new Error("Failed to create user: No rows affected");
    }
  } catch (err: any) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user: " + err.message);
  }
};

// LOGIN LOGIC

const login = async (email: string, password: string) => {
  try {
    const query = `SELECT * FROM users WHERE email = :email`;
    const result = await executeQuery(query, QueryTypes.SELECT, { email });
    const user = result[0];

    if (!user) {
      throw new Error("Email not found");
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password incorrect.");
    }

    return user; // Return the user object if login is successful
  } catch (err: any) {
    console.error("Error logging in user:", err);
    throw new Error("Failed to log in user: " + err.message);
  }
};

export default { signup, login };
