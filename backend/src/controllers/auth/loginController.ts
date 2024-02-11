import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { systemLogs } from '../../utils/Logger';
import { BadRequestError } from '../../utils/errors/badRequest';
import { Password } from '../../services/password';
import { User } from '../../models/mysql/User';
import { UserStatus } from '../../utils/enums/user.utils';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Email and password are required.");
    }

    const existingUser = await User.findOne({ where: { email: email }});

    if(!existingUser || !(await Password.compare(existingUser.password, password))){
        systemLogs.error("Incorrect email or password");
        throw new BadRequestError("Incorrect email or password");
    }

    if(!existingUser.isEmailVerified) {
        throw new BadRequestError("You are not verified. Check you email, a verification link was sent when you registered");
    }

    if(existingUser.status !== UserStatus.Active){
        throw new BadRequestError("You account is not activated, check mail or contact support");
    }
    
    if (existingUser && (await Password.compare(existingUser.password, password))) {
		const accessToken = jwt.sign(
			{
				id: existingUser.id,
				role: existingUser.role,
			},
			process.env.JWT_ACCESS_SECRET_KEY as string,
			{ expiresIn: "10m" }
		);

		const newRefreshToken = jwt.sign(
			{
    				id: existingUser.id,
			},
			process.env.JWT_REFRESH_SECRET_KEY as string,
			{ expiresIn: "1d" }
		);

		const cookies = req.cookies;

        let newRefreshTokenArray = !cookies?.jwt ? existingUser.refreshToken : '';

		if (cookies?.jwt) {
			const refreshToken = cookies.jwt;
			const existingRefreshToken = await User.findOne({
				where: { refreshToken }
			});

			if (!existingRefreshToken) {
				const options = {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: true,
                    sameSite: "None" as "none",
                };
    
                res.clearCookie("jwt", options);
			}
		} else {
            existingUser.refreshToken = newRefreshToken;
		    await existingUser.save();
        }

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
    } else {
        throw new BadRequestError("Invalid credentials");
    }
}