var express = require('express');
var shelljs = require('shelljs/global');

var app = express();

app.get('/', function (req, res) {

	res.send('Hello, world');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on %s:%d', host, port);
});
