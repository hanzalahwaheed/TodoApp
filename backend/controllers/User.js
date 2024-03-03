import User from "../db/index.js";
import {
  UserSchemaSignIn,
  UserSchemaSignUp,
} from "../validations/userValidation.js";
import TodoSchema from "../validations/todoValidation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userSignUp = async (req, res) => {
  try {
    const { email, password, username } = UserSchemaSignUp.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email is already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.json({ status: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error in userSignUp:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = UserSchemaSignIn.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json("Incorrect password");

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.json({
      status: true,
      message: "user signed in successfully",
    });
  } catch (error) {
    console.error("Error in userSignIn:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTodos = async (req, res) => {
  const email = req.email;
  try {
    const user = await User.findOne({ email: email });
    const todos = user.todos;
    if (todos) {
      res.json({
        status: true,
        message: "Fetched all todos",
        todos: todos,
      });
    } else {
      res.status(404).json({ error: "Todo not found for the user" });
    }
  } catch (error) {
    console.error("Error in getTodos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addTodo = async (req, res) => {
  const { title, description } = TodoSchema.parse(req.body);
  const email = req.email;

  try {
    const result = await User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          todos: {
            title: title,
            description: description,
            completed: false,
          },
        },
      },
      { new: true }
    );

    if (result) {
      res.json({ message: "Todo added successfully", updatedUser: result });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in addTodo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markAsDone = async (req, res) => {
  const { todoId } = req.body;
  const email = req.email;

  try {
    const result = await User.findOneAndUpdate(
      { email: email, "todos._id": todoId },
      { $set: { "todos.$.completed": true } },
      { new: true }
    );

    if (result) {
      res.json({
        message: "Todo marked as done successfully",
        updatedUser: result,
      });
    } else {
      res.status(404).json({ error: "Todo not found for the user" });
    }
  } catch (error) {
    console.error("Error in markAsDone:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const auth = async (req, res) => {
  try {
    res.json({ status: true, email: req.email });
  } catch (error) {
    console.error("Error in auth:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "logged out" });
};
