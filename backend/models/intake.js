"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const generateUniqueId = require("generate-unique-id");

/** Related functions for intakes. */

class Intake {
  static async add(data) {
    const result = await db.query(
      `INSERT INTO intakes (provider_id,
                            first_name,
                            last_name,
                            middle_name,
                            dob,
                            sex,
                            address1,
                            address2,
                            city,
                            state,
                            zip,
                            insurance,
                            phone,
                            phone2,
                            symptoms,
                            conditions,
                            submitted_at,

                            ins_relationship,
                            ins_firstName,
                            ins_lastName,
                            ins_dob,
                            ins_provider,
                            insurance_id,
                            ins_group_name,
                            ins_group_number,
                            ins_front_pid,
                            ins_back_pid,

                            sex_orientation,
                            ethnicity,
                            tobacco_use,
                            cigs_per_day,
                            alcohol_use,
                            drug_use,
                            other_drug_use,
                            mother_history,
                            father_history,
                            grandparents_history,
                            sibling_history,
                            comments
                            )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
              $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
              $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
              $31, $32, $33, $34, $35, $36, $37, $38, $39)
              RETURNING id`,
      [
        data.providerId,
        data.firstName,
        data.lastName,
        data.middleName,
        data.dob,
        data.sex,
        data.address1,
        data.address2,
        data.city,
        data.state,
        data.zip,
        data.insurance,
        data.phone,
        data.phone2,
        data.symptoms,
        data.conditions,
        data.submittedAt,
        data.insRelationship,
        data.insFirstName,
        data.insLastName,
        data.insDob,
        data.insProvider,
        data.insuranceId,
        data.insGroupName,
        data.insGroupNumber,
        data.insFrontPId,
        data.insBackPId,

        data.sexOrientation,
        data.ethnicity,
        data.tobaccoUse,
        data.cigsPerDay,
        data.alcoholUse,
        data.drugUse,
        data.otherDrugUse,
        data.motherHistory,
        data.fatherHistory,
        data.grandparentsHistory,
        data.siblingHistory,
        data.comments,
      ]
    );
    let intake = result.rows[0];
    return intake;
  }

  static async getByDate(providerId, start, end) {
    const result = await db.query(
      `SELECT id,
              first_name AS "firstName",
              middle_name AS "middleName",
              last_name AS "lastName",
              submitted_at AS "submittedAt",
              dob
      FROM intakes 
      WHERE provider_id = $1 AND submitted_at > $2 AND submitted_at < $3
      ORDER BY submitted_at DESC`,
      [providerId, start, end]
    );
    let intakes = result.rows;

    return intakes;
  }

  static async get(id) {
    const result = await db.query(
      `SELECT id,
              first_name AS "firstName",
              middle_name AS "middleName",
              last_name AS "lastName",
              sex,
              dob,
              submitted_at AS "submittedAt",
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

              ins_relationship AS "insRelationship",
              ins_firstName AS "insFirstName",
              ins_lastName AS "insLastName",
              ins_dob AS "insDob",
              ins_provider AS "insProvider",
              insurance_id AS "insuranceId",
              ins_group_name AS "insGroupName",
              ins_group_number AS "insGroupNumber",
              ins_front_pid AS "insFrontPId",
              ins_back_pid AS "insBackPId",

              sex_orientation AS "sexOrientation",
              ethnicity,
              tobacco_use AS "tobaccoUse",
              cigs_per_day AS "cigsPerDay",
              alcohol_use AS "alcoholUse",
              drug_use AS "drugUse",
              other_drug_use AS "otherDrugUse",
              mother_history AS "motherHistory",
              father_history AS "fatherHistory",
              grandparents_history AS "grandparentsHistory",
              sibling_history AS "siblingHistory",
              comments
      FROM intakes 
      WHERE id = $1`,
      [id]
    );
    let intake = result.rows[0];
    return intake;
  }

  static async search(query, providerId) {
    const result = await db.query(
      `SELECT id,
              first_name AS "firstName",
              middle_name AS "middleName",
              last_name AS "lastName",
              submitted_at AS "submittedAt",
              dob
      FROM intakes 
    WHERE first_name ILIKE $1 OR last_name ILIKE $1 AND provider_id = $2`,
      [`%${query}%`, providerId]
    );
    const intakes = result.rows;

    return intakes;
  }

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      middleName: "middle_name",
      lastName: "last_name",
      insRelationship: "ins_relationship",
      insFirstName: "ins_firstName",
      insLastName: "ins_lastName",
      insDob: "ins_dob",
      insProvider: "ins_provider",
      insuranceId: "insurance_id",
      insGroupName: "ins_group_name",
      insGroupNumber: "ins_group_number",
      insFrontPId: "ins_front_pid",
      insBackPId: "ins_back_pid",

      sexOrientation: "sex_orientation",
      tobaccoUse: "tobacco_use",
      cigsPerDay: "cigs_per_day",
      alcoholUse: "alcohol_use",
      drugUse: "drug_use",
      otherDrugUse: "other_drug_use",
      motherHistory: "mother_history",
      fatherHistory: "father_history",
      grandparentsHistory: "grandparents_history",
      siblingHistory: "sibling_history",
    });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE intakes
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id`;
    const result = await db.query(querySql, [...values, id]);
    const intake = result.rows[0];

    if (!intake) throw new NotFoundError(`No intake: ${id}`);

    return intake;
  }
}

module.exports = Intake;
