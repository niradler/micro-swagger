"use strict";

var config = require("./config");

var init = require("./init");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var router = require("./router");

var cors = require("cors");

init();
var staticPath = config.getEnv("static");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](staticPath));

var handleError = function handleError(error, req, res) {
  res.locals.message = error.message;
  res.locals.error = error;
  res.status(error.status || 500);
  res.render("error", {
    error: error
  });
};

app.use(function (err, req, res, next) {
  handleError(error, req, res);
});
app.use("/", router);
var port = config.getEnv("port") || 3055;
app.listen(port, function () {
  return console.log("micro-swagger running on port ".concat(port, "!"));
});