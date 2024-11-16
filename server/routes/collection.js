const express = require('express');
const getCollection = require('../controllers/collection/getCollection');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');
const updateCollection = require('../controllers/collection/updateCollection');
const updateCollectionBatch = require('../controllers/collection/updateCollectionBatch');

// initialize router
const router = express.Router();

router.get('/', [authorizeBearerToken], getCollection);
router.post('/', [authorizeBearerToken], updateCollection);
router.post('/batch', [authorizeBearerToken], updateCollectionBatch);

module.exports = router;
