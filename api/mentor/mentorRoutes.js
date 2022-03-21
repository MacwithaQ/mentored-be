const express = require("express");
const { fetchMentors } = require("./mentorController");

//? Set Router
const mentorsRouter = express.Router();

//? Params Middleware
mentorsRouter.param("mentorId", async (req, res, next, mentorId) => {
  try {
    const mentor = await fetchMentor(mentorId, next);
    req.mentor = mentor;
    next();
  } catch (error) {
    next(error);
  }
});

//? Assign Router to Controllers

mentorsRouter.get("/", fetchMentors);
mentorsRouter.put("/" /*, updateMentorProfile */);

module.exports = mentorsRouter;
