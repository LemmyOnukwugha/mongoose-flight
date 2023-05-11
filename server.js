var createError = require("http-errors");
var express = require("express");
var dotenv = require("dotenv");
var { MongoClient } = require("mongodb");
var db = require("./config/database");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./config/database");
const methodOveride = require("method-override");

var indexRouter = require("./routes/index");
var flightRouter = require("./routes/flights");
var ticketRouter = require("./routes/tickets");

var app = express();
dotenv.config();
db();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOveride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/flights", flightRouter);
app.use("/tickets", ticketRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
