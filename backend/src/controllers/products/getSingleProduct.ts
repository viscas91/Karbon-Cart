import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";

// $-title   Get a Single Vendor belonging to a User
// $-path    GET /api/v1/vendor/:id
// $-auth    Private

const getSingleProduct = async (req: Request, res: Response) => {
	const product = await Vendor.findByPk(req.params.id);

	if (!product) {
		res.status(204);
		throw new Error("Product not found");
	}

	
    res.status(200).json({
        success: true,
        product,
    });
};

export { getSingleProduct };