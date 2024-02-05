import express from "express";
import userRoutes from "./routes/User.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URL).then(console.log("connected to db"));

app.listen(5000, () => console.log("server started"));
