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

var importFiles =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var dir, apis, data, i, item, stages, _i, stage, pathToSave, d;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dir = config.getEnv("static");
            _context.next = 4;
            return getRestApis();

          case 4:
            apis = _context.sent;
            config.setEnv("apis", apis.items);
            data = [];
            i = 0;

          case 8:
            if (!(i < apis.items.length)) {
              _context.next = 28;
              break;
            }

            item = apis.items[i];
            _context.next = 12;
            return getStages({
              restApiId: item.id
            });

          case 12:
            stages = _context.sent;
            _i = 0;

          case 14:
            if (!(_i < stages.item.length)) {
              _context.next = 25;
              break;
            }

            stage = stages.item[_i];
            pathToSave = path.join(dir, "stages/".concat(stage.stageName));
            fs.ensureDirSync(pathToSave);
            _context.next = 20;
            return getExportAndSave({
              restApiId: item.id,
              stageName: stage.stageName
            }, pathToSave, {
              fixBasePath: true
            });

          case 20:
            d = {
              id: item.id,
              name: item.name,
              url: "/stages/".concat(stage.stageName, "/").concat(item.name + fileExt),
              path: path.join(pathToSave, item.name + fileExt),
              stage: stage.stageName
            };
            data.push(d);

          case 22:
            _i++;
            _context.next = 14;
            break;

          case 25:
            i++;
            _context.next = 8;
            break;

          case 28:
            config.setEnv("data", data);
            return _context.abrupt("return", true);

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 32]]);
  }));

  return function importFiles() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = importFiles;