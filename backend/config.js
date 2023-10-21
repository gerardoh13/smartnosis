"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

const REACT_APP_HOST = process.env.REACT_APP_HOST || "http://localhost:3000";
// const REACT_APP_HOST = process.env.REACT_APP_HOST || "http://10.0.0.14:3000";

const NODEMAILER_USER = process.env.NODEMAILER_USER;

const NODEMAILER_PWD = process.env.NODEMAILER_PWD;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// const BEAMS_INSTANCE_ID = process.env.BEAMS_INSTANCE_ID;

// const BEAMS_SECRET_KEY = process.env.BEAMS_SECRET_KEY;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "smartnosis_test"
    : process.env.DATABASE_URL || "smartnosis";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  NODEMAILER_USER,
  NODEMAILER_PWD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  //   BEAMS_INSTANCE_ID,
  //   BEAMS_SECRET_KEY,
  REACT_APP_HOST,
  getDatabaseUri,
};
