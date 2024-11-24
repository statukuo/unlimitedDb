const Deck = require('../../models/Deck');

async function getLatestDecks(request, response) {
    try {
        const deck = await Deck.find({ "private": false }, null, { sort: { updatedAt: 1 } }).limit(20);
        response.send(deck).status(200);
    } catch (error) {
        console.error(error);
        response.status(500).send();
    }

}

module.exports = getLatestDecks;
