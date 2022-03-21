const express = require("express");
const connectDB = require("./database/database");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const usersRouter = require("./api/user/userRoutes");
const mentorsRouter = require("./api/mentor/mentorRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Console logs the requests being pushed to the backend
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routers
// app.use("/api/categories", categoryRouter);
// app.use("/api/recipes", recipeRouter);
app.use("/api/users", usersRouter);
app.use("/api/mentors", mentorsRouter);

//? Error handler Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal Server Error" });
  next();
});

//? Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found" });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
