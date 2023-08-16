"use strict";
const PDFDocument = require("pdfkit");

const express = require("express");

const router = new express.Router();
const name = "Gerardo Huerta"
router.get("/", function (req, res, next) {
  // const doc = new PDFDocument({size: 'A7'});
  const doc = new PDFDocument();
  //
 doc.text(`Client's name: ${name}`)
  //

  // doc.text('Hello work!')
  doc.pipe(res); // HTTP response
  doc.end();
  // return doc
});

module.exports = router;
