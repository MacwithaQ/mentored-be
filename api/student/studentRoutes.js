const express = require("express");

//? Set Router
const studentsRouter = express.Router();

//? Assign Router to Controllers

studentsRouter.get("/" /*, fetchStudents */);
studentsRouter.put("/" /*, updateStudentProfile */);

module.exports = studentsRouter;
