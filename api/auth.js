var settings = require('../settings.json');
var user = require('../models/user.js');
var base64_utils = require('../utils/base64');
var base64 = new base64_utils();

exports.authenticateUser = function(req,res) {
    var returnObj = { success: false };
	var headers = req.headers;
	//console.log(headers);
	user.login(headers.user,headers.pass, function(err, u){
    	if(err){
			console.log("Error: "+err);
            returnObj.success = false;
            returnObj.errors = { message: 'Could not save the users profile to the local mongo store, proceed at own risk' };
            res.send(returnObj);
    		
    	}
    	if(u){
            console.log(u);
            returnObj.success = true;
            returnObj.user = u;
            res.send(returnObj);
		}
                
    	
	});
};

exports.registerUser = function(req, res){
	var options = {
		"firstName": req.headers.firstname,
		"lastName": req.headers.lastname,
		"username": req.headers.user,
		"password": req.headers.pass,
		"email": req.headers.email
	};
	var returnObj = { success: false };
	user.findOne({username: options.username}, "username", function(err, item){
		if(err){
			console.log(err);
		} else {
			if(item){
				returnObj.success = false;
				returnObj.errors = { message: 'Username exists!' };
				res.send(returnObj);
				return;
			} else {
				user.findOne({email: options.email}, "email", function(err, item){
					if(err){
						console.log(err);
					} else {
						if(item){
							returnObj.success = false;
							returnObj.errors = { message: 'Email address already in use' };
							res.send(returnObj);
							return;
						} else {
							user.register(options, function(err, u){
								if(err){
									console.log("Error: "+err);
						            returnObj.success = false;
						            returnObj.errors = { message: 'Could not register user!' };
						            res.send(returnObj);

						    	}
						    	if(u){
						            console.log(u);
						            returnObj.success = true;
						            returnObj.user = u;
						            res.send(returnObj);
								}
							});
						}
					}
				});
			}
		}
	});
};

exports.socketAuthentication = function(username, pass, fn){
	console.log(username);
	console.log(pass);
    user.login(username, decodeURIComponent(pass), function(err, u){
        var retObj = {};
        retObj.success = false;
        if(err){
            retObj.success = false;
            retObj.errors = { message: 'Could not save the users profile to the local mongo store, proceed at own risk' };
			retObj.error = err;
			fn(retObj);
			return;
        }
        if(u){
			retObj.user = u;
			retObj.success = true;
			fn(retObj);
            return;
        }
    });
}