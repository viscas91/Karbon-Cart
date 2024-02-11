import express, { Request, Response } from 'express';
import { checkAuth } from '../middlewares/isAuthenticated';
import { createProduct } from '../controllers/products/createProduct';
import { getAllProducts } from '../controllers/products/getAllProducts';

const router = express.Router();

router.get('/all', getAllProducts);
router.post('/', createProduct);

export { router as productRouter };