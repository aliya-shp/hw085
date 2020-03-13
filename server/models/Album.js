const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectID,
        ref: 'Artist',
        required: true,
    },
    issueDate: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;