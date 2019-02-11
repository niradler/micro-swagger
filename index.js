require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const utils = require('./src/utils');
const importFiles = require('./src/import');

const app = express();
const router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

const handleError = (error, req, res) => {
    res.locals.message = error.message;
    res.locals.error = error;
    res.status(error.status || 500);
    res.render('error', {error});
}

app.use((err, req, res, next) => {
    handleError(error, req, res);
});

router.get('/import', async(req, res) => {
    try {
        await importFiles();
        res.redirect('/');
    } catch (error) {
        handleError(error, req, res);
    }
})
router.get('/', async(req, res) => {
    try {
        const stages = {};
        const stagesPath = './static/stages';
        stages.types = await utils.getFolderFilesList(stagesPath);
        if(stages.types.length == 0) {
            await importFiles();  
            stages.types = await utils.getFolderFilesList(stagesPath); 
        }
        for (let stage of stages.types) {
            const files = await utils.getFolderFilesList(`${stagesPath}/${stage}`);
            stages[stage] = {
                files: files.map(f => `/${stage}/${f}`),
                names: []
            }
            for (let pathToFile of stages[stage].files) {
                const json = await utils.getFile(stagesPath + pathToFile);                
                const obj = JSON.parse(json);
                stages[stage]
                    .names
                    .push(obj.info.title)
            }
        }
        res.render('index', {stages});
    } catch (error) {
        console.log({error})
        handleError(error, req, res);
    }

});

router.get('/swagger', function (req, res) {
    const {path} = req.query
    const stagesPath = '/stages';
    console.log(stagesPath + path)
    res.render('swagger', {configFileLocation: stagesPath + path});
});

app.use('/', router);

app.listen(process.env.PORT);
