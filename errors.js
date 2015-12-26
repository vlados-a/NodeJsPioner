var util = require('util');

function HttpError(status, message){
	this.status = status;
	this.message = message;
}
util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";

function PhraseError(message){
	this.message = message;
	//Error.captureStackTrace(this);
	Error.captureStackTrace(this, PhraseError);
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = "PhraseError";

var phrases = {
	"Hello":"Привет",
	"World":"Мир"
}

function GetPhrase(phrase){
	if(!phrases[phrase]){
		throw new PhraseError(util.format("Unknown phrase: %s", phrase));
	}
	return phrases[phrase];
}
function GetPage(url){
	if(url != 'index.html'){
		throw new HttpError(404, "Page not found");
	}
	return util.format("%s, %s", GetPhrase("Helo"), GetPhrase("World"));
}
try{
	console.log(GetPage('index.html'));
}
catch(e){
	if(e instanceof HttpError){
		console.error("Error name: %s\n%d : %s",e.name, e.status, e.message);
	}
	else if(e instanceof PhraseError){
		console.error("Error name: %s\nMessage: %s;\n Stack: %s", e.name, e.message, e.stack);
	}
}