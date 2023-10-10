"use strict";

/** Routes for intakes. */

const jsonschema = require("jsonschema");

const Intake = require("../models/intake");
const PDF = require("../models/pdf");
const Email = require("../models/email");
const express = require("express");
const { ensureLoggedIn, ensureCorrectProvider } = require("../middleware/auth");
const intakeNewSchema = require("../schemas/intakeNew.json");
const { BadRequestError, UnauthorizedError } = require("../expressError");

const router = new express.Router();

router.post("/", async function (req, res, next) {
  try {
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

router.get(
  "/generate-pdf/:providerId/:intakeId",
  ensureLoggedIn,
  ensureCorrectProvider,
  async function (req, res, next) {
    const { intakeId } = req.params;
    try {
      const intake = await Intake.get(intakeId);
      await PDF.generate(intake, res);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  "/by-date/:providerId/:start/:end",
  ensureLoggedIn,
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId, start, end } = req.params;
    try {
      const intakes = await Intake.getByDate(providerId, start, end);
      return res.json({ intakes });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
