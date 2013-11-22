var co = require("./clientobject");

exports.execute = function(context, callback){

	var ctx = new co.ClientObject(context);

	if(context.sockets){
			ctx.setMessage(context.args.join(' '));
			ctx.type="emote";
			context.sockets.in(context.channel).emit("channel",ctx);
    }

    callback();

};