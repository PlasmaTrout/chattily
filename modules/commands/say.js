/*
This example shows how to implement a command into the chat system
*/
exports.execute = function(user, args, context, callback){
	
	if(context.sockets){
            context.sockets.forEach(function(sock){
                sock.broadcast.emit("channel",user+": "+args);
            });
    }

    callback();

};