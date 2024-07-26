"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const Staff = require("../models/staff");
const express = require("express");
const { ensureCorrectProvider } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
// const providerAuthSchema = require("../schemas/providerAuth.json");
// const providerNewSchema = require("../schemas/providerNew.json");
// const { BadRequestError } = require("../expressError");

const router = new express.Router();

/** POST /auth/register:   { staff } => { token }
 *
 * staff must include { email, password, firstName, lastName, title  }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, providerNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const newStaff = await Staff.register({ ...req.body });
    await Staff.markActive(newStaff.providerId, newStaff.email)
    const token = createToken(newStaff);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

router.get("/checkduplicate/:email", async function (req, res, next) {
  const { email } = req.params;
  try {
    await Staff.checkDupe(email);
    return res.json({ validEmail: true });
  } catch (err) {
    return next(err);
  }
});

router.get(
  "/invite/:providerId/:email",
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId, email } = req.params;
    try {
      await Staff.invite(providerId, email);
      return res.json({ success: true });
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  "/reinvite/:providerId/:email",
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId, email } = req.params;
    try {
      await Staff.reinvite(providerId, email);
      return res.json({ success: true });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /[email] => { staff }
 *
 * Returns { id, email, firstName }
 *
 * Authorization required: same staff-as-:email
 **/

router.get("/:staffId", ensureCorrectProvider, async function (req, res, next) {
  try {
    const staff = await Staff.get(req.params.staffId);
    return res.json({ staff });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
