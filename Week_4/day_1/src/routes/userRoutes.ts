import { Router } from 'express';
import { helloWorld, getProfile, getUserByName, createUser } from '../controllers/usercontrollers';

const router = Router();

router.get('/hello', helloWorld);
router.get('/profile/:name', getUserByName);
router.post('/login', createUser);

export default router;