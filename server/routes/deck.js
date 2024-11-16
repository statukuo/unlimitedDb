const express = require('express');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');
const getUserDecks = require('../controllers/deck/getUserDecks');
const uploadDeck = require('../controllers/deck/uploadDeck');

// initialize router
const router = express.Router();

router.get('/user', [authorizeBearerToken], getUserDecks);
router.post('/', [authorizeBearerToken], uploadDeck);

module.exports = router;
