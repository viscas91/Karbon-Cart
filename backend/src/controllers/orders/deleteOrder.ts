import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { Order } from "../../models/mysql/Order";

// $-title   Delete Product
// $-path    DELETE /api/v1/order/:id
// $-auth    Private

const deleteProduct = async (req: Request, res: Response) => {
	const order = await Order.findByPk(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error("That product does not exist!");
	}

	if (order.userId !== (req.user! as UserType).pkid) {
		throw new NotAuthorized(
			"You are not authorized to perform this action."
		);
	}

	await order.destroy();

	res.json({ success: true, message: "Product has been deleted" });
};

export { deleteProduct };