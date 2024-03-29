"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

router.get("/import", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return importFiles();

          case 3:
            res.json({
              status: "success!"
            });
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log({
              error: _context.t0
            });
            handleError(_context.t0, req, res);

          case 10:
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
router.get("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var data, refresh, stages, stageToFiles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              data = config.getEnv("data");
              refresh = false;
              stages = [];
              stageToFiles = {};

              if (!data) {
                refresh = true;
                config.setEnv("data", []);
              } else {
                stages = _toConsumableArray(new Set(data.map(function (d) {
                  return d.stage;
                })));
                stageToFiles = data.reduce(function (obj, d) {
                  return obj[d.stage] ? _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, d.stage, [].concat(_toConsumableArray(obj[d.stage]), [d]))) : _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, d.stage, [d]));
                }, {});
                stages = stages.filter(function (s) {
                  return stageToFiles[s];
                });
              }

              res.render("index", {
                stages: stages,
                stageToFiles: stageToFiles,
                refresh: refresh
              });
            } catch (error) {
              console.log({
                error: error
              });
              handleError(error, req, res);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
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
  res.json({
    status: "success!"
  });
});
router.get("/update", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
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