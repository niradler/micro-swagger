"use strict";

var util = require("util");

var fs = require("fs");

var readdirPromise = util.promisify(fs.readdir);
var readFilePromise = util.promisify(fs.readFile);
var fileExt = ".json";

var getFolderFilesList = function getFolderFilesList(path) {
  return readdirPromise(path).then(function (folders) {
    return folders.filter(function (folder) {
      return !folder.includes(".");
    });
  });
};

var getFilesList = function getFilesList(path) {
  return readdirPromise(path).then(function (files) {
    return files.filter(function (file) {
      return file.includes(fileExt);
    });
  });
};

var getFile = function getFile(path) {
  return readFilePromise(path, "utf8");
};

module.exports = {
  getFolderFilesList: getFolderFilesList,
  getFile: getFile,
  getFilesList: getFilesList
};