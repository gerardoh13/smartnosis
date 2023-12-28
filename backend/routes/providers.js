"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const Provider = require("../models/provider");
const Email = require("../models/email");
const express = require("express");
const { ensureCorrectProvider } = require("../middleware/auth");
const { createToken, createPwdResetToken } = require("../helpers/tokens");
const providerAuthSchema = require("../schemas/providerAuth.json");
const providerNewSchema = require("../schemas/providerNew.json");
const { BadRequestError } = require("../expressError");
const jwt = require("jsonwebtoken");
const Intake = require("../models/intake");
const Appointment = require("../models/appointment");
const Hcp = require("../models/hcp");

const router = new express.Router();

/** POST /auth/token:  { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none

 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, providerAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { email, password } = req.body;
    const provider = await Provider.authenticate(email, password);
    const token = createToken(provider);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post("/reset", async function (req, res, next) {
  try {
    const { email } = req.body;
    const provider = await Provider.getWithPassword(email);
    const token = createPwdResetToken(provider);
    await Email.sendPwdReset(email, token);
    return res.json({ emailSent: true });
  } catch (err) {
    return next(err);
  }
});

router.post("/new-password", async function (req, res, next) {
  try {
    const { token } = req.query;
    const { email, password } = req.body;
    const provider = await Provider.getWithPassword(email);
    const tokenUser = jwt.verify(token, provider.password);
    if (provider.email === tokenUser.email) {
      await Provider.update(email, { password: password });
      return res.json({ passwordUpdated: true });
    }
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:   { provider } => { token }
 *
 * provider must include { email, password, firstName  }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  let data = { ...req.body };
  const hcpsEmails = data.hcpsEmails;
  const staffEmails = data.staffEmails;
  delete data.hcpsEmails;
  delete data.staffEmails;
  try {
    const validator = jsonschema.validate(data, providerNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const provider = await Provider.register({ ...data });
    if (hcpsEmails.length) Hcp.invite(provider.id, hcpsEmails);
    // if (staffEmails.length) Hcp.invite(staffEmails)
    return res.status(201).json({ provider });
  } catch (err) {
    return next(err);
  }
});


router.get(
  "/admin/:providerId",
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId } = req.params;
    try {
      const invitations = await Provider.getInvitations(providerId)
      return res.status(200).json({ invitations });
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  "/search/:providerId",
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId } = req.params;
    const { query } = req.query;
    try {
      let data = {};
      data.appts = await Appointment.search(query, providerId);
      data.intakes = await Intake.search(query, providerId);
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /[email] => { provider }
 *
 * Returns { id, email, firstName }
 *
 * Authorization required: same provider-as-:email
 **/

router.get(
  "/:providerId/:userId/:role",
  ensureCorrectProvider,
  async function (req, res, next) {
    try {
      let user;
      if (req.params.role === "hcp") user = await Hcp.get(req.params.userId);
      // else user = await Provider.get(req.params.providerId);
      const provider = await Provider.get(user.providerId);
      user.provider = provider;
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
