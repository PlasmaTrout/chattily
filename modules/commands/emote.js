
exports.execute = function(user, args, context, callback){
	
	if(context.sockets){
            context.sockets.forEach(function(sock){
                sock.broadcast.emit("channel",user+" "+args.join(' '));
            });
    }

    callback();

};