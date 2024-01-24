import { Request, Response } from "express";
import { Vendor } from "../../models/mysql/Vendor";
import { UserType } from "../../utils/types/common.types";

// $-title   Get all vendors belonging to a specific User
// $-path    GET /api/v1/vendor/all
// $-auth    Private

const getAllVendors = async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.page) || 1;

    const user = (req.user as UserType);

	const count = await Vendor.count({ where: { userId: user.id }});

	const vendors = await Vendor.findAll({
        where: {
          userId: user.id, 
        },
        order: [
          ['createdAt', 'DESC'],
        ],
        limit: pageSize,
        offset: pageSize * (page - 1),
      });

	res.json({
		success: true,
		totalCustomers: count,
		numberOfPages: Math.ceil(count / pageSize),
		vendors: vendors,
	});
};

export { getAllVendors };