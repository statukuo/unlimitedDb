const Card = require('../../models/Card');

function getStrictFilter(name) {
    if (name === "OR") return "$in";
    if (name === "EXCLUDE") return "$nin";
    return "$all";
}

async function getAll(request, response) {
    const sanitazedFilters = {};
    const filters = request.query.filters;

    if (filters) {
        if (filters.aspects) {
            sanitazedFilters.aspects = {};
            sanitazedFilters.aspects[getStrictFilter(filters.aspectsStrict)] = filters.aspects;
        }
        if (filters.sets) {
            sanitazedFilters.set = { $in: request.query.filters.sets };
        }
        if (filters.cost) {
            sanitazedFilters.cost = { $in: request.query.filters.cost };
        }
    }

    let results = await Card.find(sanitazedFilters, null, { sort: { set: 1, number: 1 } });
    response.send(results).status(200);
}

module.exports = getAll;
