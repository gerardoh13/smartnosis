"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const Hcp = require("../models/hcp");
const Email = require("../models/email");
const express = require("express");
const { ensureCorrectProvider } = require("../middleware/auth");
const { createToken, createPwdResetToken } = require("../helpers/tokens");
// const providerAuthSchema = require("../schemas/providerAuth.json");
// const providerNewSchema = require("../schemas/providerNew.json");
// const { BadRequestError } = require("../expressError");
const jwt = require("jsonwebtoken");

const router = new express.Router();

/** POST /auth/token:  { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none

 */

router.post("/token", async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, providerAuthSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map((e) => e.stack);
//       throw new BadRequestError(errs);
//     }
    const { email, password } = req.body;
    const hcp = await Hcp.authenticate(email, password);
    const token = createToken(hcp);
    return res.json({ token });
//   } catch (err) {
//     return next(err);
//   }
});

router.post("/reset", async function (req, res, next) {
  try {
    const { email } = req.body;
    const hcp = await Hcp.getWithPassword(email);
    const token = createPwdResetToken(hcp);
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
    const hcp = await Hcp.getWithPassword(email);
    const tokenUser = jwt.verify(token, hcp.password);
    if (hcp.email === tokenUser.email) {
      await Hcp.update(email, { password: password });
      return res.json({ passwordUpdated: true });
    }
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:   { hcp } => { token }
 *
 * hcp must include { email, password, firstName  }
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

    const newHcp = await Hcp.register({ ...req.body });
    const token = createToken(newHcp);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

// router.get(
//   "/search/:providerId",
//   ensureCorrectProvider,
//   async function (req, res, next) {
//     const { providerId } = req.params;
//     const { query } = req.query;
//     try {
//       let data = {};
//       data.appts = await Appointment.search(query, providerId);
//       data.intakes = await Intake.search(query, providerId);
//       return res.status(200).json({ data });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

/** GET /[email] => { hcp }
 *
 * Returns { id, email, firstName }
 *
 * Authorization required: same hcp-as-:email
 **/

router.get("/:hcpId", ensureCorrectProvider, async function (req, res, next) {
  try {
    const hcp = await Hcp.get(req.params.hcpId);
    return res.json({ hcp });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
