const Card = require('../../models/Card');

async function getAll(request, response) {
    const sanitazedFilters = {};
    const filters = request.query.filters;

    if (filters) {
        if (filters.aspects) {
            sanitazedFilters.aspects = filters.aspects;
        }
        if (filters.sets) {
            sanitazedFilters.set = { $in: request.query.filters.sets };
        }
    }

    let results = await Card.find(sanitazedFilters);
    response.send(results).status(200);
}

module.exports = getAll;
