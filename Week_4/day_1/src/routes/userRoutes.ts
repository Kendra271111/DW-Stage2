import { Router } from 'express';
import { helloWorld, getAllUsers, getUserById, createUser, transferPoint } from '../controllers/usercontrollers';
import { validate } from '../middlewares/validate';
import { validateTransferPoint } from '../validations/userSchema';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/transfer', validate(validateTransferPoint), transferPoint);

export default router;
