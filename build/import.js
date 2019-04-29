"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var config = require("../config");

var _require = require("apigateway-export-tool"),
    getExportAndSave = _require.getExportAndSave,
    getRestApis = _require.getRestApis,
    getStages = _require.getStages;

var fs = require("fs-extra");

var fileExt = ".json";
var dir = config.getEnv("static");

var importFiles =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var apis, data, i, item, stages, _i, stage, pathToSave, d;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getRestApis();

          case 3:
            apis = _context.sent;
            config.setEnv("apis", apis.items);
            data = [];
            i = 0;

          case 7:
            if (!(i < apis.items.length)) {
              _context.next = 27;
              break;
            }

            item = apis.items[i];
            _context.next = 11;
            return getStages({
              restApiId: item.id
            });

          case 11:
            stages = _context.sent;
            _i = 0;

          case 13:
            if (!(_i < stages.item.length)) {
              _context.next = 24;
              break;
            }

            stage = stages.item[_i];
            pathToSave = path.join(dir, "stages/".concat(stage.stageName));
            fs.ensureDirSync(pathToSave);
            _context.next = 19;
            return getExportAndSave({
              restApiId: item.id,
              stageName: stage.stageName
            }, pathToSave, {
              fixBasePath: true
            });

          case 19:
            d = {
              id: item.id,
              name: item.name,
              url: "/stages/".concat(stage.stageName, "/").concat(item.name + fileExt),
              path: path.join(pathToSave, item.name + fileExt),
              stage: stage.stageName
            };
            data.push(d);

          case 21:
            _i++;
            _context.next = 13;
            break;

          case 24:
            i++;
            _context.next = 7;
            break;

          case 27:
            config.setEnv("data", data);
            return _context.abrupt("return", true);

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 31]]);
  }));

  return function importFiles() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = importFiles;