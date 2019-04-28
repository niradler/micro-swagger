const Configstore = require("configstore");
const pkg = require("./package.json");
const conf = new Configstore(pkg.name, {});

const getEnv = key => {
  return conf.get(key);
};

const setEnv = (key, value) => {
  conf.set(key, value);
};

module.exports = {
  getEnv,
  setEnv,
  all: conf.all
};
