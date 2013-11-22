var co = require("./clientobject");

exports.execute = function(context, callback){

	var ctx = new co.ClientObject(context);

	if(context.sockets){
		context.socket.get("nickname",function(err, name){
			var nick = name || "unknown user";
			ctx.setMessage(nick+" "+context.args.join(' '));
			context.sockets.in(context.channel).emit("channel",ctx);
		});

    }

    callback();

};