var User = require('models/user').User;

var vlad = new User({
  username: 'Vlad',
  password: 'secret'
});

vlad.save(function(err, effected){
  if(!err) console.log('success');

  console.log(effected);
});
