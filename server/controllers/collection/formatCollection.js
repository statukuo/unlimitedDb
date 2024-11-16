function formatCollection(collection) {
    const objectStructure = collection.reduce((acc, current) => {
        if (!acc[current.set]) { acc[current.set] = {}; }

        acc[current.set][current.number] = current.count;

        return acc;
    }, {});

    return {
        userCollection: objectStructure,
        owned: collection.reduce((acc, current) => acc + current.count, 0),
        ownedUnique: collection.length
    };
}

module.exports = formatCollection;
