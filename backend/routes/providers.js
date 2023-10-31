"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const Provider = require("../models/provider");
// const Intake = require("../models/intake");
const Email = require("../models/email");
const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { createToken, createPwdResetToken } = require("../helpers/tokens");
const providerAuthSchema = require("../schemas/providerAuth.json");
const providerNewSchema = require("../schemas/providerNew.json");
const { BadRequestError } = require("../expressError");
const jwt = require("jsonwebtoken");

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
  try {
    const validator = jsonschema.validate(req.body, providerNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const newProvider = await Provider.register({ ...req.body });
    const token = createToken(newProvider);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** GET /[email] => { provider }
 *
 * Returns { id, email, firstName, infants }
 *   where infants is {  }
 *
 * Authorization required: same provider-as-:email
 **/

router.get("/:email", ensureCorrectUser, async function (req, res, next) {
  try {
    const provider = await Provider.get(req.params.email);
    return res.json({ provider });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
