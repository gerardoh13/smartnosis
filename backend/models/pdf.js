"use strict";

const PDFDocument = require("pdfkit");

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
      } = intake;

      const dateSubmitted = new Date(submittedAt * 1000).toLocaleDateString();
      const currSymptoms = symptoms.length ? symptoms.join(", ") : "N/A";
      const currConditions = conditions.length ? conditions.join(", ") : "N/A";
      const doc = new PDFDocument();

      doc.fontSize(14);
      const continueStyle = { continued: true };
      const underlineAndLineGap = { underline: true, lineGap: 10 };
      const underline = { underline: true };
      const noUnderline = { underline: false };

      doc.font("Times-Bold").text("Date Submitted: ", continueStyle);
      doc.font("Times-Roman").text(`${dateSubmitted}`, underlineAndLineGap);

      doc.font("Times-Bold").text("Patient's Name: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(
          `${lastName}, ${firstName} ${middleName ? middleName : ""}`,
          underlineAndLineGap
        );

      doc
        .font("Times-Bold")
        // .text(" Sex: ", { ...noUnderline, ...continueStyle });
        .text("Sex: ", continueStyle);

      doc
        .font("Times-Roman")
        .text(`${sex}`, { ...underline, ...continueStyle });

      doc
        .font("Times-Bold")
        .text(" Date of Birth: ", { ...noUnderline, ...continueStyle });
      doc.font("Times-Roman").text(`${dob}`, underlineAndLineGap);
      //
      doc.font("Times-Bold").text("Primary Phone: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(
          `${phone}`,
          phone2 ? { ...underline, ...continueStyle } : underlineAndLineGap
        );

      if (phone2) {
        doc
          .font("Times-Bold")
          .text("  Secondary Phone: ", { ...noUnderline, ...continueStyle });
        doc.font("Times-Roman").text(`${phone2}`, underlineAndLineGap);
      }
      //
      doc.font("Times-Bold").text("Street Address: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(`${address1} ${address2}`, underlineAndLineGap);

      doc.font("Times-Bold").text("City: ", continueStyle);
      doc
        .font("Times-Roman")
        .text(`${city}`, { ...underline, ...continueStyle });

      doc
        .font("Times-Bold")
        .text("  State: ", { ...noUnderline, ...continueStyle });
      doc
        .font("Times-Roman")
        .text(`${state}`, { ...underline, ...continueStyle });

      doc
        .font("Times-Bold")
        .text("  Zip Code: ", { ...noUnderline, ...continueStyle });
      doc.font("Times-Roman").text(`${zip}`, underlineAndLineGap);

      doc
        .font("Times-Bold")
        .text("Does the patient have insurance?: ", continueStyle);
      doc.font("Times-Roman").text(`${insurance}`, underlineAndLineGap);

      if (insurance === "Yes") {
        doc.font("Times-Bold").text("Relationship to Policy Holder: ", {
          ...noUnderline,
          ...continueStyle,
        });
        doc.font("Times-Roman").text(`${insRelationship}`, underlineAndLineGap);

        doc.font("Times-Bold").text("Policy Holder's Name: ", continueStyle);
        doc
          .font("Times-Roman")
          .text(`${insLastName}, ${insFirstName}`, underlineAndLineGap);

        doc.font("Times-Bold").text("Date of Birth of Policy Holder: ", {
          ...noUnderline,
          ...continueStyle,
        });
        doc.font("Times-Roman").text(`${insDob}`, underlineAndLineGap);

        doc
          .font("Times-Bold")
          .text("Insurance Provider: ", { ...noUnderline, ...continueStyle });
        doc
          .font("Times-Roman")
          .text(`${insProvider}`, { ...underline, ...continueStyle });
        if (insuranceId) {
          doc
            .font("Times-Bold")
            .text(" Insurance ID#: ", { ...noUnderline, ...continueStyle });
          doc.font("Times-Roman").text(`${insuranceId}`, underlineAndLineGap);
        }

        //
        if (insGroupName) {
          doc.font("Times-Bold").text("Group Name: ", continueStyle);
          doc
            .font("Times-Roman")
            .text(
              `${insGroupName}`,
              insGroupNumber
                ? { ...underline, ...continueStyle }
                : underlineAndLineGap
            );
        }
        if (insGroupNumber) {
          doc
            .font("Times-Bold")
            .text(`${insGroupName ? " " : ""}Group Number: `, {
              ...noUnderline,
              ...continueStyle,
            });
          doc
            .font("Times-Roman")
            .text(`${insGroupNumber}`, underlineAndLineGap);
        }
      }

      doc.font("Times-Bold").text("Current Symptoms: ", continueStyle);
      doc.font("Times-Roman").text(`${currSymptoms}`, underlineAndLineGap);

      doc.font("Times-Bold").text("Prexisting Conditions: ", continueStyle);
      doc.font("Times-Roman").text(`${currConditions}`, underlineAndLineGap);

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
