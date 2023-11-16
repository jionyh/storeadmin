import express from "express";
import { user } from "../controllers/user.controller";
const router = express.Router();

// Rotas de Usuario //
router.post("/signup", user.addUser);

export default router;
