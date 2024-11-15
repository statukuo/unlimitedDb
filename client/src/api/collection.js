import axios from '../utils/axios';

export async function getUserCollection() {
    return (await axios.get('/collection')).data;
}

export async function updateUserCollection(collectionData) {
    return (await axios.post('/collection', collectionData));
}
