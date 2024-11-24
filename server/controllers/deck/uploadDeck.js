const Deck = require('../../models/Deck');

async function uploadDeck(request, response) {
    const deck = request.body.deck;
    const isPrivate = request.body.isPrivate;

    const documentToUpload = {
        title: deck.metadata.name,
        leader: {
            id: deck.leader.id,
            count: 1
        },
        base: {
            id: deck.base.id,
            count: 1
        },
        list: deck.deck.map(card => { return { id: card.id, count: card.count }; }),
        sideboard: deck.sideboard.map(card => { return { id: card.id, count: card.count }; }),
        ownerId: request.auth.uid,
        private: !!isPrivate
    };

    let result;
    if (deck._id) {
        result = await Deck.findOneAndUpdate({ _id: deck._id, ownerId: request.auth.uid }, documentToUpload, { new: true });
    } else {
        result = await Deck.create(documentToUpload);
    }
    response.send(result).status(200);
}

module.exports = uploadDeck;
