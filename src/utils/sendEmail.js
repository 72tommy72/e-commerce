import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html , attachments }) => {

    //info sender
    const trans = nodemailer.createTransport({
        host: "localhost",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },

    });
    //info receiver
    const info = await trans.sendMail({

        from: process.env.EMAIL, // sender address
        to, // list of receivers
        subject, // Subject line
        html,
        attachments// html body
    });

    if (info.accepted.length > 0) {
        return true;
    }

    return false;

}