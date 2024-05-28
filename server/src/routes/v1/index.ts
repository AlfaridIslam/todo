import * as APIPaths from "../../constants/api_path_constants";
import express from "express";
import AuthRoutes from "./userRoutes";
import ToDoRoutes from "./todoRoutes";

const router = express.Router();

router.use(APIPaths.ROUTER_AUTH, AuthRoutes);
router.use(APIPaths.ROUTER_TO_DO, ToDoRoutes);

export default router;
