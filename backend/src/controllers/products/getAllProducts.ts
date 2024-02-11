import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { Product } from "../../models/mysql/Product";
import { UserRole } from "../../utils/enums/user.utils";
import { NotAuthorized } from "../../utils/errors/notAuthorized";

// $-title   Get all vendors belonging to a specific User
// $-path    GET /api/v1/products/all
// $-auth    Private

export const getAllProducts = async (req: Request, res: Response) => {
  const user = req.user as UserType;

  const pageSize = 10;
	const page = Number(req.query.page) || 1;

  let products;

  if (user.role === (UserRole.Admin || UserRole.Staff)) {
    products = await Product.findAndCountAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
  } else if (user.role === UserRole.Vendor) {
    products = await Product.findAndCountAll({
      where: {
        createdBy: user.id
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
  } else {
    throw new NotAuthorized('You are not authorized to view this page')
  }

  return res.json({
		success: true,
		numberOfPages: Math.ceil(products.count / pageSize),
		products,
	});
}

export const getAllUserProducts = async (req: Request, res: Response) => {
  const user = req.user as UserType;

  // Check if the user is an admin or staff
  if (user.role === UserRole.Customer) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  let whereClause = {};
  if (user.role === UserRole.Vendor) {
    // If the user is a vendor, show only their products
    whereClause = { createdBy: user.id };
  }

  const products = await Product.findAndCountAll({
    where: whereClause,
    order: [['createdAt', 'DESC']],
    limit: pageSize,
    offset: pageSize * (page - 1),
  });

  return res.json({
    success: true,
    numberOfPages: Math.ceil(products.count / pageSize),
    products,
  });
};