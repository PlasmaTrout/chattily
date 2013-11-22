/*
This example shows how to implement a command into the chat system
*/
exports.execute = function(context, callback){
	
	if(context.sockets){
			context.socket.get("nickname",function(err, name){
				var nick = "unknown";

				if(name){
					nick = name;
				}

				context.sockets.in(context.channel).emit("channel",nick+": "+context.args);
			});
            
    }

    callback();

};