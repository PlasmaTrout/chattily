var co = require("./clientobject");
var profile = require("../db/profiledb")

exports.execute = function(context, callback){

	var ctx = new co.ClientObject(context);

	profile.setLocation(context.args[0],context.user,function(success){
		if(success){
			if(context.sockets){
			 	ctx.setMessage("set his location to "+context.args.join(' '));
				ctx.type="emote";
				context.sockets.in(context.channel).emit("channel",ctx);
    		}
		}
	});

    callback();

};