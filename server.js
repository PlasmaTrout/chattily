var express = require('express');
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
  res.end(body);
});

app.listen(8080);
console.log('Listening on port 8080, use http://localhost:8080/health to test.');