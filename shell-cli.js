var readline = require('readline');
var colors = require('colors');
var request = require('request');
var fs = require('fs');

var _exec = function (url) {
	return function (cmd, cwd, callback) {
		request.post({url:url, form: {cmd: cmd, cwd: cwd}}, callback);
	};
};

var exec = _exec(process.argv[2]);

exec('pwd', null, function (err, res, body) {
	if (err) 
		throw err;
	var result = JSON.parse(body);
	var cwd = result.cwd;	
	var rl = readline.createInterface(process.stdin, process.stdout);
	var prefix = cwd + '$ '; 
	rl.on('line', function (line) {
		line = line.trim();
		exec(line, cwd, function (err, res, body) {
			result = JSON.parse(body);
			cwd = result.cwd;
			console.log(result.output);
			prefix = cwd + '$ '; 
			rl.setPrompt(prefix.green, prefix.length);
			rl.prompt();
		});
}).on('close', function () {
		process.exit(0);
	});
	rl.setPrompt(prefix.green, prefix.length);
	rl.prompt();
});

