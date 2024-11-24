const Deck = require('../../models/Deck');

async function getDeck(request, response) {
    try {
        const deck = await Deck.findOne({ "_id": request.params.deckId });

        response.send(deck).status(200);
    } catch (error) {
        console.error(error);
        response.status(500).send();
    }

}

module.exports = getDeck;
