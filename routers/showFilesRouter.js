const express = require('express');
const showFileController = require('../controllers/showFileController');
const app = require('../app');

const router = express.Router();

router.use(showFileController.getTorrentList);
router.post('/', showFileController.postHandler);
module.exports = router;
