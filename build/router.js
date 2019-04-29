"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("@babel/polyfill");

var importFiles = require("./import");

var exportById = require("./exportById");

var router = require("express").Router();

var fs = require("fs");

var Path = require("path");

var config = require("../config");

var handleError = function handleError(error, req, res) {
  res.locals.message = error.message;
  res.locals.error = error;
  res.status(error.status || 500);
  res.render("error", {
    error: error
  });
};

router.get("/import",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return importFiles();

          case 3:
            res.redirect("/");
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            handleError(_context.t0, req, res);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/",
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var data, stages, stageToFiles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            data = config.getEnv("data");

            if (data) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return importFiles();

          case 5:
            data = config.getEnv("data");

          case 6:
            stages = data.map(function (d) {
              return d.stage;
            });
            stageToFiles = data.reduce(function (obj, d) {
              return obj[d.stage] ? _objectSpread({}, obj, _defineProperty({}, d.stage, [].concat(_toConsumableArray(obj[d.stage]), [d]))) : _objectSpread({}, obj, _defineProperty({}, d.stage, [d]));
            }, {});
            stages.filter(function (s) {
              return stageToFiles[s];
            });
            res.render("index", {
              stages: stages,
              stageToFiles: stageToFiles
            });
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log({
              error: _context2.t0
            });
            handleError(_context2.t0, req, res);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/swagger", function (req, res) {
  var path = req.query.path;
  res.render("swagger", {
    swaggerFileLocation: path
  });
});
router.get("/swagger-editor", function (req, res) {
  var path = req.query.path;
  var data = config.getEnv("data");
  var item = data.find(function (d) {
    return d.url === path;
  });
  res.render("swagger-editor", {
    swaggerFileLocation: path,
    id: item.id
  });
});
router.put("/editor", function (req, res) {
  var path = req.query.path;
  fs.writeFileSync(Path.join(config.getEnv("static"), path), Object.keys(req.body)[0]);
  res.send("ok");
});
router.get("/update",
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.query.id;
            _context3.next = 4;
            return exportById(id);

          case 4:
            _context3.next = 6;
            return importFiles();

          case 6:
            res.redirect("/");
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            handleError(_context3.t0, req, res);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;