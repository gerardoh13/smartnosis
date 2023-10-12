"use strict";

const PDFDocument = require("pdfkit");
const axios = require("axios");

class PDF {
  static async generate(intake, res) {
    try {
      const {
        firstName,
        lastName,
        middleName,
        sex,
        dob,
        submittedAt,
        phone,
        phone2,
        address1,
        address2,
        city,
        state,
        zip,
        insurance,
        symptoms,
        conditions,

        insRelationship,
        insFirstName,
        insLastName,
        insDob,
        insProvider,
        insuranceId,
        insGroupName,
        insGroupNumber,
        insFrontPId,
        insBackPId,
      } = intake;

      const dateSubmitted = new Date(submittedAt * 1000).toLocaleDateString();
      const currSymptoms = symptoms.length ? symptoms.join(", ") : "N/A";
      const currConditions = conditions.length ? conditions.join(", ") : "N/A";
      const doc = new PDFDocument();

      let imageUrl;
      let imageBuffer;
      let imageWidth;
      if (insFrontPId) {
        imageUrl = `https://res.cloudinary.com/dolnu62zm/image/upload/v1694500921/${insFrontPId}.jpg`;
        let response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        imageBuffer = response.data;
        imageWidth = doc.page.width / 3;
      }

      // const imageHeight = imageWidth * 2;
      // const borderWidth = 2; // Border width in points
      // const x = 200; // X-coordinate of the image
      // const y = 100; // Y-coordinate of the image

      const continueStyle = { continued: true };
      const underlineAndLineGap = { underline: true, lineGap: 10 };
      const underlineAndContinue = { underline: true, continued: true };
      const noUnderlineAndContinue = { underline: false, continued: true };
      doc.fontSize(18);

      doc.font("Times-Bold").text("Patient's Name: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(
          `${lastName}, ${firstName} ${middleName ? middleName : ""}`,
          underlineAndLineGap
        );
      doc.fontSize(14);

      doc.font("Times-Bold").text("Date Submitted: ", continueStyle);
      doc.font("Times-Roman").text(`${dateSubmitted}`, underlineAndLineGap);

      doc.font("Times-Bold").text("Sex: ", continueStyle);

      doc.font("Times-Roman").text(`${sex}`, underlineAndContinue);

      doc.font("Times-Bold").text(" Date of Birth: ", noUnderlineAndContinue);
      doc.font("Times-Roman").text(`${dob}`, underlineAndLineGap);
      //
      doc.font("Times-Bold").text("Primary Phone: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(`${phone}`, phone2 ? underlineAndContinue : underlineAndLineGap);

      if (phone2) {
        doc
          .font("Times-Bold")
          .text("  Secondary Phone: ", noUnderlineAndContinue);
        doc.font("Times-Roman").text(`${phone2}`, underlineAndLineGap);
      }
      //
      doc.font("Times-Bold").text("Street Address: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(`${address1} ${address2 ? address2 : ""}`, underlineAndLineGap);

      doc.font("Times-Bold").text("City: ", continueStyle);
      doc.font("Times-Roman").text(`${city}`, underlineAndContinue);

      doc.font("Times-Bold").text("  State: ", noUnderlineAndContinue);
      doc.font("Times-Roman").text(`${state}`, underlineAndContinue);

      doc.font("Times-Bold").text("  Zip Code: ", noUnderlineAndContinue);
      doc.font("Times-Roman").text(`${zip}`, underlineAndLineGap);

      doc
        .font("Times-Bold")
        .text("Does the patient have insurance?: ", continueStyle);
      doc.font("Times-Roman").text(`${insurance}`, underlineAndLineGap);

      if (insurance === "Yes") {
        doc
          .font("Times-Bold")
          .text("Relationship to Policy Holder: ", noUnderlineAndContinue);
        doc.font("Times-Roman").text(`${insRelationship}`, underlineAndLineGap);

        doc.font("Times-Bold").text("Policy Holder's Name: ", continueStyle);
        doc
          .font("Times-Roman")
          .text(`${insLastName}, ${insFirstName}`, underlineAndLineGap);

        doc
          .font("Times-Bold")
          .text("Date of Birth of Policy Holder: ", noUnderlineAndContinue);
        doc.font("Times-Roman").text(`${insDob}`, underlineAndLineGap);

        doc
          .font("Times-Bold")
          .text("Insurance Provider: ", noUnderlineAndContinue);
        doc
          .font("Times-Roman")
          .text(
            `${insProvider}`,
            insuranceId ? underlineAndContinue : underlineAndLineGap
          );
        if (insuranceId) {
          doc
            .font("Times-Bold")
            .text(" Insurance ID#: ", noUnderlineAndContinue);
          doc.font("Times-Roman").text(`${insuranceId}`, underlineAndLineGap);
        }

        //
        if (insGroupName) {
          doc.font("Times-Bold").text("Group Name: ", continueStyle);
          doc
            .font("Times-Roman")
            .text(
              `${insGroupName}`,
              insGroupNumber ? underlineAndContinue : underlineAndLineGap
            );
        }
        if (insGroupNumber) {
          doc
            .font("Times-Bold")
            .text(
              `${insGroupName ? " " : ""}Group Number: `,
              noUnderlineAndContinue
            );
          doc
            .font("Times-Roman")
            .text(`${insGroupNumber}`, underlineAndLineGap);
        }
      }

      doc.font("Times-Bold").text("Current Symptoms: ", continueStyle);
      doc.font("Times-Roman").text(`${currSymptoms}`, underlineAndLineGap);

      doc.font("Times-Bold").text("Prexisting Conditions: ", continueStyle);
      doc.font("Times-Roman").text(`${currConditions}`, underlineAndLineGap);

      if (imageBuffer) {
        doc.text("Front of Insurance Card").image(imageBuffer, {
          width: imageWidth,
          lineBreak: true,
        });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="generated.pdf"');
      doc.pipe(res);
      doc.end();
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = PDF;
