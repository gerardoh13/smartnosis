"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for staff (Non-Health Care Providers). */

class Staff {
  /** authenticate staff with email, password.
   *
   * Returns { id, email, first_name }
   *
   * Throws UnauthorizedError if staff not found or wrong password.
   **/

  static async authenticate(email, password) {
    // try to find the staff first
    const result = await db.query(
      `SELECT id,
              email,
              password,
              provider_id AS "providerId",
              is_admin AS "isAdmin"
           FROM staff
           WHERE email = $1`,
      [email]
    );

    const staff = result.rows[0];

    if (staff) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, staff.password);
      if (isValid) {
        delete staff.password;
        return staff;
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  /** Register staff with data.
   *
   * Returns { email, first_name }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({
    providerId,
    firstName,
    lastName,
    email,
    title,
    password,
  }) {
    const duplicateCheck = await db.query(
      `SELECT email
           FROM staff
           WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const adminCheck = await db.query(
      `SELECT h.id,
              s.id
           FROM hcps h JOIN staff s 
           ON h.provider_id = s.provider_id 
           WHERE h.provider_id = $1 AND s.provider_id = $1`,
      [providerId]
    );

    const admin = adminCheck.rows.length === 0 ? true : false;

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    let rowVals = [providerId, firstName, lastName, email, title, hashedPassword];
    if (admin) rowVals.push(true);
    const result = await db.query(
      `INSERT INTO staff
            (provider_id,
            first_name,
            last_name,
            email,
            title,
            password${admin ? ", is_admin" : ""})
           VALUES ($1, $2, $3, $4, $5, $6${admin ? ", $7" : ""})
           RETURNING id, provider_id AS "providerId", email, role, is_admin AS "isAdmin"`,
      rowVals
    );

    const staff = result.rows[0];

    return staff;
  }

  static async getWithPassword(email) {
    const staffRes = await db.query(
      `SELECT id,
              email,
              password
           FROM staff
           WHERE email = $1`,
      [email]
    );
    const staff = staffRes.rows[0];
    if (!staff) throw new NotFoundError(`No staff: ${email}`);
    return staff;
  }

  /** Given an email, return data about staff.
   *
   * Returns { orgName, first_name, last_name, is_admin }
   *
   * Throws NotFoundError if staff not found.
   **/

  static async get(id) {
    const staffRes = await db.query(
      `SELECT id,
            is_admin AS "isAdmin",
            provider_id AS "providerId",
            first_name AS "firstName",
            last_name AS "lastName",
            email
        FROM staff
        WHERE id = $1`,
      [id]
    );

    const staff = staffRes.rows[0];

    if (!staff) throw new NotFoundError(`No staff: ${id}`);

    return staff;
  }

  /** Update staff data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { id, email, firstName }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(email, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
    });
    const emailVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE staff 
                      SET ${setCols} 
                      WHERE email = ${emailVarIdx} 
                      RETURNING id, email`;
    const result = await db.query(querySql, [...values, email]);
    const staff = result.rows[0];

    if (!staff) throw new NotFoundError(`No staff: ${email}`);

    delete staff.password;
    return staff;
  }

  /** Delete given staff from database; returns undefined. */

  static async remove(email) {
    let result = await db.query(
      `DELETE
           FROM staff
           WHERE email = $1
           RETURNING email`,
      [email]
    );
    const staff = result.rows[0];

    if (!staff) throw new NotFoundError(`No staff: ${email}`);
  }

  static async invite(providerId, emailArr) {
    let result = await db.query(
      `INSERT INTO staff_invitations
      (provider_id, sent)
      VALUES ($1, $2)
      ON CONFLICT (provider_id) DO UPDATE
      SET sent = staff_invitations.sent || excluded.sent
      RETURNING sent`,
      [providerId, emailArr]
    );
    const staffInvitations = result.rows[0];

    return staffInvitations;
  }
}

module.exports = Staff;
