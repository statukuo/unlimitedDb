import axios from '../utils/axios';

export async function getDeck(deckId) {
    return (await axios.get('/decks/' + deckId)).data;
}

export async function getUserDecks() {
    return (await axios.get('/decks/user')).data;
}

export async function getLatestDecks() {
    return (await axios.get('/decks/latest')).data;
}

export async function uploadDeck(deckListJSON, isPrivate) {
    return (await axios.post('/decks', { deck: JSON.parse(deckListJSON), isPrivate })).data;
}

export async function deleteDeck(deckId) {
    return (await axios.delete('/decks/' + deckId)).data;
}
