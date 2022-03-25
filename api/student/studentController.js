//* Schema:
const Student = require("../../database/models/Student");

//? FETCH-ONE-STUDENT:
exports.fetchOneStudent = async (studentId, next) => {
  try {
    const student = await Student.findById(studentId);

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

//? FETCH-ALL-STUDENTS:
exports.fetchStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate({
      path: "user",
      select: ["email", "isMentor"],
    });
    return res.json(students);
  } catch (error) {
    next(error);
  }
};

//? UPDATE-STUDENT:
exports.updateStudent = async (req, res, next) => {
  try {
    if (req.file) {
      //* FOR IMAGE USE :
      req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }

    const studentId = req.student._id; //* Take the id.
    const student = req.body; //* Take all the body.

    //* FIND & UPDATE:
    const studentUpdated = await Student.findByIdAndUpdate(studentId, student, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ msg: "The student been Updated ", payload: studentUpdated });
  } catch (err) {
    next(error);
  }
};
