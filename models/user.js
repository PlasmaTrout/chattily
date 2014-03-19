var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	name: {
		first: { type: String },
		last: { type: String }
	},
	profile: {
		bio: { type: String },
	    facebook: { type: String },
	    googlePlus: { type: String }
	},
	joined: { type: 'Date', default: Date.now },
	lastOnline: { type: 'Date'},
	avatar: String,
},{strict: true});

var User = mongoose.model('User', userSchema);

User.register = function(options, callback){
	var u = new User();
	u.username = options.username;
	u.password = options.password;
	u.email = options.email;
	u.name = {};
	u.profile = {};
	u.profile.bio = '';
	u.profile.facebook = '';
	u.profile.googlePlus = '';
	u.name.first = options.firstName;
	u.name.last = options.lastName;
	u.markModified("u.name");
	var saved_user = u;
	u.save(function(err){
		if(err){ 
			console.log(err);
			callback(err, null);
		} else {
			callback(null, saved_user);
		}
		
	});
};

User.login = function(user, pass, callback){
	User.findOne({username: user, password: pass}, function(err, user){
		if(err) console.log(err);
		callback(err, user);
	})
};

module.exports = User;