import express from 'express';
import { getAllCategories, getAllChildCategories, getAllSubCategories, getAllSubCategoriesByCategoryID } from '../controllers/categories/getAllCategories';
import { getSingleCategory, getSingleChildCategory, getSingleSubCategory } from '../controllers/categories/getSingleCategory';
import { createCategory, createChildCategory, createSubCategory } from '../controllers/categories/createCategory';
import { updateCategory, updateChildCategory, updateSubCategory } from '../controllers/categories/updateCategory';
import { deleteCategory, deleteSubCategory } from '../controllers/categories/deleteCategory';

const router = express.Router();

router.get('/all', getAllCategories);
router.get('/:id', getSingleCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export { router as categoryRouter };