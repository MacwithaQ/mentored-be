const Student = require("../../database/models/Student");

//TODO: fetchOneStudent:

exports.fetchOneStudent = async (studentId, next) => {
  try {
    const student = await Student.findById(studentId);
    // return student
    if (student) return student;
    else {
      const error = new Error("Student not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//TODO: fetchStudents:
exports.fetchStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate({
      path: "user",
      select: ["firstName", "lastName", "email", "phone", "isMentor"],
    });
    return res.json(students);
  } catch (error) {
    next(error);
  }
};

//TODO: updateStudentProfile

exports.updateStudent = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const studentId = req.student._id;
    const student = req.body;
    const studentUpdated = await Student.findByIdAndUpdate(studentId, student, {
      new: true,
      runValidators: true,
    });

    // returns the updated student

    res
      .status(200)
      .json({ msg: "The student been Updated ", payload: studentUpdated });
  } catch (err) {
    next(error);
  }
};
