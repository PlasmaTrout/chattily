var co = require("./clientobject");

exports.execute = function(context, callback){
	
	var ctx = new co.ClientObject(context);
	console.log(ctx);

	if(context.sockets){
			context.socket.get("nickname",function(err, name){
				var nick = "unknown";

				if(name){
					nick = name;
				}
				ctx.setMessage(nick+": "+context.args);

				context.sockets.in(context.channel).emit("channel",ctx);
			});
            
    }

    callback();

};