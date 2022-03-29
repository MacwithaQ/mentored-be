const Appointment = require("../../database/models/Appointment");
const Mentor = require("../../database/models/Mentor");
const Student = require("../../database/models/Student");

// ? FETCH ALL APPOINTMENTS
exports.fetchAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    // .populate("student")
    // .populate("mentor");
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
    if (newAppointment) {
      await Mentor.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            appointments: newAppointment._id,
          },
        }
      );
    }
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
    const meeting = await Appointment.findByIdAndUpdate(req.body.id, booking, {
      runValidators: true,
      new: true,
    });
    if (meeting) {
      await Student.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            appointments: meeting._id,
          },
        }
      );
    }
    return res.status(200).json(meeting);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
