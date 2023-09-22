"use strict";
const { transporter } = require("../services");
const { REACT_APP_HOST } = require("../config");

class Email {
  static async sendIntake(provider, appointment) {
    let info = await transporter.sendMail({
      from: '"Smartnosis Team" <donotreply@smartnosis.com>', // sender address
      to: appointment.email, // list of receivers
      subject: `${provider.name} Intake Form`, // Subject line
      html: `<div style="text-align: center;">
      <h3>Hi ${appointment.firstName},</h3>
      <p>Please follow the link below and complete the intake form prior to your visit</p>
      <a href=${REACT_APP_HOST}/intake?provider=${provider.id}&appointment=${appointment.id}>Intake Form</a>
      </div>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

  static async sendPwdReset(email, token) {
    let info = await transporter.sendMail({
      from: '"Smartnosis Team" <donotreply@smartnosis.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      html: `<div style="text-align: center;">
      <h1>Forgot your Password? We've got you covered.</h1>
      <h3>follow the link below to reset your password</h3>
      <a href="${REACT_APP_HOST}/reset?token=${token}">reset password</a>
      </div>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = Email;
