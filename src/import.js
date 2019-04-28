const path = require("path");
const { getExportAndSave, getRestApis } = require("apigateway-export-tool");
const fs = require("fs-extra");
const xdgBasedir = require("xdg-basedir");
const os = require("os");

let dir;
try {
  dir = path.join(xdgBasedir.data, "micro-swagger/static/stages/");
  fs.ensureDirSync(dir);
} catch (error) {
  dir = path.join(os.tmpdir(), "micro-swagger/static/stages/");
  fs.ensureDirSync(dir);
}

const importFiles = async () => {
  try {
    const apis = await getRestApis();
    for (let i = 0; i < apis.items.length; i++) {
      const item = apis.items[i];
      item.stage = item.name.slice(0, item.name.indexOf("-"));
      const pathToSave = path.join(dir, item.stage);
      fs.ensureDirSync(pathToSave);
      await getExportAndSave(
        { restApiId: item.id, stageName: item.stage },
        pathToSave
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = importFiles;
