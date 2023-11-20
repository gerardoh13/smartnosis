"use strict";

/** Routes for intakes. */

const jsonschema = require("jsonschema");

const Intake = require("../models/intake");
const PDF = require("../models/pdf");
const Appointment = require("../models/appointment");
// const Email = require("../models/email");
const express = require("express");
const { ensureLoggedIn, ensureCorrectProvider } = require("../middleware/auth");
const intakeNewSchema = require("../schemas/intakeNew.json");
const { BadRequestError, UnauthorizedError } = require("../expressError");

const router = new express.Router();

router.post("/", async function (req, res, next) {
  try {
    let apptId;
    if (req.body.apptId) {
      apptId = req.body.apptId;
      delete req.body.apptId;
    }
    const validator = jsonschema.validate(req.body, intakeNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const intake = await Intake.add(req.body);
    if (apptId) {
      Appointment.markComplete(apptId, intake.id);
    }
    return res.status(201).json({ intake });
  } catch (err) {
    return next(err);
  }
});

router.get(
  "/:providerId/:intakeId",
  ensureLoggedIn,
  ensureCorrectProvider,
  async function (req, res, next) {
    const { intakeId } = req.params;
    try {
      const intake = await Intake.get(intakeId);
      return res.json({ intake });
    } catch (err) {
      return next(err);
    }
  }
);

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
      const data = await Intake.getByDate(providerId, start, end);
      return res.json({ data });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
