import { Request, Response } from "express";
import { NotFoundError } from '../../utils/errors/notFound';
import { Brand } from "../../models/mysql/Brand";

// $-title   Delete Vendor
// $-path    DELETE /api/v1/vendor/:id
// $-auth    Private

export const deleteBrand = async (req: Request, res: Response) => {
    const id = req.params.id;
	const brand = await Brand.findOne({ where: { id }});

	if (!brand) {
		throw new NotFoundError('Brand Not Found');
	}

	await brand.destroy();

	return res.status(204).end();
};