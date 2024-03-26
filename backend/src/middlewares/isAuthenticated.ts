import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../models/mysql/User";
import { UserType } from "../utils/types/common.types";
import { NotAuthorized } from "../utils/errors/notAuthorized";
import { NotAuthenticated } from "../utils/errors/notAuthenticated";

type CustomRequest = Request & { role?: string }

export const checkAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
	let jwt_token: string;

	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader || (Array.isArray(authHeader) && !authHeader[0]?.startsWith("Bearer"))) {
		return res.sendStatus(401);
	}

	if (authHeader && (typeof authHeader === 'string' || authHeader[0]?.startsWith("Bearer"))) {
		jwt_token = Array.isArray(authHeader) ? authHeader[0].split(" ")[1] : authHeader.split(" ")[1];

		jwt.verify(
			jwt_token,
			process.env.JWT_ACCESS_SECRET_KEY as string,
			{ algorithms: ['HS256'] },
			async (err, decoded) => {
				if (err) {
					console.log(err)
					return res.sendStatus(403);
				}

				const userId = (decoded as UserType).id;
				req.user = await User.findOne({
					where: {
						id: userId
					}
				})! || undefined;
				req.role = (decoded as UserType).role;
				next();
			}
		);
	}
};