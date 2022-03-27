const express = require("express");
const passport = require("passport");
const {
  fetchUsers,
  signup,
  signin,
  fetchOneUser,
  updateUser,
} = require("./userController");

//? Set Router
const usersRouter = express.Router();

//* use to upload img:
const upload = require("../../middleware/multer");

//? Params Middleware
usersRouter.param("userId", async (req, res, next, userId) => {
  try {
    const user = await fetchOneUser(userId, next);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

//? Assign Router to Controllers
usersRouter.get("/", fetchUsers);
usersRouter.post("/signup", signup);
usersRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
usersRouter.put("/:userId", upload.single("image"), updateUser);

module.exports = usersRouter;
