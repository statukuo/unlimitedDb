require('dotenv').config();
const mongo = require('./utils/mongo');
const Card = require('./models/Card');
const data = require("./data/Twilight of the Republic.json");

async function upload(card) {
    try {
        const filter = { number: parseInt(card.Number), set: card.Set };
        const update = {
            set: card.Set,
            number: parseInt(card.Number),
            name: card.Name,
            subtitle: card.Subtitle,
            type: card.Type,
            aspects: card.Aspects,
            traits: card.Traits,
            arenas: card.Arenas,
            cost: parseInt(card.Cost || 0),
            power: parseInt(card.Power || 0),
            hp: parseInt(card.HP || 0),
            frontText: card.FrontText,
            epicAction: card.EpicAction,
            doubleSided: card.DoubleSided,
            backArt: card.BackArt,
            backText: card.BackText,
            rarity: card.Rarity,
            unique: card.Unique,
            artist: card.Artist,
            frontArt: card.FrontArt,
            keywords: card.Keywords

        };

        await Card.findOneAndUpdate(filter, update, { upsert: true });

        console.log("Uploaded " + card.Set + ":" + card.Number + " " + card.Name);
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
