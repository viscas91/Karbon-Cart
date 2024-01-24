import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User";
import { VerifyResetToken } from "../../models/mysql/VerifyResetTokenModel";
import { sendEmail, SendEmailOptions } from "../../utils/sendMail";
import { randomBytes } from 'crypto';
import { Password } from "../../services/password";
import { BadRequestError } from "../../utils/errors/badRequest";

const domainURL = process.env.DOMAIN;

// $-title   Register User and send email verification link
// $-path    POST /api/v1/auth/register
// $-auth    Public

const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, username, email, status, avatar, password, provider, isEmailVerified, passwordChangedAt } = req.body;

	if(!username || !email){
		throw new BadRequestError('Fields cannot be empty')
	}

	const userExists = await User.findOne({
		where: { username }
	});

	if (userExists) {
		res.status(400);
		throw new Error(
			"The email address you've entered is already associated with another account"
		);
	}

	const hashedPassword = await Password.toHash(password);

	const newUser = await User.create({
		firstName,
		lastName,
		username,
		email,
		status,
		avatar,
		password: hashedPassword,
		provider: 'email',
		isEmailVerified,
		passwordChangedAt,
	});

	if (!newUser) {
		res.status(400);
		throw new Error("User could not be registered");
	}

	if (newUser) {
		const verificationToken = randomBytes(32).toString("hex");

		let emailVerificationToken = await VerifyResetToken.create({
			userId: newUser.id!,
			token: verificationToken,
			createdAt: new Date()
		});

		const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${newUser.id}`;

		const payload = {
			name: newUser.firstName,
			link: emailLink,
		};

		const emailOptions: SendEmailOptions = {
			email: newUser.email,
			subject: "Account Activation",
			template: "./emails/template/accountVerification.handlebars",
			payload
		}

		await sendEmail(emailOptions);

		res.json({
			success: true,
			message: `A new user ${newUser.firstName} has been registered! A Verification email has been sent to your account. Please verify within 15 minutes`,
		});
	}
});

export { registerUser };