const Card = require('../../models/Card')

async function getAll(request, response) {
    let results = await Card.find();
    response.send(results).status(200);
}

module.exports = getAll
