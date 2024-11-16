async function uploadDeck(request, response) {
    console.log(request.body.deck);

    response.send({}).status(200);
}

module.exports = uploadDeck;
