"use strict";

var config = require("./config");

var fs = require("fs-extra");

var xdgBasedir = require("xdg-basedir");

var os = require("os");

var path = require("path");

var init = function init() {
  try {
    var dir = path.join(xdgBasedir.data, "micro-swagger/static");
    fs.ensureDirSync(dir);
    config.setEnv("static", dir);
  } catch (error) {
    var _dir = path.join(os.tmpdir(), "micro-swagger/static");

    fs.ensureDirSync(_dir);
    config.setEnv("static", _dir);
  }
};

module.exports = init;