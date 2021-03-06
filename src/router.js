require("@babel/polyfill");
const importFiles = require("./import");
const exportById = require("./exportById");
const router = require("express").Router();
const fs = require("fs");
const Path = require("path");
const config = require("../config");

const handleError = (error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = error;
  res.status(error.status || 500);
  res.render("error", { error });
};

router.get("/import", async (req, res) => {
  try {
    await importFiles();
    res.json({
      status: "success!"
    });
  } catch (error) {
    console.log({ error });
    handleError(error, req, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = config.getEnv("data");
    let refresh = false;
    let stages = [];
    let stageToFiles = {};
    if (!data) {
      refresh = true;
      config.setEnv("data", []);
    } else {
      stages = [...new Set(data.map(d => d.stage))];
      stageToFiles = data.reduce(
        (obj, d) =>
          obj[d.stage]
            ? { ...obj, [d.stage]: [...obj[d.stage], d] }
            : { ...obj, [d.stage]: [d] },
        {}
      );
      stages = stages.filter(s => stageToFiles[s]);
    }

    res.render("index", { stages, stageToFiles, refresh });
  } catch (error) {
    console.log({ error });
    handleError(error, req, res);
  }
});

router.get("/swagger", function(req, res) {
  const { path } = req.query;

  res.render("swagger", { swaggerFileLocation: path });
});

router.get("/swagger-editor", function(req, res) {
  const { path } = req.query;
  const data = config.getEnv("data");
  const item = data.find(d => d.url === path);
  res.render("swagger-editor", { swaggerFileLocation: path, id: item.id });
});

router.put("/editor", function(req, res) {
  const { path } = req.query;
  fs.writeFileSync(
    Path.join(config.getEnv("static"), path),
    Object.keys(req.body)[0]
  );
  res.json({
    status: "success!"
  });
});

router.get("/update", async (req, res) => {
  try {
    const { id } = req.query;

    await exportById(id);
    await importFiles();
    res.redirect("/");
  } catch (error) {
    handleError(error, req, res);
  }
});

module.exports = router;
