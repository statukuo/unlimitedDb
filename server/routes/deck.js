const express = require('express');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');
const getUserDecks = require('../controllers/deck/getUserDecks');
const uploadDeck = require('../controllers/deck/uploadDeck');
const getDeck = require('../controllers/deck/getDeck');

// initialize router
const router = express.Router();

router.get('/user', [authorizeBearerToken], getUserDecks);
router.post('/', [authorizeBearerToken], uploadDeck);
router.get('/:deckId', [], getDeck);

module.exports = router;
