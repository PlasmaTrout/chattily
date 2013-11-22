/*
This example shows how to implement a command into the chat system
*/
exports.execute = function(context, callback){
	
	if(context.sockets){
            context.sockets.in(context.channel).emit("channel",context.user+": "+context.args);
    }

    callback();

};