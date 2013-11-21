var socket = io.connect();

// Simple listener to test if the web socket is still alive. Very crude.
socket.on('health-check',function(data){
	console.log(data);
	alert(data);
});

socket.on("channel",function(data){
	$("#testResultPanel").append("<p>"+data+"</p>");
});

// The function to execute a message or command from the client side. It is possible that this
// will be removed once a backbone implementation starts to form.
var command = function(line) {

	var cmdObj = {};

	// If the incoming line is an actual command its prefixed with a /
	if (line.charAt(0) === "/") {

		// First split the spaces and then reverse so we can pop out
		// the actual command.
		var parts = line.split(' ');
		parts.reverse();

		cmdObj.command = parts.pop();
		cmdObj.args = parts;

	} else {
		// Otherwise the command is just a say command to the channel
		cmdObj.command = "say";
		cmdObj.args = line;
	}

	socket.emit("command", cmdObj);

	return false;
}
