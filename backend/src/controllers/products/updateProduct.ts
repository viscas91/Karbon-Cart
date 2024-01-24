import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";
import { NotAuthorized } from "../../utils/errors/notAuthorized";

// $-title   Update Vendor
// $-path    PATCH /api/v1/vendor/:id
// $-auth    Private

const updateProduct = async (req: Request, res: Response) => {
	const product = await Product.findByPk(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error("Vendor does not exist");
	}

	if (product.createdBy !== (req.user as UserType).id) {
		throw new NotAuthorized(
			"You are not authorized to update this vendor's information"
		);
	}

	const { id } = req.params;
	const fieldsToUpdate = req.body;

	const updatedProductInfo = await Product.update(
		{ ...fieldsToUpdate },
        { where: { id } }
	);

	res.status(200).json({
		success: true,
		message: `${product.title}'s info was successfully updated`,
		updatedProductInfo,
	});
};

export { updateProduct };