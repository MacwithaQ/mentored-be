const Appointment = require("../../database/models/Appointment");

// ? FETCH ALL APPOINTMENTS
exports.fetchAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    console.log(appointments);
    return res.json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.addAppointment = async (req, res, next) => {
  try {
    const app = { mentor: req.user._id, date: req.body.date };

    console.log(app);

    const newAppointment = await Appointment.create(app);
    return res.status(200).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

exports.bookAppointment = async (req, res, next) => {
  try {
    const booking = {
      isAvailable: false,
      student: req.user._id,
    };
    console.log("booking", booking);
    const meeting = await Appointment.findByIdAndUpdate(req.body.id, booking, {
      runValidators: true,
      new: true,
    });
    console.log("meeting", meeting);
    return res.status(200).json(meeting);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
