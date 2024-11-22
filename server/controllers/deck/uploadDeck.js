const Deck = require('../../models/Deck');

async function uploadDeck(request, response) {
    const deck = request.body.deck;

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
        ownerId: request.auth.uid
    };


    const result = await Deck.findOneAndUpdate({ _id: deck._id, ownerId: request.auth.uid }, documentToUpload, { upsert: true });

    console.log(result);

    response.send(result).status(200);
}

module.exports = uploadDeck;
