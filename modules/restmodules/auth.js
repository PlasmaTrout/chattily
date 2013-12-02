var settings = require('../../settings.json');
var ldauth = require('../../modules/authentication/ldap');
var base64_utils = require('../../modules/utils/base64');
var base64 = new base64_utils();

exports.authenticateUser = function(req,res) {

    var returnObj = { success: false };

	var headers = req.headers;
	//console.log(headers);
	var auth = new ldauth();
	var unencodedPass = new Buffer(headers.pass,'base64').toString('utf-8');

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

exports.socketAuthentication = function(user, pass, fn){
    var unencodedPass = decodeURIComponent(base64.decode(pass));
    var auth = new ldauth();
    auth.login(user, unencodedPass, function(err, user){
        var retObj = {};
        retObj.success = false;
        if(err){
            retObj.error = err;
        }
        if(user){
            retObj.user = user;
            retObj.success = true;
        }
        auth.close();
        fn(retObj);
    });
}