import express from "express";
import { Auth } from "../middlewares/auth";
import costsRoutes from "./costs.routes";
import salesRoutes from "./sales.routes";
import purchasesRoutes from "./purchases.routes";
import categoriesRoutes from "./categories.routes";
import unitsRoutes from "./units.routes";
import productsRoutes from "./products.routes";
import authRoutes from "./auth.routes";
import paymentRoutes from "./paymentMethods.routes";
import userRoutes from "./user.routes";

const router = express.Router();

/* Middleware Auth.private
    - Faz a rota privada e adiciona na requisição o id
      do Tenant. 
*/

router.use("/costs", Auth.private, costsRoutes);
router.use("/sales", Auth.private, salesRoutes);
router.use("/purchases", Auth.private, purchasesRoutes);
router.use("/categories", Auth.private, categoriesRoutes);
router.use("/units", Auth.private, unitsRoutes);
router.use("/paymentsmethods", Auth.private, paymentRoutes);
router.use("/products", Auth.private, productsRoutes);
router.use("/users", Auth.private, userRoutes);
router.use("/", authRoutes);

export default router;
