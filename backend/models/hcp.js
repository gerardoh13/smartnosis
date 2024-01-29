"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const Email = require("./email.js");
const { createNewUserToken } = require("../helpers/tokens.js");
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
              provider_id AS "providerId",
              email,
              role,
              password,
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
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
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

  static async markActive(providerId, email) {
    const updateQuery = {
      text: `UPDATE hcp_invitations 
              SET sent = array_remove(sent, $1), 
              active = array_append(active, $1) 
              WHERE provider_id = $2`,
      values: [email, providerId],
    };
    await db.query(updateQuery);
  }

  static async invite(providerId, email) {
    const checkResult = await db.query(
      "SELECT * FROM hcp_invitations WHERE provider_id = $1",
      [providerId]
    );
    if (checkResult.rows.length === 0) {
      // If the row doesn't exist, insert a new row with the provider_id and email
      await db.query(
        "INSERT INTO hcp_invitations (provider_id, sent) VALUES ($1, ARRAY[$2])",
        [providerId, email]
      );
    } else {
      // If the row exists, check if the email is in the 'sent' array column
      const existingEmails = checkResult.rows[0].sent || [];
      if (!existingEmails.includes(email)) {
        // If the email is not in the array, append it
        await db.query(
          `UPDATE hcp_invitations 
          SET sent = array_append(sent, $1) 
          WHERE provider_id = $2`,
          [email, providerId]
        );
      }
      let user = { providerId, email, role: "hcp" };
      const token = createNewUserToken(user);
      await Email.sendInvite(email, token);
    }
  }

  static async reinvite(providerId, email) {
    const checkResult = await db.query(
      "SELECT * FROM hcp_invitations WHERE provider_id = $1 AND $2 = ANY(sent)",
      [providerId, email]
    );
    if (checkResult.rows[0]) {
      let user = { providerId, email, role: "hcp" };
      const token = createNewUserToken(user);
      await Email.sendInvite(email, token);
    } else throw new NotFoundError(`No invitation for: ${email}`);
  }
}

module.exports = Hcp;
