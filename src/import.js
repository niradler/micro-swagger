const fs = require("fs");
const { getExportAndSave, getRestApis } = require("apigateway-export-tool");
const dir = "./static/stages/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const importFiles = async () => {
  try {
    const apis = await getRestApis();
    for (let i = 0; i < apis.items.length; i++) {
      const item = apis.items[i];
      item.stage = item.name.slice(0, item.name.indexOf("-"));
      const path = dir + item.stage;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      await getExportAndSave(
        { restApiId: item.id, stageName: item.stage },
        path
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = importFiles;
