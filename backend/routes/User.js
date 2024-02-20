import express from "express";
import userMiddleware from "../middlewares/index.js";
import {
  addTodo,
  markAsDone,
  userSignIn,
  userSignUp,
  getTodos,
  auth,
} from "../controllers/User.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/home", userMiddleware, getTodos);
router.get("/auth", userMiddleware, auth);
router.post("/home/addtodo", userMiddleware, addTodo);
//check for post vs put
router.post("/home/markasdone", userMiddleware, markAsDone);

export default router;
