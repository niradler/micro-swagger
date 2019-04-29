const util = require("util");
const fs = require("fs");
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const fileExt = ".json";

const getFolderFilesList = path =>
  readdirPromise(path).then(folders =>
    folders.filter(folder => !folder.includes("."))
  );
const getFilesList = path =>
  readdirPromise(path).then(files =>
    files.filter(file => file.includes(fileExt))
  );

const getFile = path => readFilePromise(path, "utf8");

module.exports = {
  getFolderFilesList,
  getFile,
  getFilesList
};
