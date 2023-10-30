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
                                  phone,
                                  appt_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id, first_name AS "firstName", email, phone, appt_at AS "apptAt"`,
      [
        uId,
        data.providerId,
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.apptAt,
      ]
    );
    const appointment = result.rows[0];
    return appointment;
  }

  static async updateAppt(data) {
    const id = data.apptId;
    delete data.apptId;
    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      apptAt: "appt_at",
    });
    const idVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE appointments
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, first_name AS "firstName", email, phone, appt_at AS "apptAt"`;

    const result = await db.query(querySql, [...values, id]);
    const appointment = result.rows[0];
    if (!appointment) throw new NotFoundError(`No appointment: ${apptId}`);
    return appointment;
  }

  static async getAppt(id) {
    const result = await db.query(
      `SELECT a.provider_id AS "providerId",
                  a.first_name AS "firstName",
                  a.last_name AS "lastName",
                  a.email,
                  a.phone,
                  a.appt_at AS "apptAt",
                  a.complete,
                  p.name as "providerName"
          FROM appointments a
          JOIN providers p ON a.provider_id = p.id
          WHERE a.id = $1`,
      [id]
    );
    const appt = result.rows[0];
    if (!appt) throw new NotFoundError(`No appointment: ${id}`);
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
                  intake_id AS "intakeId",
                  email,
                  phone
          FROM appointments 
          WHERE provider_id = $1 AND appt_at >= $2 AND appt_at < $3
          ORDER BY appt_at`,
      [providerId, start, end]
    );
    let appointments = result.rows;

    return appointments;
  }
}

module.exports = Appointment;
