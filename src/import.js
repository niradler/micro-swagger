const path = require("path");
const config = require("../config");
const {
  getExportAndSave,
  getRestApis,
  getStages,
  setAwsConfig,
  iniFileCredentials,
} = require("apigateway-export-tool");
const fs = require("fs-extra");
const fileExt = ".json";

const importFiles = async () => {
  try {
    console.log("Importing files...");
    const dir = config.getEnv("static");
    const region = config.getEnv("region");
    const profile = config.getEnv("profile");
    const awsConfig = {};
    if (region) awsConfig.region = region;
    if (profile) awsConfig.credentials = iniFileCredentials(profile);
    console.log({ awsConfig });
    setAwsConfig(awsConfig);
    const apis = await getRestApis();
    console.log(apis);
    config.setEnv("apis", apis.items);
    const data = [];
    for (let i = 0; i < apis.items.length; i++) {
      const item = apis.items[i];

      const stages = await getStages({ restApiId: item.id });
      console.log(stages);
      for (let i = 0; i < stages.item.length; i++) {
        const stage = stages.item[i];
        const pathToSave = path.join(dir, `stages/${stage.stageName}`);

        fs.ensureDirSync(pathToSave);
        await getExportAndSave(
          { restApiId: item.id, stageName: stage.stageName },
          pathToSave,
          { fixBasePath: true }
        );

        const d = {
          id: item.id,
          name: item.name,
          url: `/stages/${stage.stageName}/${item.name + fileExt}`,
          path: path.join(pathToSave, item.name + fileExt),
          stage: stage.stageName,
        };
        console.log(d);
        data.push(d);
      }
    }
    config.setEnv("data", data);

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = importFiles;
