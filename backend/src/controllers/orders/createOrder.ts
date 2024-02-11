import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors/badRequest";
import { Order } from "../../models/mysql/Order";
import { OrderStatus } from "../../utils/enums/order.utils";
import Razorpay from "razorpay";
import { v4 as UUIDv4 } from 'uuid';
import { UserType } from "../../utils/types/common.types";

// $-title   Create Order
// $-path    POST /api/v1/orders/create
// $-auth    Private

export const createOrder = async (req: Request, res: Response) => {
	// const { totalAmount } = req.body;

	const totalAmount = 500;

	// const userId = (req.user as UserType).id!;

	if(!totalAmount){
		throw new BadRequestError('Fill the required fields');
	}

	const instance = new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID!,
		key_secret: process.env.RAZORPAY_SECRET!,
	});

	const options = {
		amount: totalAmount * 100, // amount in smallest currency unit
		currency: "INR",
		receipt: UUIDv4(),
	};

	const order = await instance.orders.create(options);

	console.log(order)

	if (!order) return res.status(500).send("Internal Server Error");

	const orderCreated = await Order.create({
		userId: 1,
		totalAmount,
        status: OrderStatus.Pending
	});

	if (!orderCreated) {
		throw new BadRequestError("Brand could not be created.");
	}

	return res.status(201).json({
		success: true,
		message: `Order ${orderCreated.id}, was created`,
		orderCreated,
	});
};