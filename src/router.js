require("@babel/polyfill");
const utils = require("./utils");
const importFiles = require("./import");
const router = require("express").Router();

router.get("/import", async (req, res) => {
  try {
    await importFiles();
    res.redirect("/");
  } catch (error) {
    handleError(error, req, res);
  }
});
router.get("/", async (req, res) => {
  try {
    const stages = {};
    const stagesPath = "./static/stages";
    stages.types = await utils.getFolderFilesList(stagesPath);
    if (stages.types.length == 0) {
      await importFiles();
      stages.types = await utils.getFolderFilesList(stagesPath);
    }
    for (let stage of stages.types) {
      const files = await utils.getFolderFilesList(`${stagesPath}/${stage}`);
      stages[stage] = {
        files: files.map(f => `/${stage}/${f}`),
        names: []
      };
      for (let pathToFile of stages[stage].files) {
        const json = await utils.getFile(stagesPath + pathToFile);
        const obj = JSON.parse(json);
        stages[stage].names.push(obj.info.title);
      }
    }
    res.render("index", { stages });
  } catch (error) {
    console.log({ error });
    handleError(error, req, res);
  }
});

router.get("/swagger", function(req, res) {
  const { path } = req.query;
  const stagesPath = "/stages";
  console.log(stagesPath + path);
  res.render("swagger", { configFileLocation: stagesPath + path });
});

module.exports = router;
