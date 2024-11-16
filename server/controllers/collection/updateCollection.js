const Account = require("../../models/Account");
const formatCollection = require("./formatCollection");

async function updateCollection(request, response) {
    const cardCollection = [];

    for (const [set] of Object.entries(request.body)) {
        for (const [number, count] of Object.entries(request.body[set])) {
            cardCollection.push({ set, number: parseInt(number), count });
        }
    }

    await Account.findOneAndUpdate({ "_id": request.auth.uid }, { cardCollection });
    const data = await Account.findOne({ "_id": request.auth.uid }, { cardCollection: 1 });

    response.status(200).json(formatCollection(data.cardCollection));
}

module.exports = updateCollection;
