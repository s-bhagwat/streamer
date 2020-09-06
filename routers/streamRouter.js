const express = require('express');
const streamController = require('../controllers/streamController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  res.locals.id = val;
  next();
});
router.route('/:id').get(streamController.getHandler);

router.route('/play/:id').get(streamController.stream);
module.exports = router;
