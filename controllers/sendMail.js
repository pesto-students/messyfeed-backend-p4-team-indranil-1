//--------SendGrid logic to send email-----------

// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendMail = async (otp, mail) => {
//   console.log(otp, process.env);
//   const message = {
//     to: ["messyfeed.pesto@gmail.com", "messyfeeds.pesto@gmail.com"],
//     from: "messyfeed.pesto@gmail.com",
//     subject: "OTP from MessyFeed",
//     text: String(otp),
//     html: "<h1>OTP</h1>",
//   };

//   sgMail
//     .send(message)
//     .then((res) => {
//       console.log("Email Sent");
//       return "Email Sent";
//     })
//     .catch((err) => {
//       console.log("Errror: ", err);
//       return err.message;
//     });
// };

//------Mailgun logic to send Email ------
import mailgun from "mailgun-js";

console.log(process.env.API_KEY);
const mg = mailgun({
  apiKey: "1bd2de10597d721671d8615dec51058b-4c2b2223-bdab168c",
  domain: "sandbox0203d14fe2b346d5959f3a5d87d685de.mailgun.org",
});

// const mailgun = require("mailgun-js")({
//   apiKey: process.env.API_KEY,
//   domain: process.env.DOMAIN,
// });

const mgMail = function (
  sender_email,
  receiver_email,
  email_subject,
  email_body
) {
  const data = {
    from: sender_email,
    to: receiver_email,
    subject: email_subject,
    text: email_body,
  };

  mg.messages().send(data, (error, body) => {
    if (error) console.log(error);
    else console.log(body);
  });
};

export const sendMail = async (otp, mail) => {
  let sender_email = "messyfeed.pesto@gmail.com";
  let receiver_email = "messyfeed.pesto@gmail.com";
  let email_subject = "OTP from Messyfeed";
  let email_body = otp;

  // User-defined function to send email
  mgMail(sender_email, receiver_email, email_subject, email_body);
};
