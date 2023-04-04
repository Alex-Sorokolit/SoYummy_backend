const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "zinich911@gmail.com" };

  await sgMail.send(email);

  return true;
};

module.exports = sendEmail;
