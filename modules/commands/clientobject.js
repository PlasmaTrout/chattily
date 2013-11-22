
exports.ClientObject = function(context){

	var type = context.command || "say";
	var msg = "";
	var user = context.user;
	var room = context.channel;

	return {
		user: user,
		type: type,
		user: user,
		room: room,
		message: msg,
		setMessage: function(message){
			this.message = message;
		}
	};

};