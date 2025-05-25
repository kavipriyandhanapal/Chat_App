import express from "express";
import {
  getAllMessages,
  getSideNavUsers,
  saveMessage,
} from "../controllers/message.controller.js";
import protectedRoute from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/users", protectedRoute, getSideNavUsers);
router.get("/:id", protectedRoute, getAllMessages);
router.post("/send/:id", protectedRoute, saveMessage);

export default router;
