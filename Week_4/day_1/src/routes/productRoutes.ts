import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productcontrollers';
import { validate } from '../middlewares/validate';
import { createProductSchema } from '../validations/productSchema'
import { authent } from '../middlewares/authMiddleware'
import { authorizeRole } from '../middlewares/authorizeRole'
import { upload } from '../libs/multer'


const router = Router();

router.post('/', authent, upload.single('image'), validate(createProductSchema), createProduct);
router.get('/', authent, getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', validate(createProductSchema), updateProduct);
router.delete('/:id', authent, authorizeRole(['ADMIN']), deleteProduct);

export default router;