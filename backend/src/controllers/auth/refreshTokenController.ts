import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../../models/mysql/User";
import { Request, Response } from "express";
import { UserType } from "../../utils/types/common.types";
import { NotAuthenticated } from "../../utils/errors/notAuthenticated";
import { NotAuthorized } from "../../utils/errors/notAuthorized";

// $-title   Get new access tokens from the refresh token
// $-path    GET /api/v1/auth/new_access_token
// $-auth    Public
// we are rotating the refresh tokens, deleting the old ones, creating new ones and detecting token reuse

export const newAccessToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	const refreshToken = cookies.jwt;

	const options = {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		secure: true,
		sameSite: "None" as "none",
	};
	res.clearCookie("jwt", options);

	const existingUser = await User.findOne({ where: {
        refreshToken
    }});

	if (!existingUser) {
		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!,
            { algorithms: ['HS256'] },
			async (err, decoded) => {
				if (err) {
					return res.sendStatus(403);
				}
				await User.update({ refreshToken: '' }, { where: {id: (decoded as UserType).id } });
			}
		);
		return res.sendStatus(403);
	}

	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_SECRET_KEY!,
		async (err: any, decoded: any) => {
			if (err || existingUser.id!.toString() !== decoded.id) {
				return res.sendStatus(403);
			}

			const accessToken = jwt.sign(
				{
					id: existingUser.id,
					roles: existingUser.role,
				},
				process.env.JWT_ACCESS_SECRET_KEY!,
				{ expiresIn: "10m" }
			);

			const newRefreshToken = jwt.sign(
				{ id: existingUser.id },
				process.env.JWT_REFRESH_SECRET_KEY!,
				{ expiresIn: "1d" }
			);

            await User.update({ refreshToken: newRefreshToken }, { where: { id: existingUser.id } })

			const options = {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
				secure: true,
				sameSite: "None" as "none",
			};

			res.cookie("jwt", newRefreshToken, options);

			res.json({
				success: true,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
				username: existingUser.username,
				provider: existingUser.provider,
				avatar: existingUser.avatar,
				accessToken,
			});
		}
	);
};