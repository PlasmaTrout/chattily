var express = require('express');
var socket = require('socket.io');
var http = require('http');

var sockets = [];

var emit = function(type,message) {
        if(sockets){
            sockets.forEach(function(sock){
                sock.broadcast.emit(type,message);
            });
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
	sockets.push(socket);
});



socketServer.listen(8080);

console.log('Listening on port 8080, use http://localhost:8080/health to test.');