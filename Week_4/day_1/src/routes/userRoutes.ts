import { Router } from 'express';
import { helloWorld, getAllUsers, getUserById, createUser } from '../controllers/usercontrollers';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;