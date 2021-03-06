const config = require("../config");
const init = require("../init");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./router");
const cors = require("cors");
const open = require("open");

init();
const staticPath = config.getEnv("static");

const app = express();

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(staticPath));

const handleError = (error, req, res) => {
  res.locals.message = error.message;
  res.locals.error = error;
  res.status(error.status || 500);
  res.render("error", { error });
};

app.use((err, req, res, next) => {
  handleError(error, req, res);
});

app.use("/", router);

const port = config.getEnv("port") || 3055;

app.listen(port, async () => {
  console.log(`micro-swagger running on port ${port}!`);
  try {
    await open("http://localhost:" + port);
  } catch (error) {
    console.error("failed to open automatically.");
  }
});
