import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";

// $-title   Update Vendor
// $-path    PATCH /api/v1/vendor/:id
// $-auth    Private

const updateVendor = async (req: Request, res: Response) => {
	const vendor = await Vendor.findByPk(req.params.id);

	if (!vendor) {
		res.status(404);
		throw new Error("Vendor does not exist");
	}

	if (vendor.userId !== (req.user as UserType).id) {
		res.status(401);
		throw new Error(
			"You are not authorized to update this vendor's information"
		);
	}

	const { id } = req.params;
	const fieldsToUpdate = req.body;

	const updatedVendorInfo = await Vendor.update(
		{ ...fieldsToUpdate, id },
        { where: { id } }
	);

	res.status(200).json({
		success: true,
		message: `${vendor.name}'s info was successfully updated`,
		updatedVendorInfo,
	});
};

export { updateVendor };