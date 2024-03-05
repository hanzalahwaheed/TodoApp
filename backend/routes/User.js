import express from "express";
import userAuthMiddleware from "../middlewares/index.js";
import {
  addTodo,
  markAsDone,
  userSignIn,
  userSignUp,
  getTodos,
  auth,
  logout,
} from "../controllers/User.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/home", userAuthMiddleware, getTodos);
router.get("/auth", userAuthMiddleware, auth);
router.get("/logout", userAuthMiddleware, logout);
router.post("/home/addtodo", userAuthMiddleware, addTodo);
router.post("/home/markasdone", userAuthMiddleware, markAsDone);

export default router;
