import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { UserRole } from "../../utils/enums/user.utils";
import { Order } from "../../models/mysql/Order";

// $-title   Update Order
// $-path    PATCH /api/v1/orders/:id
// $-auth    Private

const updateOrder = async (req: Request, res: Response) => {
	const order = await Order.findByPk(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error("Order does not exist");
	}

    const user = req.user as UserType;

	if (user.role !== (UserRole.Admin || UserRole.Staff)) {
		throw new NotAuthorized(
			"You are not authorized to perform this action"
		);
	}

	const { id } = req.params;
	const fieldsToUpdate = req.body;

	const updatedOrderInfo = await Order.update(
		{ ...fieldsToUpdate },
        { where: { id } }
	);

	res.status(200).json({
		success: true,
		message: `${order.id}'s info was successfully updated`,
		updatedOrderInfo,
	});
};

export { updateOrder };