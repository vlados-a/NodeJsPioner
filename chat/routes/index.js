var express = require('express');
var router = express.Router();

var checkAuth = require('middleware/checkAuth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.get('/chat', checkAuth, require('./chat').get);
router.get('/frontpage', require('./frontpage').get);

router.post('/logout', require('./logout').post);

module.exports = router;
