var express = require('express');
var socket = require('socket.io');
var http = require('http');

var sockets = [];

var emit = function(room,type,message) {
        var to = room || "global";
        if(io.sockets){
            io.sockets.in(to).emit(type,message);
        }   
}; 

var app = express();
var path = require('path');
var socket = require('socket.io');
var http = require('http');

app.use(express.bodyParser());
app.use(express.static(path.join(__dirname,'public')));

app.get('/health', function(req, res){
  var body = 'ok';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  emit('health-check',{success: true});
  res.end(body);
});

var socketServer = http.createServer(app);
var io = require('socket.io').listen(socketServer);

io.sockets.on('connection',function(socket){
	
  //console.log(socket);
  socket.join('global');

	// On a command, lookup the appropriate module and call execute on it. The
	// arguments for execute should always be the same.
	socket.on('command', function (data) {
		try {
        // Remember the command already has an / in it
    		var cmd = require('./modules/commands'+data.command.toLowerCase());
    		var context = {
	    		sockets: io.sockets,
          user: data.user,
          args: data.args,
          channel: data.channel
	    	};

	    	cmd.execute(context,function(data){
	    		console.log(data);
	    	});

    	} catch(e) {
    		console.log("Command not founnd: "+e);
    		emit("global","info","Command not found");
    	}

    
  	});
});



socketServer.listen(8080);

console.log('Listening on port 8080, use http://localhost:8080/health to test.');