var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

server.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port 3000!');
});

app.use(express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
