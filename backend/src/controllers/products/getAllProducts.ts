import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";

// $-title   Get all vendors belonging to a specific User
// $-path    GET /api/v1/products/all
// $-auth    Private

export const getAllProducts = async (req: Request, res: Response) => {
  const pageSize = 10;
	const page = Number(req.query.page) || 1;

  const products = await Product.findAndCountAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: pageSize,
    offset: pageSize * (page - 1),
  });

  return res.json({
		success: true,
		numberOfPages: Math.ceil(products.count / pageSize),
		products,
	});
}

export const getAllUserProducts = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;

    const user = (req.user as UserType);

    const products = await Product.findAndCountAll({
        where: {
          createdBy: user.id, 
        },
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: pageSize,
        offset: pageSize * (page - 1),
      });
	

	return res.json({
		success: true,
		numberOfPages: Math.ceil(products.count / pageSize),
		products,
	});
};