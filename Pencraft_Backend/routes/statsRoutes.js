const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/:authorId', statsController.getStatsByAuthorId);

module.exports = router;
