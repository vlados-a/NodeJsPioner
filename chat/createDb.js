var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/chat';
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  var collection = db.collection('documents');
  collection.remove({}, function(err, affected){
  	  insertDocuments(db, function(){
	  	console.log('success');
	  	collection.count(function(error, count){
	  		console.log("count: %s", count);
	  		collection.find({}).toArray(function(err, result){
	  			console.dir(result);
	  			db.close();
	  		});
	  	});
	  });
  });
});