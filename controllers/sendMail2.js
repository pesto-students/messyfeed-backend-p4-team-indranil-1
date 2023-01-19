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

// import mailgun from "mailgun-js";

// console.log(process.env.API_KEY);
// const mg = mailgun({
//   apiKey: "1bd2de10597d721671d8615dec51058b-4c2b2223-bdab168c",
//   domain: "sandbox0203d14fe2b346d5959f3a5d87d685de.mailgun.org",
// });

// // const mailgun = require("mailgun-js")({
// //   apiKey: process.env.API_KEY,
// //   domain: process.env.DOMAIN,
// // });

// const mgMail = function (
//   sender_email,
//   receiver_email,
//   email_subject,
//   email_body
// ) {
//   const data = {
//     from: sender_email,
//     to: receiver_email,
//     subject: email_subject,
//     text: email_body,
//   };

//   mg.messages().send(data, (error, body) => {
//     if (error) console.log(error);
//     else console.log(body);
//   });
// };

// export const sendMail = async (otp, mail) => {
//   let sender_email = "messyfeed.pesto@gmail.com";
//   let receiver_email = "messyfeed.pesto@gmail.com";
//   let email_subject = "OTP from Messyfeed";
//   let email_body = otp;

//   // User-defined function to send email
//   mgMail(sender_email, receiver_email, email_subject, email_body);
// };

// -------------Send in blue code-----------------

import SibApiV3Sdk from "sib-api-v3-sdk";
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
var partnerKey = defaultClient.authentications["partner-key"];
partnerKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

sendSmtpEmail = {
  to: [
    {
      email: "dhanunjaya.lakshmi60@example.com",
      name: "John Doe",
    },
  ],
  templateId: 59,
  params: {
    name: "Dhanunjaya",
    surname: "Ginjupalli",
  },
  headers: {
    "X-Mailin-custom":
      "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    "api-key": process.env.SEND_IN_BLUE_API_KEY,
    "content-type": "application/json",
    accept: "application/json",
  },
};

apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log("API called successfully. Returned data: " + data);
  },
  function (error) {
    console.error(error);
  }
);
// export const sendMail = () => {};
