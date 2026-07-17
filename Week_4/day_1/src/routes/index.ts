import { Router } from 'express';
import userRoute from './userRoutes';
import productRoute from './productRoutes';
import authRoute from './authRoutes';

const router = Router();

router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/auth', authRoute);

export default router;

