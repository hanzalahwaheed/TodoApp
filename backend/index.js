import express from "express";
import userRoutes from "./routes/User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to db"))
  .catch((error) => console.log("error in mongo connection", error));
app.listen(5000, () => console.log("server started"));
