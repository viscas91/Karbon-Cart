import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../models/mysql/User";
import { UserType } from "../utils/types/common.types";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let jwt_token: string;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!(typeof authHeader === 'string' && authHeader.startsWith('Bearer'))) return res.sendStatus(401);

  if(typeof authHeader === 'string' && authHeader && authHeader.startsWith("Bearer")){
    jwt_token = authHeader.split(" ")[1];

    jwt.verify(
      jwt_token,
      process.env.JWT_ACCESS_SECRET_KEY!,
      async (err, decoded) => {
        if(err){
          // console.log(err);
          res.sendStatus(403);
        };

        const userId = (decoded as JwtPayload).id

        req.user = (await User.findOne({ where: { id: userId } })!) as UserType;
        req.role = (decoded as JwtPayload).role
        next();
      }
    )
  }
}