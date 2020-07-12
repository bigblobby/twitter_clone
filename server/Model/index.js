const fs = require('fs');
const path = require('path');
const knex = require('../Config/database');

const getModelFiles = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err) reject(err);

            const filteredFiles = files.filter(file => (file.indexOf('.') !== 0) && file !== 'index.js' && file !== 'base.js')
                .map(file => path.join(dir, file));

            resolve(filteredFiles);
        });
    });
}

async function init() {
    const files = await getModelFiles(__dirname);

    return files.reduce((models, file) => {
        const initModel = require(file);
        const model = initModel(knex);

        if(model) models[model.name] = model;

        return models;
    }, {});
}

module.exports = init();
