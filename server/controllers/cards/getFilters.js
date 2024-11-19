const Card = require('../../models/Card');


async function getFilters(request, response) {
    let results = {
        name: {
            title: "Name",
            text: true
        },
        aspects: {
            title: "Aspects",
            strict: true,
            options: await Card.collection.distinct('aspects')
        },
        type: {
            title: "Type",
            options: await Card.collection.distinct('type')
        },
        cost: {
            title: "Cost",
            strict: true
        },
        hp: {
            title: "hp",
            strict: true
        },
        power: {
            title: "Power",
            strict: true
        },
        keywords: {
            title: "Keywords",
            strict: true,
            options: await Card.collection.distinct('keywords')

        },
        set: {
            title: "Set",
            options: await Card.collection.distinct('set')

        },
        arenas: {
            title: "Arenas",
            options: await Card.collection.distinct('arenas')

        },
        traits: {
            title: "Traits",
            strict: true,
            options: await Card.collection.distinct('traits')

        },
        rarity: {
            title: "Rarity",
            options: await Card.collection.distinct('rarity')
        },
        ability: {
            title: "Ability",
            text: true
        }

    };

    response.send(results).status(200);
}

module.exports = getFilters;
