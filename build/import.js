"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var config = require("../config");

var _require = require("apigateway-export-tool"),
    getExportAndSave = _require.getExportAndSave,
    getRestApis = _require.getRestApis,
    getStages = _require.getStages,
    setAwsConfig = _require.setAwsConfig,
    iniFileCredentials = _require.iniFileCredentials;

var fs = require("fs-extra");

var fileExt = ".json";

var importFiles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dir, region, profile, awsConfig, apis, data, i, item, stages, _i, stage, pathToSave, d;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log("Importing files...");
            dir = config.getEnv("static");
            region = config.getEnv("region");
            profile = config.getEnv("profile");
            awsConfig = {};
            if (region) awsConfig.region = region;
            if (profile) awsConfig.credentials = iniFileCredentials(profile);
            console.log({
              awsConfig: awsConfig
            });
            setAwsConfig(awsConfig);
            _context.next = 12;
            return getRestApis();

          case 12:
            apis = _context.sent;
            console.log(apis);
            config.setEnv("apis", apis.items);
            data = [];
            i = 0;

          case 17:
            if (!(i < apis.items.length)) {
              _context.next = 39;
              break;
            }

            item = apis.items[i];
            _context.next = 21;
            return getStages({
              restApiId: item.id
            });

          case 21:
            stages = _context.sent;
            console.log(stages);
            _i = 0;

          case 24:
            if (!(_i < stages.item.length)) {
              _context.next = 36;
              break;
            }

            stage = stages.item[_i];
            pathToSave = path.join(dir, "stages/".concat(stage.stageName));
            fs.ensureDirSync(pathToSave);
            _context.next = 30;
            return getExportAndSave({
              restApiId: item.id,
              stageName: stage.stageName
            }, pathToSave, {
              fixBasePath: true
            });

          case 30:
            d = {
              id: item.id,
              name: item.name,
              url: "/stages/".concat(stage.stageName, "/").concat(item.name + fileExt),
              path: path.join(pathToSave, item.name + fileExt),
              stage: stage.stageName
            };
            console.log(d);
            data.push(d);

          case 33:
            _i++;
            _context.next = 24;
            break;

          case 36:
            i++;
            _context.next = 17;
            break;

          case 39:
            config.setEnv("data", data);
            return _context.abrupt("return", true);

          case 43:
            _context.prev = 43;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 43]]);
  }));

  return function importFiles() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = importFiles;