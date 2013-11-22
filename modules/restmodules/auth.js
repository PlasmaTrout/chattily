var settings = require('../../settings.json');
var ldauth = require('../../modules/authentication/ldap');

exports.authenticateUser = function(req,res) {

    var returnObj = { success: false };

	var headers = req.headers;
	console.log(headers);
	var auth = new ldauth();
	var unencodedPass = new Buffer(headers.pass,'base64').toString('utf-8');
	console.log(unencodedPass);

	auth.login(headers.user,unencodedPass, function(err, user){
    	if(err){
            returnObj.errors=err;
    		console.log("Error: "+err);
    	}
    	if(user){
            returnObj.success=true;
    		returnObj.user=user;
    	}
        res.send(returnObj);
    	auth.close();
	});
};