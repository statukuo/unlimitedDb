const express = require('express');
const getAll = require('../controllers/cards/getAll');
const getFilters = require('../controllers/cards/getFilters');

// initialize router
const router = express.Router();

router.get('/', [], getAll);
router.get('/filters', [], getFilters);

module.exports = router;
