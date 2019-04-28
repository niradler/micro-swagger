const path = require("path");
const config = require("./config");
const { getExportAndSave, getRestApis } = require("apigateway-export-tool");
const fs = require("fs-extra");

const dir = config.getEnv("static");

const importFiles = async () => {
  try {
    const apis = await getRestApis();
    config.setEnv("apis", apis.items);
    for (let i = 0; i < apis.items.length; i++) {
      const item = apis.items[i];
      item.stage = item.name.slice(0, item.name.indexOf("-"));
      const pathToSave = path.join(dir, `stages/${item.stage}`);
      fs.ensureDirSync(pathToSave);
      await getExportAndSave(
        { restApiId: item.id, stageName: item.stage, exportType: "oas30" },
        pathToSave
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = importFiles;
