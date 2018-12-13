/**
 * Created by mambig on 1/14/17.
 */
const path = require('path');
const program = require('commander');
const featurePath = require('./webpack.paths');
const lodash = require('lodash');
const shelljs = require('shelljs');
const chalk = require('chalk');
const buildDir = './build';
const cpus = require('os').cpus();
const webpackWorker = require("./parallel/webpackWorker");

program
  .description('Independent page bundling system.')
  .option('-p, --pages', 'See available modules to build.')
  .option('-b, --build <items>', 'Pass a single or list of module names to build."', pageArray)
  .option('-b all, --build all', 'Bundle all modules."', pageArray)
  .parse(process.argv);

function pageArray(val) {
  return val.split(',');
}

if (program.pages) {
  console.log(chalk.yellow('Pass a single or list of page names to build. e.g. "npm run bundle:prod:page gridwall,pdp" "npm run bundle:dev:page gridwall,pdp"'));
  console.log('');
  console.log(chalk.yellow("Below are the list of pages available to build,"));
  lodash.keysIn(featurePath).forEach(function (val, id) {
    console.log(' - ' + chalk.blue(val));
  })
}


if (program.build) {
  buildPage(program.build);
}

function log(string) {
  process.stdout.write(string);
}

function buildPage(pages) {
  const cwd = process.cwd();
  const path_rimrf = path.resolve(cwd, 'node_modules/.bin/rimraf');
  let path_build = [];
  let splitPaths = String(pages).split(",");


  if (splitPaths.length > 0) {

    splitPaths.forEach(function (pageName, id) {
      if (featurePath[pageName] !== undefined) {
        path_build.push(path.resolve(cwd, `${buildDir}/${pageName}`));
      } else if (pageName === 'all') {
        path_build.push(path.resolve(cwd, `${buildDir}`));
      } else {
        log(chalk.red('\nERROR\n' + 'One of the pages name did not match with configured webpach path.\n'));
        console.log(' - ' + path.resolve(cwd, `${buildDir}/${pageName} `));
      }
    });
  } else {
    return console.log('Pass a valid command.');
  }

  if (path_build.length > 0) shelljs.exec(`${path_rimrf} ` + path_build.join(" "), (code, stdout, stderr) => {
      if (stderr) log(chalk.red('\nERROR\n' + stderr));


      if (String(pages) === 'all') {
        splitPaths.pop();
        for (let i in featurePath) {
          splitPaths.push(i);
        }
      }

      shelljs.mkdir('-p', 'build/');
      log(chalk.cyan('\nCopying App manifest to build directory\n'));
      shelljs.cp('-R', 'app/js/manifest.json', 'build/');

      log(chalk.cyan('\nCopying fonts to build directory\n'));
      shelljs.cp('-R', 'app/fonts/', 'build/fonts/');

      log(chalk.cyan('\nCopying images to build directory\n'));
      shelljs.cp('-R', 'app/images/', 'build/images/');

      log(chalk.cyan('\nCopying cq jsons to build directory\n'));
      shelljs.cp('-R', 'app/cq/', 'build/jsons/');

      //keeping one cpu free if more than one are available
      const numCPUs = cpus.length>1 ? cpus.length - 1 : cpus.length;

      webpackWorker.run(splitPaths, {
        maxConcurrentWorkers: numCPUs,
        maxRetries: 1
      });
    }
  );
}


program.parse(process.argv);
