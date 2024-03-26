import express from 'express';
import { getAllCategories } from '../controllers/categories/getAllCategories';
import { getSingleCategory } from '../controllers/categories/getSingleCategory';
import { createCategory } from '../controllers/categories/createCategory';
import { updateCategory } from '../controllers/categories/updateCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';
import { searchCategory } from '../controllers/categories/searchCategory';

const router = express.Router();

router.get('/all', getAllCategories);
router.get('/:id', getSingleCategory);
router.post('/', createCategory);
router.get('/', searchCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export { router as categoryRouter };