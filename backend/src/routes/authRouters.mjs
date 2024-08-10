import express from "express";
import { checkSchema } from "express-validator";
import {
  createUserController,
  getUserController,
  loginUserController,
} from "../controllers/authController.mjs";
import { authSchema, loginSchema } from "../schemas/authSchemas.mjs";
const router = express.Router();

router
  .route("/createVoter")
  .get(getUserController)
  .post(checkSchema(authSchema), createUserController);
router.route("/login").post(checkSchema(loginSchema), loginUserController);

export const authRouter = router;
