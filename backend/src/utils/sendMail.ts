import "dotenv/config";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { transporter } from "../helpers/emailTransport";
import { systemLogs } from "./Logger";
import { EmailPayload } from "../utils/types/common.types";
import { SentMessageInfo } from "nodemailer";

const __dirname = path.dirname(__filename);

export type SendEmailOptions = {
    email: string;
    subject: string;
    payload: EmailPayload;
    template: string;
  };
  

const sendEmail = async ({email, subject, template, payload }: SendEmailOptions) => {
	try {
		const sourceDirectory = fs.readFileSync(
			path.join(__dirname, template),
			"utf8"
		);

		const compiledTemplate = handlebars.compile(sourceDirectory);

		const emailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: subject,
			html: compiledTemplate(payload),
		};
		const info: SentMessageInfo = await transporter.sendMail(emailOptions);
		console.log(info);
	} catch (error) {
		systemLogs.error(`email not sent: ${error}`);
	}
};

export { sendEmail };