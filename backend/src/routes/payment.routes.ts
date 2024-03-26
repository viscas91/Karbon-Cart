import express from 'express';
import { getAllPayments } from '../controllers/payments/getAllPayments';

const router = express.Router();

router.get('/all', getAllPayments);
router.post('/create');

export { router as PaymentRouter };