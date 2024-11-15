const Account = require("../../models/Account");

async function updateCollection(request, response) {
    const cardCollection = [];

    for (const [set] of Object.entries(request.body)) {
        for (const [number, count] of Object.entries(request.body[set])) {
            cardCollection.push({ set, number: parseInt(number), count });
        }
    }

    await Account.findOneAndUpdate({ "_id": request.auth.uid }, { cardCollection });

    response.send({}).status(200);
}

module.exports = updateCollection;
