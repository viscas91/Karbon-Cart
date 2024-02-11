import { Request, Response } from "express";
import { NotFoundError } from "../../utils/errors/notFound";
import { Brand } from "../../models/mysql/Brand";

// $-title   Get a Single category
// $-path    GET /api/v1/brand/:id
// $-auth    Private

export const getSingleBrand = async (req: Request, res: Response) => {
	const brand = await Brand.findByPk(req.params.id);

	if (!brand) {
		throw new NotFoundError("Brand not found.");
	}

    return res.status(200).json({
        success: true,
        brand,
    });
};