import asyncHandler from "express-async-handler";
import { User } from "../../models/mysql/User";
import { VerifyResetToken } from "../../models/mysql/VerifyResetTokenModel";
import { SendEmailOptions, sendEmail } from "../../utils/sendMail";

const domainURL = process.env.DOMAIN;

// $-title   Verify User Email
// $-path    GET /api/v1/auth/verify/:emailToken/:userId
// $-auth    Public

const verifyUserEmail = asyncHandler(async (req, res) => {
	const user = await User.findOne({ where: { id: req.params.userId } });

	if (!user) {
		res.status(400);
		throw new Error("We were unable to find a user for this token");
	}
	if (user.isEmailVerified) {
		res.status(400).send(
			"This user has already been verified. Please login"
		);
	}

	const userToken = await VerifyResetToken.findOne({ where: {
		userId: user.id,
		token: req.params.emailToken,
	}});

	if (!userToken?.token) {
		res.status(400);
		throw new Error("Token invalid! Your token may have expired");
	}

	user.isEmailVerified = true;

	await User.update(
		{ isEmailVerified: true },
		{ where: { id: user.id }}
	)

	if (user.isEmailVerified) {
		const emailLink = `${domainURL}/login`;

		const payload = {
			name: user.firstName,
			link: emailLink,
		};

		const emailOptions: SendEmailOptions = {
			email: user.email,
			subject: "Welcome - Account Verified",
			template: "./emails/template/welcome.handlebars",
			payload
		}

		await sendEmail(emailOptions);

		return res.redirect("/login");
	}
});

export default verifyUserEmail;