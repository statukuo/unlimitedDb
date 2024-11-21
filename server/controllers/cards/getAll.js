const Card = require('../../models/Card');

function getStrictFilter(name) {
    if (name === "OR") return "$in";
    if (name === "EXCLUDE") return "$nin";
    return "$all";
}

function getNumericStrictFilter(name) {
    if (name === "gt") return "$gte";
    if (name === "lw") return "$lte";
    return "$eq";
}

async function getAll(request, response) {
    const sanitazedFilters = {
        $or: []
    };
    const filters = request.query.filters;

    if (filters) {
        if (filters.aspects) {
            sanitazedFilters.aspects = {};
            sanitazedFilters.aspects[getStrictFilter(filters.aspectsStrict)] = filters.aspects;
        }
        if (filters.set) {
            sanitazedFilters.set = { $in: request.query.filters.set };
        }
        if (filters.type) {
            sanitazedFilters.type = { $in: request.query.filters.type };
        }
        if (filters.cost) {
            sanitazedFilters.cost = {};
            sanitazedFilters.cost[getNumericStrictFilter(filters.costStrict)] = request.query.filters.cost;
        }
        if (filters.hp) {
            sanitazedFilters.hp = {};
            sanitazedFilters.hp[getNumericStrictFilter(filters.hpStrict)] = request.query.filters.hp;
        }
        if (filters.power) {
            sanitazedFilters.power = {};
            sanitazedFilters.power[getNumericStrictFilter(filters.powerStrict)] = request.query.filters.power;
        }
        if (filters.arenas) {
            sanitazedFilters.arenas = { $in: request.query.filters.arenas };
        }
        if (filters.keywords) {
            sanitazedFilters.keywords = {};
            sanitazedFilters.keywords[getStrictFilter(filters.keywordsStrict)] = filters.keywords;
        }
        if (filters.traits) {
            sanitazedFilters.traits = {};
            sanitazedFilters.traits[getStrictFilter(filters.traitsStrict)] = filters.traits;
        }
        if (filters.rarity) {
            sanitazedFilters.rarity = filters.rarity;
        }
        if (filters.ability) {
            const textFilter = RegExp(filters.ability, "gi");
            sanitazedFilters.$or.push(...[{ backText: { "$regex": textFilter } }, { frontText: { "$regex": textFilter } }]);
        }
        if (filters.name) {
            const textFilter = RegExp(filters.name, "gi");
            sanitazedFilters.$or.push(...[{ subtitle: { "$regex": textFilter } }, { name: { "$regex": textFilter } }]);
        }
    }

    if (sanitazedFilters.$or.length === 0) { delete sanitazedFilters.$or; }

    let results = await Card.find(sanitazedFilters, null, { sort: { set: 1, number: 1 } });
    response.send(results).status(200);
}

module.exports = getAll;
