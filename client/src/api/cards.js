import axios from '../utils/axios';

export async function getAllCards(filters) {
    return (await axios.get('/cards', { params: { filters } })).data;
}
export async function getAllFilters() {
    return (await axios.get('/cards/filters')).data;
}
