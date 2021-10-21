const config = require("../config");
const {
  importDocumentation,
  iniFileCredentials,
  setAwsConfig,
} = require("apigateway-export-tool");
const utils = require("./utils");
const path = require("path");
const fileExt = ".json";

const exportById = async (id) => {
  const data = config.getEnv("data");
  const region = config.getEnv("region");
  const profile = config.getEnv("profile");
  const awsConfig = {};
  if (region) awsConfig.region = region;
  if (profile) awsConfig.credentials = iniFileCredentials(profile);
  setAwsConfig(awsConfig);
  const item = data.find((i) => i.id === id);
  const file = await utils.getFile(path.join(item.path));

  return importDocumentation({ restApiId: id, body: file });
};

module.exports = exportById;
