const express = require("express");
const { fetchAppointment, addAppointment } = require("./appointmentController");
const passport = require("passport");

const appointmentRouter = express.Router();

appointmentRouter.get("/", fetchAppointment);
appointmentRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addAppointment
);

module.exports = appointmentRouter;
