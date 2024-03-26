import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { NotFoundError } from "../../utils/errors/notFound";

// $-title   Delete Product
// $-path    DELETE /api/v1/product/:id
// $-auth    Private

const deleteProduct = async (req: Request, res: Response) => {
	const product = await Product.findByPk(req.params.id);

	if (!product) {
		throw new NotFoundError("That product does not exist!");
	}

	if (product.createdBy !== (req.user! as UserType).id) {
		throw new NotAuthorized(
			"You are not authorized to delete this product."
		);
	}

	await product.destroy();

	return res.json({ success: true, message: "Product has been deleted" });
};

export { deleteProduct };