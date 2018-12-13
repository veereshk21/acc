const exec = require('child_process').exec;
exec('npm -v', function (err, stdout, stderr) {
  if (err) throw err;
  if (parseFloat(stdout) < 3) {
    throw new Error('ERROR: You need npm version @>=3');
    process.exit(1);
  }else{
    console.log("Your npm is up to date.");
  }
});
