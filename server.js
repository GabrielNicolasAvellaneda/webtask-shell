var express = require('express');
var bodyParser = require('body-parser');
var shelljs = require('shelljs/global');

var app = express();

app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
	res.send('Hello, world');
});

app.post('/', function (req, res) {
	var cmd = req.body.cmd;
	var cwd = req.body.cwd;
	if (!cmd) {
		res.end();
		return;
	}

	if (cwd != null) {
		cd(cwd);
	}

	var output = '';
	if (cmd.match(/cd /)) {
		var args = cmd.split(' ');
		cd(args[1]);
	} else {
		console.log('Running command: ', cmd);
		output = exec(cmd, {silent:true}).output;
		console.log('Output: ', output);
	}

	res.json({output: output, cwd: pwd()});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on %s:%d', host, port);
});
