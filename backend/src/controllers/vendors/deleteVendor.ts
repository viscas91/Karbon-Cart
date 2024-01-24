import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";

// $-title   Delete Vendor
// $-path    DELETE /api/v1/vendor/:id
// $-auth    Private

export const deleteVendor = async (req: Request, res: Response) => {
	const vendor = await Vendor.findByPk(req.params.id);

	if (!vendor) {
		res.status(404);
		throw new Error("That vendor does not exist!");
	}

	if (vendor.userId !== (req.user! as UserType).id) {
		res.status(401);
		throw new Error(
			"You are not authorized to delete this vendor's information."
		);
	}

	await vendor.destroy();

	res.json({ success: true, message: "Vendor has been deleted" });
};