//* Schema:
const Mentor = require("../../database/models/Mentor");

//? FETCH-ONE-MENTOR:
exports.fetchOneMentor = async (mentorId, next) => {
  try {
    const mentor = await Mentor.findById(mentorId);

    if (mentor) return mentor;
    else {
      const error = new Error("Mentor not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//? FETCH-ALL-MENTORS:
exports.fetchMentors = async (req, res, next) => {
  try {
    const mentors = await Mentor.find().populate({
      path: "user",
      select: ["email", "isMentor"],
    });
    return res.json(mentors);
  } catch (error) {
    next(error);
  }
};

//? UPDATE-MENTOR:
exports.updateMentor = async (req, res, next) => {
  try {
    const mentorId = req.mentor._id; //* Take the id.
    const mentor = req.body; //* Take all the body.

    //* FIND & UPDATE:
    const mentorUpdated = await Mentor.findByIdAndUpdate(mentorId, mentor, {
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json({ msg: "Mentor Updated", payload: mentorUpdated });
  } catch (error) {
    next(error);
  }
};
