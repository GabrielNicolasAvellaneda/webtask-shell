var shelljs = require('shelljs/global');

module.exports = 
  function (context, cb) {
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
      console.log('exec: ', cmd);
      output = exec(cmd, {silent:true}).output;
      console.log('result: ', output);
    }

    var result = {output: output, cwd: pwd()});
    cb(null, result);
  };
