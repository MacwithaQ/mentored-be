const Appointment = require("../../database/models/Appointment");

// ? FETCH ALL APPOINTMENTS
exports.fetchAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    return res.json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.addAppointment = async (req, res, next) => {
  try {
    const app = { mentor: req.user._id, date: req.body.date };
    const newAppointment = await Appointment.create(app);
    return res.status(200).json(newAppointment);
  } catch (error) {
    next(error);
  }
};
