const Deck = require('../../models/Deck');

async function deleteDeck(request, response) {
    try {
        await Deck.find({ "_id": request.params.deckId }).remove();

        response.send({}).status(200);
    } catch (error) {
        console.error(error);
        response.status(500).send();
    }

}

module.exports = deleteDeck;
