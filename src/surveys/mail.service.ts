import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { CreateEmailDto } from "./dto/create-email.dto";

@Injectable()
export class MailService {

    mailTransport() {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        return transporter;
    }

    async sendEmail(emailDto: CreateEmailDto) {

        const { to, surveyCode } = emailDto;

        const subject = 'Survey Invitation';
        const text = `You are invited to participate in a survey. Use this code: <b>${surveyCode}</b>`

        const transport = this.mailTransport();
        const options: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        }
        try {
            await transport.sendMail(options);
            console.log(`Email Sent successfully to ${to}`);

        }
        catch (err) {
            console.log("Error Sending mail", err);
        }
    }
}
