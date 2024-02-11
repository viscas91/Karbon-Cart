import { Request, Response } from "express";
import { NotFoundError } from "../../utils/errors/notFound";
import { Brand } from "../../models/mysql/Brand";

// $-title   Update Category
// $-path    PATCH /api/v1/brands/:id
// $-auth    Private

export const updateBrand = async (req: Request, res: Response) => {
	const brand = await Brand.findByPk(req.params.id);

	if (!brand) {
		throw new NotFoundError("brand does not exist");
	}

	const { id } = req.params;
	const fieldsToUpdate = req.body;

	const updatedBrandInfo = await Brand.update(
		{ ...fieldsToUpdate },
        { where: { id } }
	);

	res.status(200).json({
		success: true,
		message: `${brand.title}'s was successfully updated`,
		updatedBrandInfo,
	});
};