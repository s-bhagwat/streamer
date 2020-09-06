const express = require('express');
const chooseFileController = require('../controllers/chooseFileController');
const app = require('../app');

const router = express.Router();
router.use(chooseFileController.torrentStarter);

router.post('/', chooseFileController.postHandler);

module.exports = router;
