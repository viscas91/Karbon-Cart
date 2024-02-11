import express from 'express';
import { getAllBrands } from '../controllers/brands/getAllBrands';
import { getSingleBrand } from '../controllers/brands/getSingleBrand';
import { createBrand } from '../controllers/brands/createBrand';
import { updateBrand } from '../controllers/brands/updateBrand';
import { deleteBrand } from '../controllers/brands/deleteBrand';

const router = express.Router();

router.get('/all', getAllBrands);
router.get('/:id', getSingleBrand);
router.post('/', createBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export { router as brandRouter };