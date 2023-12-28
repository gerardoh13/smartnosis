"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const generateUniqueId = require("generate-unique-id");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for providers. */

class Provider {
  /** Register provider with data.
   *
   * Returns { email, first_name }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({
    orgName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    hcpsCount,
    staffCount,
  }) {
    const duplicateCheck = await db.query(
      `SELECT email
           FROM providers
           WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    // const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const uId = generateUniqueId();

    const result = await db.query(
      `INSERT INTO providers
           (id,
            name,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            zip,
            hcps_count,
            staff_count)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING id, email, name AS "orgName"`,
      [
        uId,
        orgName,
        email,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        hcpsCount,
        staffCount,
      ]
    );

    const provider = result.rows[0];

    return provider;
  }

  static async getInvitations(provider_id) {
    const hcpRes = await db.query(
      `SELECT sent,
              active
        FROM hcp_invitations
        WHERE provider_id = $1`,
      [provider_id]
    );

    const staffRes = await db.query(
      `SELECT sent,
              active
        FROM staff_invitations
        WHERE provider_id = $1`,
      [provider_id]
    );

    const hcpInvitations = hcpRes.rows.length
      ? {
          active: hcpRes.rows[0].active || [],
          sent: hcpRes.rows[0].sent || [],
        }
      : { active: [], sent: [] };
    const staffInvitations = staffRes.rows.length
      ? {
          active: staffRes.rows[0].active || [],
          sent: staffRes.rows[0].sent || [],
        }
      : { active: [], sent: [] };

    const invtations = { hcps: hcpInvitations, staff: staffInvitations };

    // if (!provider) throw new NotFoundError(`No provider: ${id}`);

    return invtations;
  }

  /** Given an email, return data about provider.
   *
   * Returns { orgName, first_name, last_name, is_admin, jobs }
   *
   * Throws NotFoundError if providers not found.
   **/

  static async get(id) {
    const providerRes = await db.query(
      `SELECT name,
              phone,
              address1,
              address2,
              city,
              state,
              zip,
              hcps_count AS "hcpsCount",
              staff_count AS "staffCount"
        FROM providers
        WHERE id = $1`,
      [id]
    );

    const provider = providerRes.rows[0];

    if (!provider) throw new NotFoundError(`No provider: ${id}`);

    return provider;
  }

  /** Update provider data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, password, email }
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

    const querySql = `UPDATE providers 
                      SET ${setCols} 
                      WHERE email = ${emailVarIdx} 
                      RETURNING id,
                                name AS "firstName",
                                email`;
    const result = await db.query(querySql, [...values, email]);
    const provider = result.rows[0];

    if (!provider) throw new NotFoundError(`No provider: ${email}`);

    delete provider.password;
    return provider;
  }

  /** Delete given provider from database; returns undefined. */

  static async remove(email) {
    let result = await db.query(
      `DELETE
           FROM providers
           WHERE email = $1
           RETURNING email`,
      [email]
    );
    const provider = result.rows[0];

    if (!provider) throw new NotFoundError(`No provider: ${email}`);
  }
}

module.exports = Provider;
