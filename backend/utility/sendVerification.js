const config = require("config");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

const API_KEY =
  "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";

sgMail.setApiKey(API_KEY);

async function sendVerification(email, token) {
  console.log(token);

  const msg = {
    to: email,
    from: {
      name: "Fallbrook Tennis and Pickleball Club",
      email: "FallbrookTennisAndPickleball@gmail.com",
    },
    subject: "Verify your email address",
    text: `Please verify your email by clicking on the following link: \nhttp://192.168.0.16:3000/api/verify/${token}`,
    html: `<p>Please verify your email by clicking on the following link: <a href="http://192.168.0.16:3000/api/verify/${token}">Verify Email</a></p>`,
  };

  await sgMail.send(msg);
}

module.exports = sendVerification;
