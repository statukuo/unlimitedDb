require('dotenv').config();
const mongo = require('./utils/mongo');
const data = require("./data/hotDecksRip.json");
const Deck = require('./models/Deck');

async function upload({ json, comment }) {
    try {
        const filter = { title: json.metadata.name, ownerId: '6736f9696aa4804edfeea3af' };
        const deck = {
            ...json,
            list: json.deck,
            title: json.metadata.name,
            description: comment,
            private: false
        };
        await Deck.findOneAndUpdate(filter, deck, { upsert: true });

        console.log("Uploaded " + json.metadata.name);
    } catch (error) {
        console.error(error);
    }
}

async function batchUpload() {
    await mongo.connect();

    data.reduce(async (promise, card) => {
        await promise;
        await upload(card);
    }, Promise.resolve());
}

batchUpload();
