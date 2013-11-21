var express = require('express');
var app = express();

app.get('/health', function(req, res){
  var body = 'ok';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(8080);
console.log('Listening on port 8080, use http://localhost:8080/health to test.');