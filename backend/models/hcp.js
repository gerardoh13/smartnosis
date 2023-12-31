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

/** Related functions for hcps (Health Care Providers). */

class Hcp {
  /** authenticate hcp with email, password.
   *
   * Returns { id, email, first_name }
   *
   * Throws UnauthorizedError if hcp not found or wrong password.
   **/

  static async authenticate(email, password) {
    // try to find the hcp first
    const result = await db.query(
      `SELECT id,
              email,
              password,
              provider_id AS "providerId",
              is_admin AS "isAdmin"
           FROM hcps
           WHERE email = $1`,
      [email]
    );

    const hcp = result.rows[0];

    if (hcp) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, hcp.password);
      if (isValid) {
        delete hcp.password;
        return hcp;
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  /** Register hcp with data.
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
    npi,
    password,
  }) {
    const duplicateCheck = await db.query(
      `SELECT email
           FROM hcps
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

    let rowVals = [providerId, firstName, lastName, email, npi, hashedPassword];
    if (admin) rowVals.push(true);
    const result = await db.query(
      `INSERT INTO hcps
            (provider_id,
            first_name,
            last_name,
            email,
            npi,
            password${admin ? ", is_admin" : ""})
           VALUES ($1, $2, $3, $4, $5, $6${admin ? ", $7" : ""})
           RETURNING id, provider_id AS "providerId", email, role, is_admin AS "isAdmin"`,
      rowVals
    );

    const hcp = result.rows[0];

    return hcp;
  }

  static async getWithPassword(email) {
    const hcpRes = await db.query(
      `SELECT id,
              email,
              password
           FROM hcps
           WHERE email = $1`,
      [email]
    );
    const hcp = hcpRes.rows[0];
    if (!hcp) throw new NotFoundError(`No hcp: ${email}`);
    return hcp;
  }

  /** Given an email, return data about hcp.
   *
   * Returns { orgName, first_name, last_name, is_admin, jobs }
   *
   * Throws NotFoundError if hcp not found.
   **/

  static async get(id) {
    const hcpRes = await db.query(
      `SELECT id,
            is_admin AS "isAdmin",
            provider_id AS "providerId",
            first_name AS "firstName",
            last_name AS "lastName",
            email
        FROM hcps
        WHERE id = $1`,
      [id]
    );

    const hcp = hcpRes.rows[0];

    if (!hcp) throw new NotFoundError(`No hcp: ${id}`);

    return hcp;
  }

  /** Update hcp data with `data`.
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
      orgName: "name",
      hcpsCount: "hcps_count",
      staffCount: "staff_count",
    });
    const emailVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE hcps 
                      SET ${setCols} 
                      WHERE email = ${emailVarIdx} 
                      RETURNING id, email`;
    const result = await db.query(querySql, [...values, email]);
    const hcp = result.rows[0];

    if (!hcp) throw new NotFoundError(`No hcp: ${email}`);

    delete hcp.password;
    return hcp;
  }

  /** Delete given hcp from database; returns undefined. */

  static async remove(email) {
    let result = await db.query(
      `DELETE
           FROM hcps
           WHERE email = $1
           RETURNING email`,
      [email]
    );
    const hcp = result.rows[0];

    if (!hcp) throw new NotFoundError(`No hcp: ${email}`);
  }

  static async invite(providerId, emailArr) {
    let result = await db.query(
      `INSERT INTO hcp_invitations
      (provider_id, sent)
      VALUES ($1, $2)
      ON CONFLICT (provider_id) DO UPDATE
      SET sent = hcp_invitations.sent || excluded.sent
      RETURNING sent`,
      [providerId, emailArr]
    );
    const hcpInvitations = result.rows[0];

    return hcpInvitations;
  }
}

module.exports = Hcp;
