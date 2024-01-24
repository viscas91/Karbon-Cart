import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User";
import { Request, Response } from "express";
import { BadRequestError } from "../../utils/errors/badRequest";

const logoutUser = async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.sendStatus(204);
		throw new BadRequestError("No cookie found");
	}

	const refreshToken = cookies.jwt;

	const existingUser = await User.findOne({ where: { refreshToken } });
	if (!existingUser) {
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: true,
			sameSite: "None" as "none",
		});
		return res.sendStatus(204);
	}

	existingUser.refreshToken = (existingUser.refreshToken as string[])!.filter(
		(refT) => refT !== refreshToken
	);
	await existingUser.save();

	res.clearCookie("jwt", {
		httpOnly: true,
		secure: true,
		sameSite: "None" as "none",
	});

	res.status(200).json({
		success: true,
		message: `${existingUser.firstName}, you have been logged out successfully`,
	});
};

export { logoutUser };