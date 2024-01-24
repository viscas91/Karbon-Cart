import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";

// $-title   Get all categories
// $-path    GET /api/v1/categories/all
// $-auth    Private

export const getAllCategories = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;

	const limit = page ? pageSize : undefined;
  	const offset = page ? pageSize * (page - 1) : undefined;


	const categories = await Category.findAndCountAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      });

	return res.json({
		success: true,
		categoriesCount: categories.count,
		numberOfPages: Math.ceil(categories.count / pageSize),
		categories: categories.rows,
	});
};

export const getAllSubCategories = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;
	const categoryId = req.params.categoryId

	const limit = page ? pageSize : undefined;
  	const offset = page ? pageSize * (page - 1) : undefined;


	const categories = await SubCategory.findAndCountAll({
		where: {
			categoryId
		},
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      });

	return res.json({
		success: true,
		subCategoriesCount: categories.count,
		numberOfPages: Math.ceil(categories.count / pageSize),
		subCategories: categories.rows,
	});
};

export const getAllChildCategories = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;
	const categoryId = req.params.categoryId;
	const subCategoryId = req.params.subCategoryId;

	const limit = page ? pageSize : undefined;
  	const offset = page ? pageSize * (page - 1) : undefined;


	const categories = await ChildCategory.findAndCountAll({
		where: {
			categoryId,
			subCategoryId
		},
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      });

	return res.json({
		success: true,
		childCategoriesCount: categories.count,
		numberOfPages: Math.ceil(categories.count / pageSize),
		childCategories: categories.rows,
	});
};