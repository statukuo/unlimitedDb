const express = require('express');
const getCollection = require('../controllers/collection/getCollection');
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken');

// initialize router
const router = express.Router();

router.get('/', [authorizeBearerToken], getCollection);

module.exports = router;
