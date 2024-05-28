import * as APIPaths from "../../constants/api_path_constants";
import express from "express";
import authUser from "../../middleware/authMiddleware";
const router = express.Router();

import {
  getTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
  completedTodo,
  incompletedTodo,
  markAllTodo,
  searchTodo,
} from "../../controller/todoController";

// Ensure authentication for all todo routes
router.use(authUser);

// API routes
// Define routes using explicit paths from APIPaths
router.get(APIPaths.GET_TODOS, getTodos);
router.get(APIPaths.GET_TODO, getTodo);
router.post(APIPaths.CREATE_TODO, createTodo);
router.patch(APIPaths.EDIT_TODO, editTodo);
router.delete(APIPaths.DELETE_TODO, deleteTodo);
router.get(APIPaths.SEARCH_TODO, searchTodo);

router.patch(APIPaths.COMPLETED_TODO, completedTodo);
router.patch(APIPaths.INCOMPLETED_TODO, incompletedTodo);
router.patch(APIPaths.MARK_ALL_COMPLETED_TODO, markAllTodo);

export default router;
