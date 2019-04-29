require("@babel/polyfill");
const utils = require("./utils");
const importFiles = require("./import");
const exportByTitle = require("./exportByTitle");
const router = require("express").Router();
const fs = require("fs");
const Path = require("path");
const config = require("../config");
const fileExt = ".json";

const handleError = (error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = error;
  res.status(error.status || 500);
  res.render("error", { error });
};

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
    const stagesPath = Path.join(config.getEnv("static"), "stages");
    stages.types = await utils.getFolderFilesList(stagesPath);
    if (stages.types.length == 0) {
      await importFiles();
      stages.types = await utils.getFolderFilesList(stagesPath);
    }
    for (let stage of stages.types) {
      const files = await utils.getFilesList(`${stagesPath}/${stage}`);
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

  res.render("swagger", { configFileLocation: stagesPath + path });
});

router.get("/swagger-editor", function(req, res) {
  const { path } = req.query;
  const stagesPath = "/stages";

  res.render("swagger-editor", { configFileLocation: stagesPath + path });
});

router.put("/editor", function(req, res) {
  const { path } = req.query;
  fs.writeFileSync(
    Path.join(config.getEnv("static"), path),
    Object.keys(req.body)[0]
  );
  res.send("ok");
});

router.get("/update", async (req, res) => {
  try {
    const { path } = req.query;
    let title = path.split("/");
    title = title[title.length - 1];
    title = title.replace(fileExt, "");
    await exportByTitle(title, Path.join(config.getEnv("static"), path));
    await importFiles();
    res.redirect("/");
  } catch (error) {
    handleError(error, req, res);
  }
});

module.exports = router;
