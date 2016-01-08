var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
console.log(kitty);
kitty.save(function (err, kitty, affected) {
  if (err) console.log('meow((');
  else console.log('meow))');
  console.log(arguments);
});