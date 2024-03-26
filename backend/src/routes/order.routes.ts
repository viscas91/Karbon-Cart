import express from 'express';
import { createOrder } from '../controllers/orders/createOrder';
import { getAllOrders } from '../controllers/orders/getAllOrders';

const router = express.Router();

router.get('/all', getAllOrders);
router.post('/create', createOrder);

export { router as OrderRouter };