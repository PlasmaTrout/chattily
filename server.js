
var settings = require('./settings.json');
var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var socket = require('socket.io');
var cm = require('./api/channels');
var rauth = require('./api/auth');
var channels = require('./api/channels');
var users = require('./modules/collections/users');
var exec = require('child_process').exec;
var db = require('./modules/db/mongo.js');
var app = express();

var emit = function(room,type,message) {
        var to = room || "global";
        if(io.sockets){
            io.sockets.in(to).emit(type,message);
        }   
}; 

//Get the current git revision number used for forcing clients to reload if different.
var commit_command = 'git rev-parse HEAD';
exec(commit_command, function(error, stdout, stderr){
    console.log("revision is: "+stdout);
    settings.revision = stdout;
});


app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname,'public')));

var socketServer = http.createServer(app);
var io = require('socket.io').listen(socketServer);

io.sockets.on('connection',function(socket){

    socket.on('auth', function(data){

        if(!data.user || !data.pass){
            socket.emit("rejected due to missing credentials");
        }

        rauth.socketAuthentication(data.user, data.pass, function(ret){
            
            if(ret.success && ret.user._id){
                console.log(ret.user._id+" has successfully logged on!");
                users.addUser(data.user, socket.id);
                socket.set("username", ret.user.username, function(){
                    socket.set("email", ret.user.email, function(){});
					socket.set("_id", ret.user._id, function(){});
                    socket.join('global');
                    io.sockets.in("global").emit("info",ret.user.username+" connected!");
                    socket.join(ret.user.username);
                });
            } else {
                socket.emit("rejected due auth failure");
            }
        });

    });

    socket.on('disconnect', function() {
        socket.get("username",function(err,data){
            io.sockets.in("global").emit("info",data+" disconnected!");
            socket.leave('global');
        });
        delete io.sockets[socket.id];
    });


	// On a command, lookup the appropriate module and call execute on it. The
	// arguments for execute should always be the same.
	socket.on('command', function (data) {
		try {
        // Remember the command already has an / in it
    		var cmd = require('./modules/commands'+data.command.toLowerCase());
    		var context = {
	    		sockets: io.sockets,
                command: data.command,
                user: data.user,
                args: data.args,
                channel: data.channel,
                socket: socket, 
                timestamp: new Date().toJSON()
	    	};

	    	cmd.execute(context,function(data){
	    		
	    	});

    	} catch(e) {
    		console.log("Command not found: "+e);
    		socket.emit("global","info","Command not found");
    	}

    
  	});

    socket.on('join', function(data){
        socket.join(data.room);
        socket.broadcast.in(data.room).emit("joined", socket.store.data.username);
    });
    socket.on('leave', function(data){
        socket.leave(data.room);
        socket.broadcast.in(data.room).emit("left", socket.store.data.username);
    });
});

// HTTP Definitions
// TODO: Refactor these somewhere more elegant
/*
app.get('/rooms/list', function(req,res){
  cm.getActiveRooms(req,res,io.sockets);
});
*/
app.get("/rooms/:room", function(req,res){
  channels.getSocketsInRoom(req,res,io.sockets);
});
/*
app.get("/rooms/:channel/:limit",function(req,res){
    history.getLastMessages(req,res);
});

app.get("/rooms/:channel/:uid/:limit",function(req,res){
    history.getLastMessages(req,res);
});

app.get("/locations/:year/:month/:day",function(req,res){
    profile.getLocationReport(req,res);
});
*/
app.post("/users/authenticate",rauth.authenticateUser);

app.post("/users/register",rauth.registerUser);

app.get('/health', function(req, res){
  var body = 'ok';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  emit('health-check',{success: true});
  res.end(body);
});

app.get('/login', function(req,res){
    res.sendfile('./views/login.html');
});

app.get('/register', function(req,res){
    res.sendfile('./views/register.html');
});

app.get('/logout', function(req,res){
    res.clearCookie('sec',null);
    res.redirect('/login');
});

app.get('/', function(req, res){
    if(req.cookies){
        if(req.cookies.sec){
            res.sendfile('./views/index.html');
        } else {
            res.redirect('/login');
        }
    }

});

app.get('/revision', function(req, res){
    console.log(settings.revision);
   res.end(settings.revision);
});

var port = settings.port;
if(process.argv[2]){
    port = process.argv[2];
}
db.connect();
// Clears out all db data rooms before the server starts
socketServer.listen(port);

console.log('Listening on port '+port+', use http://localhost:'+port+'/health to test.');
