import config from 'config';
import nodemailer, { SendMailOptions } from 'nodemailer';
import logger from './logger';

const smtp = config.get<{
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
  }>("smtp");

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass },
});
  
async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            logger.error(err, "Error sending email");
        return;
        }
        logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
}
  

export default sendEmail;