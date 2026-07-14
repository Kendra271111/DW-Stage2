import { Router } from 'express';
import { helloWorld, getProfile, getUserByName, createUser } from '../controllers/usercontrollers';

const router = Router();

router.get('/', helloWorld);
router.get('/', getUserByName);
router.post('/', createUser);

export default router;