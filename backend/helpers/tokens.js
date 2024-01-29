const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from provider data. */

function createToken(user) {
  let payload = {
    email: user.email,
    id: user.id,
    providerId: user.providerId,
    role: user.role,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(payload, SECRET_KEY);
}

function createPwdResetToken(user) {
  let payload = {
    email: user.email,
  };
  return jwt.sign(payload, user.password);
}

function createNewUserToken(user) {
  let payload = {
    email: user.email,
    providerId: user.providerId,
    role: user.role
  };
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken, createPwdResetToken, createNewUserToken };
