import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";

// $-title   Get a Single Vendor belonging to a User
// $-path    GET /api/v1/vendor/:id
// $-auth    Private

const getSingleVendor = async (req: Request, res: Response) => {
	const customer = await Vendor.findByPk(req.params.id);

	const user = (req.user as UserType).id;

	if (!customer) {
		res.status(204);
		throw new Error("Customer not found");
	}

	if (customer.id !== user) {
		res.status(200).json({
			success: true,
			customer,
		});
	} else {
		res.status(401);
		throw new Error(
			"You are not authorized to view this vendor's information"
		);
	}
};

export { getSingleVendor };