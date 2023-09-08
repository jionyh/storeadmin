import express from "express";
import { paymentMethod } from "../controllers/paymentMethods.controller";
const router = express.Router();
router.get("/", paymentMethod.getAllPayments);
//router.post('/', paymentMethod.createPayment)
//router.patch('/:id', paymentMethod.editPayment)
//router.delete('/:id', paymentMethod.deletePayment)

export default router;
