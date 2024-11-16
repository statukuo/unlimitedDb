import axios from '../utils/axios';

export async function getUserDecks() {
    return (await axios.get('/decks/user')).data;
}

export async function uploadDeck(deckListJSON) {
    return (await axios.post('/decks', { deck: JSON.parse(deckListJSON) })).data;
}
