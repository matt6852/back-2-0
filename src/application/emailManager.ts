import nodemailer from "nodemailer";

export const emailManager = {
  async sendEmail(email: string, confirmCode: string, reason: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL!, // generated ethereal user
          pass: process.env.USER_PASSWORD!, // generated ethereal password
        },
      });
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `I'm a Ghost 👻 <foo@example.com>`, // sender address
        to: email, // list of receivers
        subject: "registration", // Subject line
        html: this.createTemplateHTML(confirmCode, reason),
      });
      console.log(info, "emailManager");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createTemplateHTML(confirmCode: string, reason: string) {
    if (reason === "email") {
      return `<h1>Thank for your registration</h1>
      <p>To finish registration please follow the link below:
        <a href='https://backend-redone-57h8.vercel.app/auth/registration-confirmation?code=${confirmCode}'>complete registration</a>
     </p>`;
    }
    if (reason === "password") {
      return `<h1>Password recovery</h1>
      <p>To finish password recovery please follow the link below:
         <a href='https://backend-redone-57h8.vercel.app/auth/password-recovery?recoveryCode=${confirmCode}'>recovery password</a>
      </p>`;
    }
  },
};

type ForWhat = {
  email: string | undefined;
  password: string | undefined;
};
