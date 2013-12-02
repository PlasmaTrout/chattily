var mongo = require("mongodb");
var mc = require("./mongoconnection");
var http = require("http");


var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var conn = new mc.MongoAPIConnection();

exports.saveMessageNoCallback = function(context){
	conn.db.collection(context.channel,function(err,collection) {
		collection.save({
			uid: context.user,
			time: context.timestamp,
			command: context.command,
			args: context.args
		},function(err){

		});
	});
};