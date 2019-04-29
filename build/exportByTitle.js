"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = require("../config");

var _require = require("apigateway-export-tool"),
    importDocumentation = _require.importDocumentation;

var utils = require("./utils");

var path = require("path");

var fileExt = ".json";

var exportByTitle =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(title, pathToFile) {
    var apis, api, file;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apis = config.getEnv("apis");
            api = apis.find(function (i) {
              return i.name === title;
            });
            _context.next = 4;
            return utils.getFile(path.join(config.getEnv("static"), "stages", title.split("-")[0], title + fileExt));

          case 4:
            file = _context.sent;
            return _context.abrupt("return", importDocumentation({
              restApiId: api.id,
              body: file
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function exportByTitle(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exportByTitle;