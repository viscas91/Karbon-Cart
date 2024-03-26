import { Request, Response } from "express";
import { Order } from "../../models/mysql/Order";
import { UserType } from "../../utils/types/common.types";
import { UserRole } from "../../utils/enums/user.utils";
import { NotAuthorized } from "../../utils/errors/notAuthorized";
import { Payment } from "../../models/mysql/Payment";

// $-path    POST /api/v1/payments
// $-auth    Private

export const getAllPayments = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    console.log(req.user)
    let payments;
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    if (user.role === (UserRole.Admin || UserRole.Staff)) {
        payments = await Payment.findAndCountAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            limit: pageSize,
            offset: pageSize * (page - 1),
          });
    } else if (user.role === UserRole.Vendor) {    
        payments = await Payment.findAndCountAll({
            where: {
              '$order.userId$': user.id,
            },
            include: [
              {
                model: Order,
                as: 'order',
                attributes: [], // Exclude Order attributes from the result
              },
            ],
          });
    } else {
        throw new NotAuthorized('You are not authorized to perform this action.')
    }
  
    return res.json({
          success: true,
          numberOfPages: Math.ceil(payments!.count / pageSize),
          payments,
      });
  }
