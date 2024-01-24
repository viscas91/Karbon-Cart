import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { NotFoundError } from "../../utils/errors/notFound";

// $-title   Update Category
// $-path    PATCH /api/v1/category/:id
// $-auth    Private

export const updateCategory = async (req: Request, res: Response) => {
	const category = await Category.findByPk(req.params.id);

	if (!category) {
		throw new NotFoundError("Category does not exist");
	}

	const { id } = req.params;
	const fieldsToUpdate = req.body;

	const updatedCategoryInfo = await Category.update(
		{ ...fieldsToUpdate },
        { where: { id } }
	);

	res.status(200).json({
		success: true,
		message: `${category.title}'s was successfully updated`,
		updatedCategoryInfo,
	});
};

export const updateSubCategory = async (req: Request, res: Response) => {
	const { categoryId, id } = req.params;

	const category = await SubCategory.findOne({
		where: {
			id,
			categoryId,
		}
	});

	if (!category) {
		throw new NotFoundError("Sub Category does not exist");
	}

	const fieldsToUpdate = req.body;

	const updatedCategoryInfo = await SubCategory.update(
		{ ...fieldsToUpdate },
        { 
			where: { 
				id,
				categoryId
			} 
		}
	);

	res.status(200).json({
		success: true,
		message: `${category.title}'s was successfully updated`,
		updatedCategoryInfo,
	});
};

export const updateChildCategory = async (req: Request, res: Response) => {
	const { categoryId, subCategoryId, id } = req.params;

	const category = await ChildCategory.findOne({
		where: {
			id,
			categoryId,
			subCategoryId
		}
	});

	if (!category) {
		throw new NotFoundError("Child Category does not exist");
	}

	const fieldsToUpdate = req.body;

	const updatedCategoryInfo = await ChildCategory.update(
		{ ...fieldsToUpdate },
        { 
			where: { 
				id: subCategoryId,
				categoryId,
				subCategoryId
			} 
		}
	);

	res.status(200).json({
		success: true,
		message: `${category.title}'s was successfully updated`,
		updatedCategoryInfo,
	});
};