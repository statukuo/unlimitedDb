const Card = require('../../models/Card');

async function getAll(request, response) {
    let results = await Card.find(request.query.filters);
    response.send(results).status(200);
}

module.exports = getAll;
