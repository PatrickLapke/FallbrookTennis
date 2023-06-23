require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { IP_HOME, IP_SCHOOL } = require("../../app/IP/ip");

const API_KEY = process.env.SENDGRID_API;

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
    text: `Please verify your email by clicking on the following link: \nhttp://${IP_HOME}:3000/api/verify/${token}`,
    html: `<p>Please verify your email by clicking on the following link: <a href="http://${IP_HOME}:3000/api/verify/${token}">Verify Email</a></p>`,
  };

  await sgMail.send(msg);
}

module.exports = sendVerification;
