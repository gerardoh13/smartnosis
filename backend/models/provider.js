"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const generateUniqueId = require('generate-unique-id');

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for providers. */

class Provider {
  /** authenticate provider with email, password.
   *
   * Returns { id, email, first_name }
   *
   * Throws UnauthorizedError if provider not found or wrong password.
   **/

  static async authenticate(email, password) {
    // try to find the provider first
    const result = await db.query(
      `SELECT id,
                  email,
                  password
           FROM providers
           WHERE email = $1`,
      [email]
    );

    const provider = result.rows[0];

    if (provider) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, provider.password);
      if (isValid === true) {
        delete provider.password;
        return provider;
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  /** Register provider with data.
   *
   * Returns { email, first_name }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({
    orgName,
    npi,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    password,
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

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const uId = generateUniqueId();

    const result = await db.query(
      `INSERT INTO providers
           (id,
            name,
            npi,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            zip,
            password)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING id, email, name AS "orgName"`,
      [
        uId,
        orgName,
        npi,
        email,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        hashedPassword,
      ]
    );

    const provider = result.rows[0];

    return provider;
  }

  static async getWithPassword(email) {
    const providerRes = await db.query(
      `SELECT id,
              email,
              password
           FROM providers
           WHERE email = $1`,
      [email]
    );
    const provider = providerRes.rows[0];
    if (!provider) throw new NotFoundError(`No provider: ${email}`);
    return provider;
  }


  /** Given an email, return data about provider.
   *
   * Returns { orgName, first_name, last_name, is_admin, jobs }
   *
   * Throws NotFoundError if providers not found.
   **/

  static async get(email) {
    const providerRes = await db.query(
      `SELECT id,
              name,
              npi,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zip
        FROM providers
        WHERE email = $1`,
      [email]
    );

    const provider = providerRes.rows[0];

    if (!provider) throw new NotFoundError(`No provider: ${email}`);

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
    });
    const emailVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE providers 
                      SET ${setCols} 
                      WHERE email = ${emailVarIdx} 
                      RETURNING id,
                                first_name AS "firstName",
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
