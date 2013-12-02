var mongo = require("mongodb");
var settings = require('../../settings.json');

var Server = mongo.Server,
		Db = mongo.Db,
		BSON = mongo.BSONPure;

//db.addUser({ user: 'brightchat', pwd: 'brightchat', roles: [ 'readWrite' ] })

exports.MongoAPIConnection = function() {
	
	var self = this;

	self.serverName = settings.mongo.server || "localhost";
	self.portNumber = settings.mongo.port || 27017;
	self.dbName = settings.mongo.db || "brightchat";
	self.user = settings.mongo.user || "admin";
	self.passwd = settings.mongo.pass || "admin";

	self.server = new Server(self.serverName ,self.portNumber , { auto_reconnect: true});
	self.db = new Db(self.dbName, self.server, { safe: true });

	self.db.open(function(err,db){
		if(!err){
			db.authenticate(self.user,self.passwd,{ authdb: "brightchat" },function(err,res){
				if(!err){
					console.log("Authentication to "+self.dbName+" db successfull");
				}
			});
			console.log("Connected to "+self.dbName+" database");
		}
	});

}