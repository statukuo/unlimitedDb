const Deck = require('../../models/Deck');

async function uploadDeck(request, response) {
    console.log(request.body);

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


    await Deck.findOneAndUpdate({ title: deck.metadata.name, ownerId: request.auth.uid }, documentToUpload, { upsert: true });

    response.send({}).status(200);
}

module.exports = uploadDeck;
