import { Router } from "express";
import * as APIPaths from "../../constants/api_path_constants";

import { loginUser, signupUser } from "../../controller/userController";

const router = Router();

// LOGIN USER

router.post(APIPaths.LOGIN_USER, loginUser);

// SIGN UP USER

router.route(APIPaths.SIGNUP_USER).post(signupUser);

export default router;
