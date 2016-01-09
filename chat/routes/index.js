var express = require('express');
var router = express.Router();

var HttpError = require('../error').HttpError,
    user = require('models/user').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/usersInfo', function(req,res,next){
  user.find({}, function(err, data){
    if(err) next(err);
    res.json(data);
  });
});
router.get('/usersInfo/:id', function(req, res, next){
  user.findById(req.params.id, function(err, data){
    if(err) next(err);
    if(!data){
      next(new HttpError(404, 'User not found'));
    }
    else{
      res.json(data);
    }
  });
});

module.exports = router;
