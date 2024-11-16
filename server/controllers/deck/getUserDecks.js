const Deck = require('../../models/Deck');

async function getUserDecks(request, response) {
    const userDeckList = await Deck.find({ "ownerId": request.auth.uid }, null, { updatedAt: 1 });

    response.send(userDeckList).status(200);
}

module.exports = getUserDecks;
