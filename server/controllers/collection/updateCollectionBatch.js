const Account = require("../../models/Account");
const formatCollection = require("./formatCollection");

async function updateCollection(request, response) {
    const batchUpdateList = request.body.batchList.split("\n");
    batchUpdateList.shift();

    const cardCollection = batchUpdateList.map(entry => {
        const entryData = entry.split("\t");

        return {
            set: entryData[0],
            number: parseInt(entryData[1]),
            count: parseInt(entryData[2])
        };
    }).filter(({ set, count }) => set !== "" && count !== 0);

    await Account.findOneAndUpdate({ "_id": request.auth.uid }, { cardCollection });
    const collection = await Account.findOne({ "_id": request.auth.uid }, { cardCollection: 1 });

    response.status(200).json(formatCollection(collection.cardCollection));
}

module.exports = updateCollection;
