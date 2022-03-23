const express = require("express");
const {
  fetchMentors,
  updateMentor,
  fetchOneMentor,
} = require("./mentorController");

//* use to upload img:
const upload = require("../../middleware/multer");

//? Set Router
const mentorsRouter = express.Router();

//? Params Middleware
mentorsRouter.param("mentorId", async (req, res, next, mentorId) => {
  try {
    const mentor = await fetchOneMentor(mentorId, next);
    req.mentor = mentor;
    next();
  } catch (error) {
    next(error);
  }
});

//? Assign Router to Controllers

mentorsRouter.get("/", fetchMentors);
mentorsRouter.put("/:mentorId", upload.single("image"), updateMentor);

module.exports = mentorsRouter;
