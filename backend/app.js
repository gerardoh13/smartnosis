"use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const providerRoutes = require("./routes/providers");
const intakeRoutes = require("./routes/intakes");
const apptRoutes = require("./routes/appointments");
const hcpsRoutes = require("./routes/hcps");
const staffRoutes = require("./routes/staff");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use("/providers", providerRoutes);
app.use("/intakes", intakeRoutes);
app.use("/appointments", apptRoutes);
app.use("/hcps", hcpsRoutes);
app.use("/staff", staffRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
