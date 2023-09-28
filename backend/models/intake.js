"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const generateUniqueId = require("generate-unique-id");

/** Related functions for feeds. */

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
                            ins_back_pid
                            )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
              $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
              $21, $22, $23, $24, $25, $26, $27)
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
      ]
    );
    let intake = result.rows[0];

    return intake;
  }

  static async addAppt(data) {
    const uId = generateUniqueId();
    const result = await db.query(
      `INSERT INTO appointments (id,
                                provider_id,
                                first_name,
                                last_name,
                                email,
                                appt_at
                                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, first_name AS "firstName", email`,
      [
        uId,
        data.providerId,
        data.firstName,
        data.lastName,
        data.email,
        // data.phone,
        data.apptAt,
      ]
    );
    let appointment = result.rows[0];
    return appointment;
  }

  static async getAppt(id) {
    const result = await db.query(
      `SELECT provider_id AS "providerId",
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              appt_at AS "apptAt"
      FROM appointments 
      WHERE id = $1`,
      [id]
    );
    let appt = result.rows[0];
    return appt;
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
              ins_back_pid AS "insBackPId"
      FROM intakes 
      WHERE id = $1`,
      [id]
    );
    let intake = result.rows[0];
    return intake;
  }

  // static async update(id, data) {
  //   const { setCols, values } = sqlForPartialUpdate(data, {
  //     firstName: "first_name",
  //     middleName: "middle_name",
  //     lastName: "last_name",
  //     insRelationship: "ins_relationship",
  //     insFirstName: "ins_firstName",
  //     insLastName: "ins_lastName",
  //     insDob: "ins_dob",
  //     insProvider: "ins_provider",
  //     insuranceId: "insurance_id",
  //     insGroupName: "ins_group_name",
  //     insGroupNumber: "ins_group_number",
  //     insFrontPId: "ins_front_pid",
  //     insBackPId: "ins_back_pid",
  //   });
  //   const idVarIdx = "$" + (values.length + 1);

  //   const querySql = `UPDATE intakes
  //                     SET ${setCols}
  //                     WHERE id = ${idVarIdx}
  //                     RETURNING id`;
  //   const result = await db.query(querySql, [...values, id]);
  //   const intake = result.rows[0];

  //   if (!intake) throw new NotFoundError(`No intake: ${id}`);

  //   return intake;
  // }
}

module.exports = Intake;
