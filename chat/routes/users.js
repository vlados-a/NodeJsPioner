var express = require('express');
var router = express.Router();

var HttpError = require('../error').HttpError,
    user = require('models/user').User,
    ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/', function(req, res, next) {
  user.find({}, function(err, data){
    if(err) next(err);
    res.json(data);
  });
});

router.get('/:id', function(req, res, next){
  try{
    var id = new ObjectId(req.params.id);
  }
  catch(e){
    next(new HttpError(404, 'Incorrect user id'));
  }
  user.findById(id, function(err, data){
    if(err) next(err);
    else{
      if(!data){
        next(new HttpError(404, 'User not found'));
      }
      else{
        res.json(data);
      }
    }
  });
});
module.exports = router;
