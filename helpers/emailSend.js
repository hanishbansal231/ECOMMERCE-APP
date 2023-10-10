import { createTransport } from "nodemailer";

const sendEmail = async (email, subject, message) => {
    const transport = createTransport({
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });
    transport.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to: `${email}`,
        subject: `${subject}`,
        html: `${message}`
    })
}

export default sendEmail;