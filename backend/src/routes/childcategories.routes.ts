import express from 'express';
import { getAllChildCategories, getAllChildCategoriesByCategoryID } from '../controllers/categories/getAllCategories';
import { getSingleChildCategory } from '../controllers/categories/getSingleCategory';
import { createChildCategory } from '../controllers/categories/createCategory';
import { updateChildCategory } from '../controllers/categories/updateCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';

const router = express.Router();

// child category
router.get('/all', getAllChildCategories);
router.get('/:categoryId/:subCategoryId/all', getAllChildCategoriesByCategoryID);
router.get('/:id', getSingleChildCategory);
router.post('/', createChildCategory);
router.patch('/:id', updateChildCategory);
router.delete('/:id', deleteCategory);

export { router as childCategoryRouter };