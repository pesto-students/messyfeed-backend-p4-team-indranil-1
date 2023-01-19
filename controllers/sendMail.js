import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = (otp, email, name) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SEND_IN_BLUE_API_KEY;

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Meal Coupon OTP from MessyFeed",
      sender: { email: "messyfeed.pesto@gmail.com", name: "MessyFeed" },
      replyTo: { email: "messyfeed.pesto@gmail.com", name: "MessyFeed" },
      to: [
        // {
        //   name: "Pradip Bedre",
        //   email: "pradipbedreofficial@gmail.com",
        // },
        {
          name: "Dhanunjaya Ginjupalli",
          email: "dhanunjaya.lakshmi60@gmail.com",
        },
      ],
      htmlContent:
        "<html><body><h1>Meal Coupon OTP: {{params.bodyMessage}}</h1></body></html>",
      params: { bodyMessage: otp },
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
};
