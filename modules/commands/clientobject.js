
exports.ClientObject = function(context){

	var type = context.command || "say";
	var msg = "";
	var user = context.user;
	var room = context.channel;
	var timestamp = context.timestamp;

	return {
		user: user,
		type: type,
		room: room,
		message: msg,
		timestamp: timestamp,
		setMessage: function(message){
			this.message = message;
		}
	};

};