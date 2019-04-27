"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require("fs");

var path = require("path");

var _require = require("apigateway-export-tool"),
    getExportAndSave = _require.getExportAndSave,
    getRestApis = _require.getRestApis;

var dir = "./static/stages/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var importFiles =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var apis, i, item, pathToSave;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getRestApis();

          case 3:
            apis = _context.sent;
            i = 0;

          case 5:
            if (!(i < apis.items.length)) {
              _context.next = 15;
              break;
            }

            item = apis.items[i];
            item.stage = item.name.slice(0, item.name.indexOf("-"));
            pathToSave = path.join(dir, item.stage);

            if (!fs.existsSync(pathToSave)) {
              fs.mkdirSync(pathToSave);
            }

            _context.next = 12;
            return getExportAndSave({
              restApiId: item.id,
              stageName: item.stage
            }, pathToSave);

          case 12:
            i++;
            _context.next = 5;
            break;

          case 15:
            return _context.abrupt("return", true);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function importFiles() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = importFiles;