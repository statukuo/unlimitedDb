const Account = require("../../models/Account");

async function getCollection(request, response) {
    const userCollection = await Account.findOne({ "_id": request.auth.uid }, { cardCollection: 1 });
    response.send(userCollection).status(200);
}

module.exports = getCollection;
