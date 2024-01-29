import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { NotFoundError } from "../../utils/errors/notFound";

// $-title   Get a Single category
// $-path    GET /api/v1/category/:id
// $-auth    Private

export const getSingleCategory = async (req: Request, res: Response) => {
	const category = await Category.findByPk(req.params.id);

	if (!category) {
		throw new NotFoundError("Category not found.");
	}

    return res.status(200).json({
        success: true,
        category,
    });
};

export const getSingleSubCategory = async (req: Request, res: Response) => {
	const category = await SubCategory.findOne({
        where: {
            id: req.params.id,
        }
    });

	if (!category) {
		throw new NotFoundError("Sub Category not found.");
	}

    return res.status(200).json({
        success: true,
        subCategory: category,
    });
};

export const getSingleChildCategory = async (req: Request, res: Response) => {
	const category = await ChildCategory.findByPk(req.params.id);

	if (!category) {
		throw new NotFoundError("Sub Category not found.");
	}

    return res.status(200).json({
        success: true,
        childCategory: category,
    });
};