import { MailAdapater,SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d1f6243e9f647d",
      pass: "75b43d7c5abb5c"
    }
  });

export class NodemailerMailAddapter implements MailAdapater{
    async sendMail({subject,body}:SendMailData){
         await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to:"Joao Marcelo <joaonininho.twt@gmail.com>",
      subject,
      html: body,
    })
    }
}