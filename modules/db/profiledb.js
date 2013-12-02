var mongo = require("mongodb");
var mc = require("./mongoconnection");
var http = require("http");


var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var conn = new mc.MongoAPIConnection();

exports.upsertProfile = function(ldapProfile,callback) {
	conn.db.collection('profiles',function(err,collection) {
		collection.update({ uid: ldapProfile.uid },
		{
			uid: ldapProfile.uid,
			name: ldapProfile.fullName,
			email: ldapProfile.mail
		},
		{ upsert: true }, 
		function(err,data) {
			if(err) {
				callback(false);
			}else{
				callback(true);
			}
		});
	});
}

exports.getProfile = function(uid,callback){
	conn.db.collection('profiles',function(err,collection) {
		collection.findOne({ uid: uid },function(err,item){
			callback(item);
		});
	});
}
