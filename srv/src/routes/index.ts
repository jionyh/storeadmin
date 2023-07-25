import express from 'express';
import costsRoutes from './costs.routes';
import salesRoutes from './sales.routes';
import authRoutes from './auth.routes'

const router = express.Router();

router.use('/costs', costsRoutes);
router.use('/sales', salesRoutes);
router.use('/', authRoutes )

export default router;