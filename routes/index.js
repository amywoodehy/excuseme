var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// adding to router my application. Is it right?
var excuses = require('./excuse');
router.use('/exc', excuses);

module.exports = router;
