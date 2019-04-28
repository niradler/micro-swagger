"use strict";

var Configstore = require("configstore");

var pkg = require("./package.json");

var conf = new Configstore(pkg.name, {});

var getEnv = function getEnv(key) {
  return conf.get(key);
};

var setEnv = function setEnv(key, value) {
  conf.set(key, value);
};

module.exports = {
  getEnv: getEnv,
  setEnv: setEnv,
  all: conf.all
};