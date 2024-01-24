import express from 'express';
import { addProductToCart, deleteAllCartItems, deleteCartItem, getCart } from '../controllers/cart/cartController';

const router = express.Router();

router.get('/', getCart);
router.post('/:cartId/:productId', addProductToCart);
router.delete('/:cartId/:productId', deleteCartItem);
router.delete('/:cartId', deleteAllCartItems);

export { router as CartRouter };