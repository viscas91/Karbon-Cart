import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { Brand } from "../../models/mysql/Brand";

// $-title   Get all categories
// $-path    GET /api/v1/categories/all
// $-auth    Private

export const getAllBrands = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;

	const limit = page ? pageSize : undefined;
  	const offset = page ? pageSize * (page - 1) : undefined;


	const brands = await Brand.findAndCountAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        limit,
        offset,
      });

	return res.json({
		success: true,
		brandsCount: brands.count,
		numberOfPages: Math.ceil(brands.count / pageSize),
		brands: brands.rows,
	});
};