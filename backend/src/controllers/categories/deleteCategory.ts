import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { NotFoundError } from '../../utils/errors/notFound';

// $-title   Delete Vendor
// $-path    DELETE /api/v1/vendor/:id
// $-auth    Private

export const deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
	const category = await Category.findOne({ where: { id }});

	if (!category) {
		throw new NotFoundError('Category Not Found');
	}

	await category.destroy();

	return res.status(204).end();
};

export const deleteSubCategory = async (req: Request, res: Response) => {
    const { categoryId, id } = req.params;
	const category = await SubCategory.findOne({ where: { id, categoryId }});

	if (!category) {
		throw new NotFoundError('Sub Category Not Found');
	}

	await category.destroy();

	return res.status(204).end();
};


export const deleteChildCategory = async (req: Request, res: Response) => {
    const { categoryId, subCategoryId, id } = req.params;
	const category = await ChildCategory.findOne({ where: { id, categoryId, subCategoryId }});

	if (!category) {
		throw new NotFoundError('Child Category Not Found');
	}

	await category.destroy();

	return res.status(204).end();
};