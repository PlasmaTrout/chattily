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
			email: ldapProfile.mail,
			location: "work"
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

exports.addMembershipToRoom = function(room,uid) {
	console.log("adding "+room+" to "+uid);
	conn.db.collection('profiles',function(err,collection){
		collection.update({ uid: uid },{ $addToSet: { rooms: room } },function(err,data){
		});
	});
}

exports.getRoomMembers = function(req,res) {
	var room = req.params.room;

	conn.db.collection('profiles',function(err,collection) {
		collection.find({ rooms: room }).toArray(function(err,items){
			res.send(items);
		});
	});
}

exports.removeMembershipFromRoom = function(room,uuid) {
	conn.db.collection('profiles',function(err,collection){
		collection.update({ uid: uid },{ $pull: { rooms: room } },function(err,data){
			if(err) {
				callback(false);
			}else{
				callback(true);
			}
		});
	});
}

exports.setLocation = function(location,uid,callback) {
	conn.db.collection('profiles',function(err,collection){
		collection.update({ uid: uid },{ $set: { location: location } },function(err,data){
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
