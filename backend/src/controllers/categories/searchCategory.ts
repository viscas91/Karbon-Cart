import { Request, Response } from "express";
import { Category, ChildCategory, SubCategory } from "../../models/mysql/Category";
import { NotFoundError } from "../../utils/errors/notFound";
import { Op } from "sequelize";

// $-title   Update Category
// $-path    PATCH /api/v1/category/:id
export const searchCategory = async (req: Request, res: Response) => {
// $-auth    Private

    const page = Number(req.query.page);
	const pageSize = Number(req.query.pageSize);
    const searchTerm = req.query.search

    const limit = page ? pageSize : undefined;
  	const offset = page ? pageSize * (page - 1) : undefined;

	const categories = await Category.findAndCountAll({
        where: {
            title: {
                [Op.iLike]: `%${searchTerm}%`
            }   
        },
        limit,
        offset,
    });

	res.status(200).json({
		success: true,
		message: `Categories found`,
        count: Math.ceil(categories.count / pageSize),
		categories: categories.rows,
	});
};