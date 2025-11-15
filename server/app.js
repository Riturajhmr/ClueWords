const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const redis = require("redis");
const passport = require("passport");
const passportStrategy = require("./config/passport");
const config = require("./config");
const gameRouter = require("./routes/game");
const authRouter = require("./routes/auth");
const emailRouter = require("./routes/email");
const profileRouter = require("./routes/profile");

// app configuration
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());
app.use(logger("dev"));
app.use(passport.initialize());
passport.use(passportStrategy);

// Redis connection for caching game state
const redisClient = redis.createClient(config.redis);
redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
  // Don't throw - allow app to continue without Redis in development
  if (config.env === "production") {
    throw err;
  }
});

// database connection using Mongoose
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

// setup routes
// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeWords API Server",
    version: "1.0.0",
    endpoints: {
      auth: "/users/register, /users/login, /users/logout",
      game: "/create-game",
      profile: "/profile",
      email: "/email",
    },
  });
});

app.use("/users", authRouter);
app.use(gameRouter);
app.use(emailRouter);
app.use(profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.json({
    success: false,
    error: err.message || "Internal Server Error",
    message: err.message || "An error occurred",
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  });
});

module.exports = app;
