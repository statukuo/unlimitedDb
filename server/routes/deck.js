const express = require('express');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');
const getUserDecks = require('../controllers/deck/getUserDecks');
const uploadDeck = require('../controllers/deck/uploadDeck');
const getDeck = require('../controllers/deck/getDeck');
const getLatestDecks = require('../controllers/deck/getLatestDecks');
const deleteDeck = require('../controllers/deck/deleteDeck');

// initialize router
const router = express.Router();

router.get('/user', [authorizeBearerToken], getUserDecks);
router.post('/', [authorizeBearerToken], uploadDeck);
router.get('/latest', [], getLatestDecks);
router.get('/:deckId', [], getDeck);
router.delete('/:deckId', [], deleteDeck);

module.exports = router;
