import { SET_ORDER } from '../constants';
import axios from '../utils/axios';

export async function getAllCards(filters) {
    return (await axios.get('/cards', { params: { filters } })).data.sort((a, b) => SET_ORDER[a.set] - SET_ORDER[b.set]);
}
export async function getAllFilters() {
    return (await axios.get('/cards/filters')).data;
}
