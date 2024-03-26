import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors/badRequest";
import slugify from 'slugify';
import { Brand } from "../../models/mysql/Brand";
import { Order } from "../../models/mysql/Order";
import { OrderStatus } from "../../utils/enums/order.utils";
import { UserType } from "../../utils/types/common.types";
import { UserRole } from "../../utils/enums/user.utils";
import { NotAuthorized } from "../../utils/errors/notAuthorized";

// $-title   Create Order
// $-path    POST /api/v1/orders/create
// $-auth    Private

export const getAllOrders = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    let orders;
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    if (user.role === (UserRole.Admin || UserRole.Staff)) {
        orders = await Order.findAndCountAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            limit: pageSize,
            offset: pageSize * (page - 1),
          });
    } else if (user.role === UserRole.Vendor) {
        orders = await Order.findAndCountAll({
            where: {
                userId: user.id
            },
            order: [
              ['createdAt', 'DESC'],
            ],
            limit: pageSize,
            offset: pageSize * (page - 1),
          });
    } else {
        throw new NotAuthorized('You are not authorized to perform this action.')
    }
  
    return res.json({
          success: true,
          numberOfPages: Math.ceil(orders!.count / pageSize),
          orders,
      });
  }
