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
			location: "work",
			locationUpdated: new Date()
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
			var members = {
				users: items
			};
			res.send(members);
		});
	});
}

exports.getLocationReport = function(req,res) {
	var year = req.params.year;
	var month = req.params.month;
	var day = req.params.day;
	var search = new Date(year, day, month);

	conn.db.collection('profiles',function(err,collection) {
		collection.find({ locationUpdated: { $gte: search } }).toArray(function(err,items){
			var members = {
				start: search,
				users: items
			};
			res.send(members);
		});
	});
}

exports.removeMembershipFromRoom = function(room,uid) {
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

exports.clearAllMemberships = function() {
	console.log("clearing out all memberships");
	conn.db.collection('profiles',function(err,collection){
		collection.update({ },{ $set: { rooms: [] } },function(err,data){
			
		});
	});
}

exports.removeMembershipsForUser = function(uid) {
	console.log("clearing out "+uid+"'s memberships");
	conn.db.collection('profiles',function(err,collection){
		collection.update({ uid: uid },{ $set: { rooms: [] } },function(err,data){
			
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
