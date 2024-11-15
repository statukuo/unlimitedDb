const Account = require("../../models/Account");

async function getCollection(request, response) {
    const userCollection = await Account.findOne({ "_id": request.auth.uid }, { cardCollection: 1 });

    const objectStructure = userCollection.cardCollection.reduce((acc, current) => {
        if (!acc[current.set]) { acc[current.set] = {}; }

        acc[current.set][current.number] = current.count;

        return acc;
    }, {});

    response.send(objectStructure).status(200);
}

module.exports = getCollection;
