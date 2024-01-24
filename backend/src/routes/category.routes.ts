import express from 'express';
import { getAllCategories, getAllChildCategories, getAllSubCategories } from '../controllers/categories/getAllCategories';
import { getSingleCategory, getSingleChildCategory, getSingleSubCategory } from '../controllers/categories/getSingleCategory';
import { createCategory, createChildCategory, createSubCategory } from '../controllers/categories/createCategory';
import { updateCategory, updateChildCategory, updateSubCategory } from '../controllers/categories/updateCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';

const router = express.Router();

// category
router.get('/all', getAllCategories);
router.get('/:id', getSingleCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

// sub category
router.get('/:categoryId/all', getAllSubCategories);
router.get('/:categoryId/:id', getSingleSubCategory);
router.post('/:categoryId', createSubCategory);
router.patch('/:categoryId/:id', updateSubCategory);
router.delete('/:categoryId/:id', deleteCategory);

// child category
router.get('/:categoryId/:subCategoryId/all', getAllChildCategories);
router.get('/:categoryId/:subCategoryId/:id', getSingleChildCategory);
router.post('/:categoryId/:subCategoryId', createChildCategory);
router.patch('/:categoryId/:subCategoryId/:id', updateChildCategory);
router.delete('/:categoryId/:subCategoryId/:id', deleteCategory);

export { router as categoryRouter };