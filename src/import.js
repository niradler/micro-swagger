const shell = require('shelljs');
const fs = require('fs');
const dir = './static/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const getSwaggerFileById = (item) => `aws apigateway get-export --parameters extensions='postman' --rest-api-id ${item.id} --stage-name ${item.stage} --export-type swagger ./static/${item.stage}/${item.name}.json`

const run = (cmd) => {
    return new Promise((resolve,reject)=>
    shell.exec(cmd, (code, output) => {        
        if (code !== 0) {
            reject(code)
            shell.exit(1)
        }
        resolve(output)
    }))
}

const importFiles = async () => {
try {
    if (!shell.which('aws')) throw new Error('this script require aws cli');
    const json = await run('aws apigateway get-rest-apis')
    const apis = JSON.parse(json);
    for (let i = 0; i < apis.items.length; i++) {
        const item = apis.items[i];
        item.stage = item.name.slice(0,item.name.indexOf('-'))
        const path = dir + item.stage;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        await run(getSwaggerFileById(item))
    }
    
    return true;
} catch (error) {
    throw error;
}
}

module.exports = importFiles;