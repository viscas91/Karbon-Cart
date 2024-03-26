import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { NotFoundError } from "../../utils/errors/notFound";

// $-title   Update Vendor
// $-path    PATCH /api/v1/vendor/:id
// $-auth    Private

const updateProduct = async (req: Request, res: Response) => {
	const product = await Product.findByPk(req.params.id);

	if (!product) {
		throw new NotFoundError("Vendor does not exist");
	}

	if (product.createdBy !== (req.user as UserType).id) {
		throw new NotAuthorized(
			"You are not authorized to perform this action"
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