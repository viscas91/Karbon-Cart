import express from 'express';
import { createOrder } from '../controllers/orders/createOrder';

const router = express.Router();

router.get('/create', createOrder)

export { router as OrderRouter };