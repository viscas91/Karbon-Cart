import { Request, Response } from "express";
import { Cart } from "../../models/mysql/Cart";
import { CartItem } from "../../models/mysql/CartItem";
import { Product } from "../../models/mysql/Product";
import { NotFoundError } from "../../utils/errors/notFound";
import { BadRequestError } from "../../utils/errors/badRequest";
import { UserType } from "../../utils/types/common.types";
import { ProductType } from "../../utils/types/product.types";

export const getCart = async (req: Request, res: Response) => {
  try {
      // Get the user ID from the logged-in user information
      const userId = (req.user! as UserType).id;

      // Find the user's cart
      // const user = await User.findByPk(userId);
      const userCart = await Cart.findOne({ where: { customerId: userId } });

      // If the user doesn't have a cart, create one
      if (!userCart) {
          const [cart, created] = await Cart.findOrCreate({
              where: { customerId: userId },
              include: [
                  {
                      model: CartItem,
                      include: [Product],
                  },
              ],
          });

          return res.json(cart);
      }

      return res.json(userCart);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
        const cartId = Number(req.params.cartId);
        const productId = Number(req.params.productId);
        const quantity = req.body.quantity || 1; // Default to 1 if quantity is not provided
    
        let cart = await Cart.findByPk(cartId);
        if (!cart) {
          cart = await Cart.create({ 
            customerId: (req.user as UserType)?.id!,
          });
        }
    
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
    
        const cartItem = await CartItem.create({
          cartId, 
          productId,
          quantity,
          price: Number((product as ProductType).price),
          subTotal: quantity * Number(product.price),
        });
    
        return res.json(cartItem);
}

export const deleteCartItem = async (req: Request, res: Response) => {
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);

  // const cart = await Cart.findByPk(cartId);
  const cartItemToDelete = await CartItem.findOne({ where: { cartId, productId } });

  if(!cartItemToDelete) throw new BadRequestError('Items not found');

  await cartItemToDelete?.destroy();

  return res.json("Cart items have been deleted");
}

export const deleteAllCartItems = async (req: Request, res: Response) => {
  const cartId = Number(req.params.cartId);

  const allCartItems = await CartItem.findAll({ where: { cartId } });
  
  for (let item in allCartItems){
    console.log(item)
  }
  
}