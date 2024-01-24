import express from 'express';
import { createVendor } from '../controllers/vendors/createVendor';
import { updateVendor } from '../controllers/vendors/updateVendor';
import { getSingleVendor } from '../controllers/vendors/getSingleVendor';
import { getAllVendors } from '../controllers/vendors/getAllVendors';
import { deleteVendor } from '../controllers/vendors/deleteVendor';

const router = express.Router();

router.get('', getAllVendors)
router.get('/:id', getSingleVendor);
router.post('/create', createVendor);
router.patch('/:id', updateVendor);
router.delete('/:id', deleteVendor)

export { router as vendorRouter };
