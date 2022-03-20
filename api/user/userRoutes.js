const express = require("express");
const passport = require("passport");
const { fetchUsers, signup, signin } = require("./userController");

//? Set Router
const usersRouter = express.Router();

//? Assign Router to Controllers
usersRouter.get("/", fetchUsers);
usersRouter.post("/signup", signup);
usersRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = usersRouter;
