var socket = io.connect();

// Simple listener to test if the web socket is still alive. Very crude.
socket.on('health-check',function(data){
	console.log(data);
	alert(data);
});

socket.on("channel",function(clientObj){
	var date = new Date(clientObj.timestamp);
	$("#testResultPanel").append("<div class='"+clientObj.type+"'>"+date.toLocaleTimeString()+" "+clientObj.user+": "+clientObj.message+"</div>");
    $(".panel-body").animate({ scrollTop: $('.panel-body')[0].scrollHeight}, 100);
});

socket.on("info",function(clientObj){
	$("#testResultPanel").append("<div class='informational'>INFO: "+clientObj.message+"</div>");
    $(".panel-body").animate({ scrollTop: $('.panel-body')[0].scrollHeight}, 100);
});

// The function to execute a message or command from the client side. It is possible that this
// will be removed once a backbone implementation starts to form.
var command = function(line) {

	var cmdObj = {
		user: App.settings.user.name,
		channel: "global"
	};

	// If the incoming line is an actual command its prefixed with a /
	if (line.charAt(0) === "/") {

		// First split the spaces and then reverse so we can pop out
		// the actual command.
		var parts = line.split(' ');
		parts.reverse();

		cmdObj.command = parts.pop();
		parts.reverse();
		cmdObj.args = parts;
		

	} else {
		// Otherwise the command is just a say command to the channel
		cmdObj.command = "/say";
		cmdObj.args = line;

	}

	socket.emit("command", cmdObj);

	return false;
};
$('input[type=text]').on('keyup', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        command($('input[type=text]').val());
        $('input[type=text]').val("");
    }
});

$('#logout').on('click',function(e){
   window.location = '/logout';
});
