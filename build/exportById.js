"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = require("../config");

var _require = require("apigateway-export-tool"),
    importDocumentation = _require.importDocumentation,
    iniFileCredentials = _require.iniFileCredentials,
    setAwsConfig = _require.setAwsConfig;

var utils = require("./utils");

var path = require("path");

var fileExt = ".json";

var exportById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var data, region, profile, awsConfig, item, file;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = config.getEnv("data");
            region = config.getEnv("region");
            profile = config.getEnv("profile");
            awsConfig = {};
            if (region) awsConfig.region = region;
            if (profile) awsConfig.credentials = iniFileCredentials(profile);
            setAwsConfig(awsConfig);
            item = data.find(function (i) {
              return i.id === id;
            });
            _context.next = 10;
            return utils.getFile(path.join(item.path));

          case 10:
            file = _context.sent;
            return _context.abrupt("return", importDocumentation({
              restApiId: id,
              body: file
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function exportById(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = exportById;