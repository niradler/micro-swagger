const util = require('util');
const fs = require('fs');
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);

const getFolderFilesList = (path) => readdirPromise(path);

const getFile = (path) => readFilePromise(path, 'utf8');

module.exports = {
    getFolderFilesList,
    getFile
}