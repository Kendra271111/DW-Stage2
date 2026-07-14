import { Router } from 'express';
import userRoute from './userRoutes';
import productRoute from './productRoutes';

const router = Router();

router.use('/users', userRoute);
router.use('/products', productRoute);

export default router;

