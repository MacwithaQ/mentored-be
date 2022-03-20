const express = require("express");
const connectDB = require("./database/database");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/Passport");

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

// Routers example
// app.use("/api/categories", categoryRouter);
// app.use("/api/recipes", recipeRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
