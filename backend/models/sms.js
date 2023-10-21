"use strict";
// DO NOT FORMAT THIS PAGE WITH PRETTIER!
const { smsClient } = require("../services");
const { REACT_APP_HOST } = require("../config");

class SMS {
  static async sendIntake(provider, appointment) {
    smsClient.messages
  .create({
     body: `Hi ${appointment.firstName},
Click the link and complete the intake form prior to your visit:
${REACT_APP_HOST}/intake?provider=${provider.id}&appointment=${appointment.id}`,
     from: '+18333564430',
     to: `+1${appointment.phone}`
   })
  .then(message => console.log(message.sid));
  }

}

module.exports = SMS;
