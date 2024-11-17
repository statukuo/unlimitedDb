import axios from '../utils/axios';

export async function getDeck(deckId) {
    return (await axios.get('/decks/' + deckId)).data;
}

export async function getUserDecks() {
    return (await axios.get('/decks/user')).data;
}

export async function uploadDeck(deckListJSON) {
    return (await axios.post('/decks', { deck: JSON.parse(deckListJSON) })).data;
}
