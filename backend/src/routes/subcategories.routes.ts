import express from 'express';
import { getAllSubCategories, getAllSubCategoriesByCategoryID } from '../controllers/categories/getAllCategories';
import { getSingleSubCategory } from '../controllers/categories/getSingleCategory';
import { createSubCategory } from '../controllers/categories/createCategory';
import { updateSubCategory } from '../controllers/categories/updateCategory';
import { deleteSubCategory } from '../controllers/categories/deleteCategory';

const router = express.Router();

// child category
router.get('/all', getAllSubCategories);
router.get('/:categoryId/all', getAllSubCategoriesByCategoryID);
router.get('/:id', getSingleSubCategory);
router.post('/', createSubCategory);
router.patch('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);

export { router as subCategoryRouter };