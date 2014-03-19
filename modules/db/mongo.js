var mongoose = require('mongoose');
var settings = require('../../settings.json');


//db.addUser({ user: 'brightchat', pwd: 'brightchat', roles: [ 'readWrite' ] })

exports.connect = function() {	
	mongoose.connect('mongodb://'+settings.mongo.server+':'+settings.mongo.port+'/'+settings.mongo.db, settings.mongo.options);
}