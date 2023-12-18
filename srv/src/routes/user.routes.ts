import express from "express";
import { user } from "../controllers/user.controller";
const router = express.Router();

// Rotas de Usuario //
router.post("/add", user.addUser);
router.get("/:id", user.getUser);
router.post("/edit", user.changePassword);

export default router;
