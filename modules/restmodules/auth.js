var settings = require('../../settings.json');
var ldauth = require('../../modules/authentication/ldap');

exports.authenticateUser = function(req,res) {

	var headers = req.headers;
	console.log(headers);
	var auth = new ldauth();
	var unencodedPass = new Buffer(headers.pass,'base64').toString('utf-8');
	console.log(unencodedPass);

	auth.login(headers.user,unencodedPass, function(err, user){
    	if(err){
    		console.log("Error: "+err);
    		res.send(err);
    	}
    	if(user){
    		console.log(user);
    		res.send(user);
    	}
    	auth.close();
	});
};