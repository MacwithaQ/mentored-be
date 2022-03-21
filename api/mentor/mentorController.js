const Mentor = require("../../database/models/Mentor");

exports.fetchOneMentor = async (mentorId, next) => {
  try {
    const mentor = await Mentor.findById(mentorId);
    // return mentor
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

exports.fetchMentors = async (req, res, next) => {
  try {
    const mentors = await Mentor.find().populate({
      path: "user",
      select: ["firstName", "lastName", "email", "phone", "isMentor"],
    });
    return res.json(mentors);
  } catch (error) {
    next(error);
  }
};

exports.updateMentor = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const mentorId = req.mentor._id;
    const mentor = req.body;
    const mentorUpdated = await Mentor.findByIdAndUpdate(mentorId, mentor, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Mentor Updated", payload: mentorUpdated });
  } catch (error) {
    next(error);
  }
};
