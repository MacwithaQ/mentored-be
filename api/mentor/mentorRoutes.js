const express = require("express");

//? Set Router
const mentorsRouter = express.Router();

//? Assign Router to Controllers

mentorsRouter.get("/" /*, fetchmentors */);
mentorsRouter.put("/" /*, updateMentorProfile */);

module.exports = mentorsRouter;
