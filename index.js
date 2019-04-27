require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./build/router");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));

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

app.listen(process.env.PORT, () =>
  console.log(`micro-swagger running on port ${process.env.PORT}!`)
);
