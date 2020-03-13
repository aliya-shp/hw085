const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.databaseURL, config.optionsMongo);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();
    for (let collection of collections) {
        await collection.drop();
    }

    await User.create({
        username: 'user',
        password: '123',
        token: nanoid()
    }, {
        username: 'admin',
        password: '123',
        token: nanoid()
    });

    let artists = await Artist.create(
        {name: 'LP', image: 'beatles.jpeg', description: 'Legendary British band'},
        {name: 'Muse', image: 'melnitsa.jpg', description: 'Russian folk-group'},
    );

    let albums = await Album.create(
        {
            title: 'Please Please Me',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'please_please_me.jpg'
        },
        {
            title: 'With the Beatles',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'with_the_beatles.jpg'
        },
        {
            title: 'Pereval',
            artist: artists[1]._id,
            issueDate: '2005',
            image: 'pereval.jpg'
        },
        {
            title: 'Zov krovi',
            artist: artists[1]._id,
            issueDate: '2006',
            image: 'zov_krovi.jpg'
        },
    );

    const tracks = albums.map(album => {
        return ['track 1', 'track 2', 'track 3', 'track 4', 'track 5'].map((track, index) => {
            return {
                title: track,
                album: album._id,
                duration: Math.floor(Math.random()*100)/10,
                sequence: (index + 1),
                published: true
            }
        })
    });

    await Track.create(trackSeeds.flat(2));

    await connection.close();
};

run().catch(error => {
    console.error('Smt went wrong', error);
});