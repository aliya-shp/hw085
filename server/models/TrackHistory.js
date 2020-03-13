const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    },
    track: {
        type: Schema.Types.ObjectID,
        ref: 'Track',
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;