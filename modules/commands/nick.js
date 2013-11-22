/*
This example shows how to implement a command into the chat system
*/
exports.execute = function(context, callback){
	
	context.socket.set("nickname",context.args[0],function(){
		if(context.sockets){
            context.sockets.in(context.channel).emit("info",context.user+" changed nickname to "+context.args[0]);
    	}
    	callback();
	});

	

};