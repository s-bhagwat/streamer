const express = require('express');
const mainController = require('../controllers/mainContoller');
const app = require('../app');

const router = express.Router();

router.get('/', mainController.getHandler);

module.exports = router;
