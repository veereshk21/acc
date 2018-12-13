/**
 * Created by Gautam on 6/28/18.
 */

const workerFarm = require('worker-farm');
const Promise = require('bluebird');
const chalk = require('chalk');
const shelljs = require('shelljs');
const path = require('path');

Promise.config({
  longStackTraces: true
});
const path_rimrf = path.resolve(process.cwd(), 'node_modules/.bin/rimraf');
const removeDir = 'build/reactive';

function run(pathArr, options, callback) {
  const workers = workerFarm(options, require.resolve('./webpackPromise'));

  const shutdownCallback = function() {
    console.log(chalk.red('[WEBPACK]') + ' Forcefully shutting down');
    workerFarm.end(workers);
    process.exit(0);
  };

  process.on('SIGINT', shutdownCallback);

  console.log('%s Building %s %s', chalk.blue('[WEBPACK]'), chalk.yellow(pathArr.length), (pathArr.length>1 ? 'targets in parallel': 'target'));

  const startTime = Date.now();

  const builds = pathArr.map((moduleName, i) => {

    return Promise.promisify(workers)(moduleName);
  });

  Promise.settle(builds).then(function (results) {
    return Promise.all(results.map(function (result) {
      if (result.isFulfilled()) {
        return result.value();
      }
      return Promise.reject(result.reason());
    }));
  }).error(function (err) {
    return Promise.reject(err);
  }).then(function (results) {
    console.log('%s Finished build after %s seconds', chalk.blue('[WEBPACK]'), chalk.blue((Date.now() - startTime) / 1000));
    results = results.filter(function (result) {
      return result;
    });
    if (results.length) {
      shelljs.rm('-rf', removeDir);
      return results;
    }
  }).catch((err)=>{
    console.log('%s Build failed after %s seconds', chalk.red('[WEBPACK]'), chalk.blue((Date.now() - startTime) / 1000));
    console.log(err);
  }).finally(function () {
    workerFarm.end(workers);
    process.removeListener('SIGINT', shutdownCallback);
  }).asCallback(callback);

}


module.exports = {
  run: run
};
