var mongoose = require('mongoose');
var settings = require('../../settings.json');

exports.connect = function() {
	if(process.env.MONGO_INTERNAL_ADDR){
		settings.mongo.server = process.env.MONGO_INTERNAL_ADDR;
	}	
	mongoose.connect('mongodb://'+settings.mongo.server+':'+settings.mongo.port+'/'+settings.mongo.db, settings.mongo.options);
}