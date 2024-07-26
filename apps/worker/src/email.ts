import nodemailer from  "nodemailer"
import { SMPT_EMAIL, SMPT_PASSWORD } from "./config";
const transporter = nodemailer.createTransport({
    service:'gmail',
    port:465,
    secure:true,
    auth:{
        user:SMPT_EMAIL,
        pass:SMPT_PASSWORD,
    }
})
export async function send_email(to: string, body: string) {
    console.log("Sending email to", to);
   try {
    await transporter.sendMail({
        from: 'aayushkumarhigh@gmail.com',
        to,
        subject: "Hello From Zapier",
        text: body
    })
    console.log("Email sent to", to);
   } catch (error) {
    console.log(error)
    throw new Error("Error sending transaction");
   }
}