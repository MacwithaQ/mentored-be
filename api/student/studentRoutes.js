const express = require("express");
const {
  fetchStudents,
  updateStudent,
  fetchOneStudent,
  updateStudentBalance,
} = require("./studentController");

//* use to upload img:
const upload = require("../../middleware/multer");

//? Set Router
const studentsRouter = express.Router();

//? Params Middleware
studentsRouter.param("studentId", async (req, res, next, studentId) => {
  try {
    const student = await fetchOneStudent(studentId, next);
    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
});

//? Assign Router to Controllers

studentsRouter.get("/", fetchStudents);
studentsRouter.put("/:studentId", upload.single("image"), updateStudent);
studentsRouter.put("/balance/:studentId", updateStudentBalance);

module.exports = studentsRouter;
