"use strict";

/** Routes for appointments. */

const jsonschema = require("jsonschema");

const Appointment = require("../models/appointment");
const Email = require("../models/email");
const SMS = require("../models/sms");
const express = require("express");
const { ensureLoggedIn, ensureCorrectProvider } = require("../middleware/auth");
// const intakeNewSchema = require("../schemas/intakeNew.json");
const { BadRequestError, UnauthorizedError } = require("../expressError");

const router = new express.Router();

router.post("/email", async function (req, res, next) {
  try {
    const provider = { ...req.body.provider };
    delete req.body.provider;
    // const validator = jsonschema.validate(req.body, intakeNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    let appointment;
    if (req.body.apptId) {
      const id = req.body.apptId;
      delete req.body.apptId;
      delete req.body.providerId
      appointment = await Appointment.updateAppt(id, req.body);
    } else appointment = await Appointment.addAppt(req.body);
    await Email.sendIntake(provider, appointment);
    return res.status(201).json({ appointment });
  } catch (err) {
    return next(err);
  }
});

router.post("/sms", async function (req, res, next) {
  try {
    const provider = { ...req.body.provider };
    delete req.body.provider;
    // const validator = jsonschema.validate(req.body, intakeNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    let appointment;
    if (req.body.apptId) {
      const id = req.body.apptId;
      delete req.body.apptId;
      delete req.body.providerId
      appointment = await Appointment.updateAppt(id, req.body);
    } else appointment = await Appointment.addAppt(req.body);
    await SMS.sendIntake(provider, appointment);
    return res.status(201).json({ appointment });
  } catch (err) {
    return next(err);
  }
});

router.get("/:providerId/:apptId", async function (req, res, next) {
  const { apptId } = req.params;
  try {
    const appt = await Appointment.getAppt(apptId);
    return res.status(201).json({ appt });
  } catch (err) {
    return next(err);
  }
});

router.get(
  "/by-date/:providerId/:start/:end",
  ensureLoggedIn,
  ensureCorrectProvider,
  async function (req, res, next) {
    const { providerId, start, end } = req.params;
    try {
      const intakes = await Appointment.getByDate(providerId, start, end);
      return res.json({ intakes });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
