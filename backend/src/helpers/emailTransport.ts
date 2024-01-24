import "dotenv/config";
import nodemailer, { Transporter } from "nodemailer";
import mg from "nodemailer-mailgun-transport";

let transporter: Transporter;

if (process.env.NODE_ENV === "development") {
	// transporter = nodemailer.createTransport({
	// 	host: "localhost",
	// 	port: 1025,
	// });
	const apiKey = process.env.MAILGUN_API_KEY;
	const domain = process.env.MAILGUN_DOMAIN;

	if(!apiKey || !domain){
		throw new Error('APIKEY or Domain is not set.');
	}

	const mailgunAuth = {
		auth: {
			apiKey,
			domain,
		},
	};
	transporter = nodemailer.createTransport(mg(mailgunAuth));
}

export { transporter };