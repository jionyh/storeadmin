import express from 'express';
import { Auth } from '../middlewares/auth';
import costsRoutes from './costs.routes';
import salesRoutes from './sales.routes';
import authRoutes from './auth.routes'

const router = express.Router();

router.use('/costs',Auth.private, costsRoutes);
router.use('/sales', salesRoutes);
router.use('/', authRoutes )

export default router;