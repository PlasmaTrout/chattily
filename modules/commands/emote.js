
exports.execute = function(context, callback){
	
	if(context.sockets){
        context.sockets.in(context.channel).emit("channel",context.user+" "+context.args.join(' '));
    }

    callback();

};