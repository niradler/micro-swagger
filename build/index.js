"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = require("../config");

var init = require("../init");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var router = require("./router");

var cors = require("cors");

var open = require("open");

init();
var staticPath = config.getEnv("static");
var app = express();
app.set("views", path.join(__dirname, "..", "views"));
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
app.listen(port, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("micro-swagger running on port ".concat(port, "!"));
          _context.prev = 1;
          _context.next = 4;
          return open("http://localhost:" + port);

        case 4:
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](1);
          console.error("failed to open automatically.");

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 6]]);
})));