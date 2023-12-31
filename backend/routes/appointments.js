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

async function emailIntake(provider, appointment) {
  await Email.sendIntake(provider, appointment);
}

async function textIntake(provider, appointment) {
  await SMS.sendIntake(provider, appointment);
}

router.post("/", async function (req, res, next) {
  try {
    const provider = { ...req.body.provider };
    delete req.body.provider;
    // const validator = jsonschema.validate(req.body, intakeNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const appointment = await Appointment.addAppt(req.body);
    if (appointment.email) await emailIntake(provider, appointment);
    else await textIntake(provider, appointment);
    return res.status(201).json({ appointment });
  } catch (err) {
    return next(err);
  }
});

router.patch("/", async function (req, res, next) {
  try {
    const provider = { ...req.body.provider };
    delete req.body.provider;
    const sendTo = req.body.sendTo;
    delete req.body.sendTo;
    // const validator = jsonschema.validate(req.body, intakeNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const appointment = await Appointment.updateAppt(req.body);
    if (sendTo === "email") await emailIntake(provider, appointment);
    else if (sendTo === "sms") await textIntake(provider, appointment);
    return res.status(200).json({ appointment });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:apptId/:providerId", async function (req, res, next) {
  const { apptId } = req.params;
  try {
    await Appointment.delete(apptId);
    return res.status(200).json({ deleted: apptId });
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
      const data = await Appointment.getByDate(providerId, start, end);
      return res.json({ data });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
