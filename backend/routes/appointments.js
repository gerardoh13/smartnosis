"use strict";

/** Routes for appointments. */

const jsonschema = require("jsonschema");

const Appointment = require("../models/appointment");
// const PDF = require("../models/pdf");
const Email = require("../models/email");
const express = require("express");
const { ensureLoggedIn, ensureCorrectProvider } = require("../middleware/auth");
// const intakeNewSchema = require("../schemas/intakeNew.json");
const { BadRequestError, UnauthorizedError } = require("../expressError");

const router = new express.Router();

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
      await Email.sendIntake(provider, appointment);
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
