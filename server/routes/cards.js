const express = require('express');
const getAll = require('../controllers/cards/getAll');

// initialize router
const router = express.Router();

router.get('/', [], getAll);

module.exports = router;
