import { Request, Response } from "express";
import { executeQuery } from "../db/connection";
import { QueryTypes } from "sequelize";

// Define custom request type if needed
interface CustomRequest extends Request {
  userSession?: {
    userId: string;
  };
}

// Get all Todos
export const getTodos = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await executeQuery("SELECT * FROM todos", QueryTypes.SELECT);

    if (!todos) {
      res.status(500).json({ error: "Failed to fetch todos" });
      return;
    }

    res.status(200).json({ todos });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get single Todo
export const getTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.params;
    const todo = await executeQuery(
      "SELECT * FROM todos WHERE user_id = ?",
      QueryTypes.SELECT,
      [user_id]
    );

    if (!todo || todo.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ todo: todo });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Create Todo
export const createTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { todo } = req.body;
    const userSession = req.userSession;
    const userId = userSession?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await executeQuery(
      "INSERT INTO todos (todo, user_id) VALUES (?, ?)",
      QueryTypes.INSERT,
      [todo, userId]
    );

    if (result && result[0]) {
      res.status(201).json({ id: result[0], todo, userId });
    } else {
      res.status(400).json({ error: "Failed to create todo" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Update Todo
export const editTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { todo } = req.body;
    const { id } = req.params;
    const userSession = req.userSession;
    const userId = userSession?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await executeQuery(
      "UPDATE todos SET todo = ? WHERE user_id = ? and id = ?",
      QueryTypes.UPDATE,
      [todo, userId, id]
    );

    if (result && result[1] === 1) {
      res.status(200).json({ userId, todo });
    } else {
      res.status(400).json({ error: "Failed to update todo" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Todo
export const deleteTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userSession = req.userSession;
    const user_id = userSession?.userId;

    if (!user_id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    console.log(
      `Attempting to delete todo with ID: ${id} for user ID: ${user_id}`
    );
    const todoData = await executeQuery(
      "SELECT * FROM todos WHERE user_id = ?",
      QueryTypes.SELECT,
      [user_id, id]
    );
    if (todoData) {
      await executeQuery(
        "DELETE FROM todos WHERE user_id = ? and id = ?",
        QueryTypes.DELETE,
        [user_id, id]
      );
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ error: "Todo not found or already deleted" });
    }
  } catch (err: any) {
    console.error("Error occurred while deleting todo: ", err);
    res.status(500).json({ error: err.message });
  }
};

// MARK COMPLETED
export const completedTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userSession = req.userSession;
    const userId = userSession?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await executeQuery(
      "UPDATE todos SET status = ? WHERE user_id = ? AND id = ?",
      QueryTypes.UPDATE,
      [true, userId, id]
    );

    if (result && result[1] === 1) {
      res.status(200).json({ userId, status: true });
    } else {
      res.status(400).json({ error: "Failed to update todo as completed" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// MARK INCOMPLETED
export const incompletedTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userSession = req.userSession;
    const userId = userSession?.userId;
    console.log("alfarid")
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await executeQuery(
      "UPDATE todos SET status = ? WHERE user_id = ? AND id = ?",
      QueryTypes.UPDATE,
      [false, userId, id]
    );

    if (result && result[1] === 1) {
      res.status(200).json({ userId, status: false });
    } else {
      res.status(400).json({ error: "Failed to update todo as incompleted" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// MARK ALL COMPLETED
export const markAllTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { user_id, id } = req.params;
    const userSession = req.userSession;
    const userId = userSession?.userId;

    if (!userId || userId !== user_id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await executeQuery(
      "UPDATE todos SET status = ? WHERE user_id = ?",
      QueryTypes.UPDATE,
      [true, userId, id]
    );

    if (result) {
      res.status(200).json({ userId, status: true });
    } else {
      res.status(400).json({ error: "Failed to mark all todos as completed" });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Search Todo
export const searchTodo = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm; // Extract 'searchTerm' directly
    const userSession = req.userSession;
    const userId = userSession?.userId;

    console.log(`User ID: ${userId}`);
    console.log(`Search Term: ${searchTerm}`); // Log the searchTerm

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!searchTerm) {
      res.status(400).json({ error: "Search term is required" });
      return;
    }

    const todos = await executeQuery(
      "SELECT * FROM todos WHERE user_id = ? AND todo LIKE ?",
      QueryTypes.SELECT,
      [userId, `%${searchTerm}%`]
    );

    if (todos.length === 0) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json({ todos });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
  completedTodo,
  incompletedTodo,
  markAllTodo,
  searchTodo,
};
