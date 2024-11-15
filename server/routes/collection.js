const express = require('express');
const getCollection = require('../controllers/collection/getCollection');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');
const updateCollection = require('../controllers/collection/updateCollection');

// initialize router
const router = express.Router();

router.get('/', [authorizeBearerToken], getCollection);
router.post('/', [authorizeBearerToken], updateCollection);

module.exports = router;
