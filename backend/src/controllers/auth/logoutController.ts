import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User";
import { Request, Response } from "express";

const logoutUser = async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		res.sendStatus(204);
		throw new Error("No cookie found");
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

	existingUser.refreshToken = '';
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