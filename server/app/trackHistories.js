const express = require('express');

const User = require('../models/User');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async (req, res) => {

    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
        return res.status(401).send({error: 'No authorization header'});
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Token' || !token) {
        return res.status(401).send({error: 'Authorization type wrong or token not present'});
    }

    const user = await User.findOne({token});

    const trackHistoryData = await Track.findOne({_id: req.body.track});

    if (!user) {
        return res.status(401).send({error: 'No user found with this token. Token incorrect'});
    } else {
        const trackHistory = new TrackHistory({
            user: user._id,
            track: trackHistoryData._id,
            datetime: new Date().toISOString(),
        });

        await trackHistory.save();

        return res.send(trackHistory);
    }
});

router.get('/', async (req, res) => {
   const trackHistories = await TrackHistory.find();
   res.send(trackHistories);
});

module.exports = router;