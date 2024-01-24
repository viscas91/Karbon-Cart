import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User.js";
import { VerifyResetToken } from "../../models/mysql/VerifyResetTokenModel.js";
import { SendEmailOptions, sendEmail } from "../../utils/sendMail.js";
import { Request, Response } from "express";
const domainURL = process.env.DOMAIN;
const { randomBytes } = await import("crypto");

// $-title   Send password reset email link
// $-path    POST /api/v1/auth/reset_password_request
// $-auth    Public

const resetPasswordRequest = async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email) {
		res.status(400);
		throw new Error("You must enter your email address");
	}

	const existingUser = await User.findOne({ where: { email } });

	if (!existingUser) {
		res.status(400);
		throw new Error("That email is not associated with any account");
	}

	let verificationToken = await VerifyResetToken.findOne({
		where: {
            userId: existingUser.id
        }
	});

	if (verificationToken) {
		await VerifyResetToken.destroy({ where: { userId: existingUser.id }})
	}

	const resetToken = randomBytes(32).toString("hex");

    let newVerificationToken = await VerifyResetToken.create({ userId: existingUser.id!, token: resetToken, createdAt: new Date() });

	if (existingUser && existingUser.isEmailVerified) {
		const emailLink = `${domainURL}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser.id}`;

		const payload = {
			name: existingUser.firstName,
			link: emailLink,
		};

        const sendEmailOptions: SendEmailOptions = {
            email: existingUser.email,
            subject: "Password Reset Request",
            template: "./emails/template/requestResetPassword.handlebars",
            payload
        }

		await sendEmail(sendEmailOptions);

		return res.status(200).json({
			success: true,
			message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
		});
	}
};

// $-title   Reset User Password
// $-path    POST /api/v1/auth/reset_password
// $-auth    Public

const resetPassword = async (req, res) => {
	const { password, passwordConfirm, userId, emailToken } = req.body;

	if (!password) {
		res.status(400);
		throw new Error("A password is required");
	}
	if (!passwordConfirm) {
		res.status(400);
		throw new Error("A confirm password field is required");
	}

	if (password !== passwordConfirm) {
		res.status(400);
		throw new Error("Passwords do not match");
	}

	if (password.length < 8) {
		res.status(400);
		throw new Error("Passwords must be at least 8 characters long");
	}

	const passwordResetToken = await VerifyResetToken.findOne({ where: { userId }});

	if (!passwordResetToken) {
		res.status(400);
		throw new Error(
			"Your token is either invalid or expired. Try resetting your password again"
		);
	}

	const user = await User.findByPk(passwordResetToken.userId);

	if (user && passwordResetToken) {
		user.password = password;
		await user.save();

		const payload = {
			name: user.firstName,
		};

        const sendEmailOptions: SendEmailOptions = {
            email: user.email,
            subject: "Password Reset Success",
            template: "./emails/template/resetPassword.handlebars",
            payload
        }

		await sendEmail(sendEmailOptions);

		return res.json({
			success: true,
			message: `Hey ${user.firstName},Your password reset was successful. An email has been sent to confirm the same`,
		});
	}
};

export { resetPasswordRequest, resetPassword };