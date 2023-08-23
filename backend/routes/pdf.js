"use strict";
const PDFDocument = require("pdfkit");

const express = require("express");

const router = new express.Router();

router.post("/", function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, pdfNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const {
      firstName,
      lastName,
      feet,
      inches,
      weight,
      dob,
      insurance,
      symptoms,
      conditions,
    } = req.body;
    console.log(req.body)
    console.log(symptoms)
    const doc = new PDFDocument();

    doc.text(
    `Patient's name: ${lastName}, ${firstName}, DOB: ${dob}
     height: ${feet}'${inches}
     weight: ${weight}`);
    //
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="generated.pdf"');
    doc.pipe(res);
    doc.end();
    // return doc
  } catch (err) {
    next(err);
  }
});

module.exports = router;
