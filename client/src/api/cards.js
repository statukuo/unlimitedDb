import axios from '../utils/axios';

export async function getAllCards() {
    return (await axios.get('/cards')).data;
}
