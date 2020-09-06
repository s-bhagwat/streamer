const express = require('express');
const showDetailController = require('../controllers/showDetailController');

const router = express.Router();

router.use(showDetailController.getTorrentDetails);
router.route('/:num').get(showDetailController.getHandler);

module.exports = router;
