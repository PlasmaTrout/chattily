
var settings = require('./settings.json');
var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var socket = require('socket.io');
var cm = require('./modules/restmodules/channels');
var rauth = require('./modules/restmodules/auth');
var users = require('./modules/collections/users');
var history = require('./modules/db/chathistory');
var profile = require('./modules/db/profiledb');
var app = express();

var emit = function(room,type,message) {
        var to = room || "global";
        if(io.sockets){
            io.sockets.in(to).emit(type,message);
        }   
}; 

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
            
            if(ret.success && ret.user.uid){
                console.log(ret.user.uid+" has successfully logged on!");
                users.addUser(data.user, socket.id);
                profile.addMembershipToRoom("global",ret.user.uid);

                socket.set("username", data.user, function(){
                    socket.set("email", data.email, function(){});
                    socket.join('global');
                    socket.join(data.user);
                });
            } else {
                socket.emit("rejected due auth failure");
            }
        });

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
	    		history.saveMessageNoCallback(context);
	    	});

    	} catch(e) {
    		console.log("Command not found: "+e);
    		socket.emit("global","info","Command not found");
    	}

    
  	});
    socket.on('join', function(data){
        socket.join(data.room);
        socket.broadcast.to(data.room).emit("joined", socket.store.data.nickname);
    });
    socket.on('leave', function(data){
        socket.leave(data.room);
        socket.broadcast.to(data.room).emit("left", socket.store.data.nickname);
    });
});

// HTTP Definitions
// TODO: Refactor these somewhere more elegant

app.get('/rooms/list', function(req,res){
  cm.getActiveRooms(req,res,io.sockets);
});

app.get("/rooms/:room", function(req,res){
  profile.getRoomMembers(req,res);
});

app.post("/users/authenticate",rauth.authenticateUser);

app.get('/health', function(req, res){
  var body = 'ok';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  emit('health-check',{success: true});
  res.end(body);
});

app.get('/login', function(req,res){
    res.sendfile('./modules/views/login.html');
});

app.get('/logout', function(req,res){
    res.clearCookie('sec',null);
    res.redirect('/login');
});

app.get('/', function(req, res){
    if(req.cookies){
        if(req.cookies.sec){
            res.sendfile('./modules/views/index.html');
        } else {
            res.redirect('/login');
        }
    }

});

var port = settings.port;
if(process.argv[2]){
    port = process.argv[2];
}
socketServer.listen(port);

console.log('Listening on port '+port+', use http://localhost:'+port+'/health to test.');