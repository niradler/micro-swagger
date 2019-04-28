const config = require("../config");
const { importDocumentation } = require("apigateway-export-tool");
const utils = require("./utils");
const path = require("path");
const fileExt = ".yml";

const exportByTitle = async (title, pathToFile) => {
  const apis = config.getEnv("apis");
  const api = apis.find(i => i.name === title);
  const file = await utils.getFile(
    path.join(
      config.getEnv("static"),
      "stages",
      title.split("-")[0],
      title + fileExt
    )
  );
  return importDocumentation({ restApiId: api.id, body: file });
};

module.exports = exportByTitle;
