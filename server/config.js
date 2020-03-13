const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    databaseURL: 'mongodb://localhost/music',
    optionsMongo: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true,
    },
};