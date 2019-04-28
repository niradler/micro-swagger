"use strict";

var util = require('util');

var fs = require('fs');

var readdirPromise = util.promisify(fs.readdir);
var readFilePromise = util.promisify(fs.readFile);

var getFolderFilesList = function getFolderFilesList(path) {
  return readdirPromise(path).then(function (folders) {
    return folders.filter(function (folder) {
      return !['.DS_Store'].includes(folder);
    });
  });
};

var getFile = function getFile(path) {
  return readFilePromise(path, 'utf8');
};

module.exports = {
  getFolderFilesList: getFolderFilesList,
  getFile: getFile
};