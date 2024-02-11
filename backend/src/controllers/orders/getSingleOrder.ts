import { Request, Response } from "express";
import { Order } from "../../models/mysql/Order";

// $-title   Get a Single Order belonging to a User
// $-path    GET /api/v1/order/:id
// $-auth    Private

const getSingleOrder = async (req: Request, res: Response) => {
	const order = await Order.findByPk(req.params.id);

	if (!order) {
		res.status(204);
		throw new Error("Order not found");
	}

	
    res.status(200).json({
        success: true,
        order,
    });
};

export { getSingleOrder };