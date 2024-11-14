const Card = require('../../models/Card');

async function getFiltered(request, response) {
    console.log(request);

    let results = await Card.find();
    response.send(results).status(200);
}

module.exports = getFiltered;
