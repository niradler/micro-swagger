const config = require("./config");
const fs = require("fs-extra");
const xdgBasedir = require("xdg-basedir");
const os = require("os");
const path = require("path");

const init = () => {
  try {
    const dir = path.join(xdgBasedir.data, "micro-swagger/static");
    fs.ensureDirSync(dir);
    config.setEnv("static", dir);
  } catch (error) {
    const dir = path.join(os.tmpdir(), "micro-swagger/static");
    fs.ensureDirSync(dir);
    config.setEnv("static", dir);
  }
};

module.exports = init;
