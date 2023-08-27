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
      middleName,
      sex,
      dob,
      date,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      insurance,
      symptoms,
      conditions,
    } = req.body;

    const doc = new PDFDocument();

    doc.fontSize(14);
    const continueStyle = {continued: true}
    const underlineAndLineGap = { underline: true, lineGap: 10 };
    const underline = { underline: true }
    const noUnderline = { underline: false }


    doc.font('Times-Bold').text('Date Submitted:', continueStyle)
    doc.font('Times-Roman').text(` ${date}`, underlineAndLineGap)

    doc.font('Times-Bold').text("Patient's name:", continueStyle)
    doc.font('Times-Roman').text(` ${lastName}, ${firstName} ${middleName}`, underlineAndLineGap)

    doc.font('Times-Bold').text(' Sex: ', {...noUnderline, ...continueStyle})
    doc.font('Times-Roman').text(`${sex}`, {...underline, ...continueStyle })

    doc.font('Times-Bold').text(' Date of Birth: ', {...noUnderline, ...continueStyle})
    doc.font('Times-Roman').text(`${dob}`, underlineAndLineGap)

    doc.font('Times-Bold').text('Street Address: ', continueStyle)
    doc.font('Times-Roman').text(`${address1} ${address2}`, underlineAndLineGap)
    
    doc.font('Times-Bold').text("City: ", continueStyle)
    doc.font('Times-Roman').text(`${city}`, {...underline, ...continueStyle })

    doc.font('Times-Bold').text('  State: ', {...noUnderline, ...continueStyle})
    doc.font('Times-Roman').text(`${state}`, {...underline, ...continueStyle })

    doc.font('Times-Bold').text('  Zip Code: ', {...noUnderline, ...continueStyle})
    doc.font('Times-Roman').text(`${zip}`, underlineAndLineGap)

    

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
