const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistories = require('./app/trackHistories');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.databaseURL, config.optionsMongo);

    app.use('/artists', artists);
    app.use('/albums', albums);
    app.use('/tracks', tracks);
    app.use('/users', users);
    app.use('/track_histories', trackHistories);

    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});