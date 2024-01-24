import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User.js";
import { VerifyResetToken } from "../../models/mysql/VerifyResetTokenModel.js";
import { SendEmailOptions, sendEmail } from "../../utils/sendMail.js";
import { Request, Response } from "express";
const domainURL = process.env.DOMAIN;
const { randomBytes } = await import("crypto");

// $-title   Resend Email Verification Tokens
// $-path    POST /api/v1/auth/resend_email_token
// $-auth    Public

const resendEmailVerificationToken = async (req: Request, res: Response) => {
	const { email } = req.body;

	const user = await User.findOne({ where: { email: email } });

	if (!email) {
		res.status(400);
		throw new Error("An email must be provided");
	}

	if (!user) {
		res.status(400);
		throw new Error(
			"We were unable to find a user with that email address"
		);
	}

	if (user.isEmailVerified) {
		res.status(400);
		throw new Error("This account has already been verified. Please login");
	}

	let verificationToken = await VerifyResetToken.findOne({
		where: {
            userId: user.id
        },
	});

	if (verificationToken) {
		await verificationToken.destroy();
	}

	const resentToken = randomBytes(32).toString("hex");

	let emailToken = await VerifyResetToken.create({
		userId: user.id!,
		token: resentToken,
        createdAt: new Date()
	});

	const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user.id}`;

	const payload = {
		name: user.firstName,
		link: emailLink,
	};

    const sendEmailOptions: SendEmailOptions = {
        email: user.email,
        subject: "Account Verification",
        template: "./emails/template/accountVerification.handlebars",
        payload
    }

	await sendEmail(sendEmailOptions);

	return res.json({
		success: true,
		message: `${user.firstName}, an email has been sent to your account, please verify within 15 minutes`,
	});
};

export { resendEmailVerificationToken };