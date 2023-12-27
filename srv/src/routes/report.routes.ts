import express from "express";
import { report } from "../controllers/report.controller";
const router = express.Router();

// Rotas de Usuario //
router.get("/cashflow", report.cashflow);

export default router;
