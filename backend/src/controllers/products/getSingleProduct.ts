import { Request, Response } from "express";
import { Product } from "../../models/mysql/Product";
import { NoContentError } from "../../utils/errors/noContent";

// $-title   Get a Single Vendor belonging to a User
// $-path    GET /api/v1/vendor/:id
// $-auth    Private

const getSingleProduct = async (req: Request, res: Response) => {
	const product = await Product.findByPk(req.params.id);

	if (!product) {
		throw new NoContentError("Product not found");
	}

    res.status(200).json({
        success: true,
        product,
    });
};

export { getSingleProduct };