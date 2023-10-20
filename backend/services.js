"use strict";
const nodemailer = require("nodemailer");
// const PushNotifications = require("@pusher/push-notifications-server");
const {
  NODEMAILER_PWD,
  NODEMAILER_USER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
//   BEAMS_INSTANCE_ID,
//   BEAMS_SECRET_KEY,
} = require("./config");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PWD,
  },
});

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+18333564430',
//      to: '+15597975961'
//    })
//   .then(message => console.log(message.sid));


// const pushNotifications = new PushNotifications({
//   instanceId: BEAMS_INSTANCE_ID,
//   secretKey: BEAMS_SECRET_KEY,
// });

module.exports = { transporter };
