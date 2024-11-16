const Account = require("../../models/Account");
const formatCollection = require("./formatCollection");

async function getCollection(request, response) {
    const collection = await Account.findOne({ "_id": request.auth.uid }, { cardCollection: 1 });

    response.status(200).json(formatCollection(collection.cardCollection));
}

module.exports = getCollection;
