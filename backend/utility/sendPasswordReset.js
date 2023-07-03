require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const API_KEY = process.env.SENDGRID_API;

sgMail.setApiKey(API_KEY);

async function sendVerification(email, passwordResetToken) {
  console.log(passwordResetToken);

  const msg = {
    to: email,
    from: {
      name: "Fallbrook Tennis and Pickleball Club",
      email: "FallbrookTennisAndPickleball@gmail.com",
    },
    subject: "Reset Password",
    text: `Your reset password code is: ${passwordResetToken}. Please enter this code within the app.`,
    html: `<p>Your reset password code is: ${passwordResetToken}. Please enter this code within the app.</p>`,
  };

  await sgMail.send(msg);
}

module.exports = sendVerification;
