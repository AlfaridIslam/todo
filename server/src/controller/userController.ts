import { QueryTypes } from "sequelize";
import { executeQuery } from "../db/connection";
import User from "../models/userModel";
import createToken from "../utils/token";

import { Request, Response } from "express";

// LOGIN AUTH

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await User.login(email, password);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const payload = { email: user.email, userId: user.user_id };
    const token = createToken(payload);

    res.status(200).json({ id: user.user_id, token }); // return user_id and token
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// SIGNUP AUTH

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // checking if user already exists
  const query = "SELECT * FROM users WHERE email = :email";
  const users = await executeQuery(query, QueryTypes.SELECT, { email });

  if (users.length > 0) {
    return res.status(409).json({ error: "Email already exist" });
  }

  try {
    const user: any = await User.signup(email, password);
    res.status(201).json({ id: user.user_id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
