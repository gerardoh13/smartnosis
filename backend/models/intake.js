"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

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
                            submitted_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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
              conditions
      FROM intakes 
      WHERE id = $1`,
      [id]
    );
    let intake = result.rows[0];

    return intake;
  }
}

module.exports = Intake;
