import express from "express";
import userMiddleware from "../middlewares/index.js";
import {
  addTodo,
  markAsDone,
  userSignIn,
  userSignUp,
  getTodos,
} from "../controllers/User.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/home", userMiddleware, getTodos);
router.post("/home/addtodo", userMiddleware, addTodo);
router.post("/home/markasdone", userMiddleware, markAsDone);

export default router;
