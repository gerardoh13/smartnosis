"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const generateUniqueId = require("generate-unique-id");

/** Related functions for appointments. */

class Appointment {
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

  static async markComplete(apptId, intakeId) {
    const result = await db.query(
      `UPDATE appointments
            SET complete = true,
            intake_id = $1
            WHERE id = $2
            RETURNING id`,
      [intakeId, apptId]
    );
    const appt = result.rows[0];
    if (!appt) throw new NotFoundError(`No appointment: ${apptId}`);
    return appt;
  }

  static async getByDate(providerId, start, end) {
    const result = await db.query(
      `SELECT id,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  appt_at AS "apptAt",
                  complete,
                  intake_id AS "intakeId"
          FROM appointments 
          WHERE provider_id = $1 AND appt_at > $2 AND appt_at < $3
          ORDER BY appt_at`,
      [providerId, start, end]
    );
    let appointments = result.rows;

    return appointments;
  }
}

module.exports = Appointment;
