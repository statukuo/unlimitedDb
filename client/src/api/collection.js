import axios from '../utils/axios';

export async function getUserCollection() {


    return (await axios.get('/collection')).data;
}
