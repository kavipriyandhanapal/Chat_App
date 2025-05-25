import express from "express";
import authRouter from "./routes/auth.router.js";
import messageRouter from "./routes/message.router.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const __dirname = path.resolve();

console.log("testing");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log("Server running on port" + PORT);
});
