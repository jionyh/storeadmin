import express from "express";
import { purchase } from "../controllers/purchase.controller";
const router = express.Router();

// Rotas de compras //
router.get("/", purchase.getAllPurchases);
router.get("/:id", purchase.getPurchase);
router.post("/", purchase.createPurchase);
router.delete("/:id", purchase.deletePurchase);

export default router;
