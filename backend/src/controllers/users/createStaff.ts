import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User";
import { VerifyResetToken } from "../../models/mysql/VerifyResetTokenModel";
import { sendEmail, SendEmailOptions } from "../../utils/sendMail";
import { randomBytes } from 'crypto';
import { generateRandomPassword, Password } from "../../services/password";
import { BadRequestError } from "../../utils/errors/badRequest";
import { UserStatus } from "../../utils/enums/user.utils";

const domainURL = process.env.DOMAIN;

// $-title   Register User and send email verification link
// $-path    POST /api/v1/auth/register
// $-auth    Public

const createStaff = asyncHandler(async (req, res) => {
	const { email } = req.body;

	if(!email){
		throw new BadRequestError('Email is required.')
	}

	const staffExists = await User.findOne({
		where: { email }
	});

	if (staffExists) {
		throw new BadRequestError(
			"The email address you've entered is already associated with another account"
		);
	}

    const password = await generateRandomPassword();
	const hashedPassword = await Password.toHash(password);

	const newStaff = await User.create({
		firstName: '',
		lastName: '',
		username: '',
		email,
		status: UserStatus.InActive,
		avatar: '',
		password: hashedPassword,
		provider: 'email',
		isEmailVerified: false,
	});

	if (!newStaff) {
		throw new BadRequestError("User could not be registered");
	}

	if (newStaff) {
		const verificationToken = randomBytes(32).toString("hex");

		let emailVerificationToken = await VerifyResetToken.create({
			userId: newStaff.id!,
			token: verificationToken,
			createdAt: new Date()
		});

		const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${newStaff.id}`;

		const payload = {
			name: newStaff.email,
			link: emailLink,
		};

		const emailOptions: SendEmailOptions = {
			email: newStaff.email,
			subject: "Staff Account Activation",
			template: "./emails/template/staffAccountVerification.handlebars",
			payload
		}

		await sendEmail(emailOptions);

		res.json({
			success: true,
			message: `A new staff member ${newStaff.email} account has been created! A Verification email has been sent to your account. Please verify within 15 minutes`,
		});
	}
});

export { createStaff };