var crypto = require('crypto'),
    mongoose = require('libs/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptedPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update('password').digest('hex');
}

schema.virtual('password')
      .set(function(value){
        this._plainPassword = value;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptedPassword(value);
      })
      .get(function(){
        return this._plainPassword;
      });

schema.methods.checkPassword = function(password){
  return this.encryptedPassword(password) == this.hashedPassword;
}

module.exports.User = mongoose.model('User', schema);
