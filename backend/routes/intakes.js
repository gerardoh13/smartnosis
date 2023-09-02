"use strict";

/** Routes for intakes. */

const jsonschema = require("jsonschema");

const Intake = require("../models/intake");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const intakeNewSchema = require("../schemas/intakeNew.json");
const { BadRequestError, UnauthorizedError } = require("../expressError");

const router = new express.Router();

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    if (req.body.zip) req.body.zip = +req.body.zip
    const validator = jsonschema.validate(req.body, intakeNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const intake = await Intake.add(req.body);
    return res.status(201).json({ intake });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
