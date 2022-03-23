//* Import/require DB & Express:
const express = require("express");
const connectDB = require("./database/database");

//* Import/require .env:
const dotenv = require("dotenv");
const cors = require("cors");

//* Import/require passport:
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//* import/require Routers:
const usersRouter = require("./api/user/userRoutes");
const studentsRouter = require("./api/student/studentRoutes");
const mentorsRouter = require("./api/mentor/mentorRoutes");

//* Import/require Multer to use <IMG>:
const upload = require("./middleware/multer");
const path = require("path");

//* use .env:
dotenv.config();

//* Use app - cors - urlencoded:
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//* passport use:
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//* ADD this line to make a path for the <IMG> to been taken:
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

//?use Routers:
app.use("/api/users", usersRouter);

app.use("/api/students", studentsRouter);

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

//? PORT:
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
