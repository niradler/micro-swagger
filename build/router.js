"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("@babel/polyfill");

var utils = require("./utils");

var importFiles = require("./import");

var exportByTitle = require("./exportByTitle");

var router = require("express").Router();

var fs = require("fs");

var Path = require("path");

var config = require("../config");

var fileExt = ".json";

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
    var stages, stagesPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            stages = {};
            stagesPath = Path.join(config.getEnv("static"), "stages");
            _context3.next = 5;
            return utils.getFolderFilesList(stagesPath);

          case 5:
            stages.types = _context3.sent;

            if (!(stages.types.length == 0)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 9;
            return importFiles();

          case 9:
            _context3.next = 11;
            return utils.getFolderFilesList(stagesPath);

          case 11:
            stages.types = _context3.sent;

          case 12:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 15;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var stage, files, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pathToFile, json, obj;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      stage = _step.value;
                      _context2.next = 3;
                      return utils.getFilesList("".concat(stagesPath, "/").concat(stage));

                    case 3:
                      files = _context2.sent;
                      stages[stage] = {
                        files: files.map(function (f) {
                          return "/".concat(stage, "/").concat(f);
                        }),
                        names: []
                      };
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context2.prev = 8;
                      _iterator2 = stages[stage].files[Symbol.iterator]();

                    case 10:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context2.next = 20;
                        break;
                      }

                      pathToFile = _step2.value;
                      _context2.next = 14;
                      return utils.getFile(stagesPath + pathToFile);

                    case 14:
                      json = _context2.sent;
                      obj = JSON.parse(json);
                      stages[stage].names.push(obj.info.title);

                    case 17:
                      _iteratorNormalCompletion2 = true;
                      _context2.next = 10;
                      break;

                    case 20:
                      _context2.next = 26;
                      break;

                    case 22:
                      _context2.prev = 22;
                      _context2.t0 = _context2["catch"](8);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context2.t0;

                    case 26:
                      _context2.prev = 26;
                      _context2.prev = 27;

                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }

                    case 29:
                      _context2.prev = 29;

                      if (!_didIteratorError2) {
                        _context2.next = 32;
                        break;
                      }

                      throw _iteratorError2;

                    case 32:
                      return _context2.finish(29);

                    case 33:
                      return _context2.finish(26);

                    case 34:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[8, 22, 26, 34], [27,, 29, 33]]);
            });
            _iterator = stages.types[Symbol.iterator]();

          case 18:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 23;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 20);

          case 20:
            _iteratorNormalCompletion = true;
            _context3.next = 18;
            break;

          case 23:
            _context3.next = 29;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t1 = _context3["catch"](15);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 29:
            _context3.prev = 29;
            _context3.prev = 30;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 32:
            _context3.prev = 32;

            if (!_didIteratorError) {
              _context3.next = 35;
              break;
            }

            throw _iteratorError;

          case 35:
            return _context3.finish(32);

          case 36:
            return _context3.finish(29);

          case 37:
            res.render("index", {
              stages: stages
            });
            _context3.next = 44;
            break;

          case 40:
            _context3.prev = 40;
            _context3.t2 = _context3["catch"](0);
            console.log({
              error: _context3.t2
            });
            handleError(_context3.t2, req, res);

          case 44:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[0, 40], [15, 25, 29, 37], [30,, 32, 36]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/swagger", function (req, res) {
  var path = req.query.path;
  var stagesPath = "/stages";
  res.render("swagger", {
    configFileLocation: stagesPath + path
  });
});
router.get("/swagger-editor", function (req, res) {
  var path = req.query.path;
  var stagesPath = "/stages";
  res.render("swagger-editor", {
    configFileLocation: stagesPath + path
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
    var path, title;
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            path = req.query.path;
            title = path.split("/");
            title = title[title.length - 1];
            title = title.replace(fileExt, "");
            _context4.next = 7;
            return exportByTitle(title, Path.join(config.getEnv("static"), path));

          case 7:
            _context4.next = 9;
            return importFiles();

          case 9:
            res.redirect("/");
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            handleError(_context4.t0, req, res);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;