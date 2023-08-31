const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from provider data. */

function createToken(provider) {
  let payload = {
    email: provider.email,
    id: provider.id
  };
  return jwt.sign(payload, SECRET_KEY);
}

function createPwdResetToken(provider) {
  let payload = {
    email: provider.email,
  };
  return jwt.sign(payload, provider.password);
}
module.exports = { createToken, createPwdResetToken };
