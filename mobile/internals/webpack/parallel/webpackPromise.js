/**
 * Created by Gautam on 6/28/18.
 */

const Promise = require('bluebird');
const chalk = require('chalk');
const webpack = require('webpack');

const baseBabelConfig = require("../webpack.base.config");
const devBabelConfig = require("../webpack.dev.config");
const prodBabelConfig = require("./../webpack.prod.config");
const env = process.env.NODE_ENV;

module.exports = (moduleName, done) => {

  return Promise.resolve(moduleName).then((moduleNameStr) => {
    const shutdownCallback = function () {
      done({
        message: chalk.red('[WEBPACK]') + ' Forcefully shut down ' + chalk.yellow(moduleName)
      });

      process.exit(0);
    };
    const finishedCallback = function (err, stats) {
      if (err) {
        console.error('%s fatal error occured', chalk.red('[WEBPACK]'));
        console.error(err);
        process.removeListener('SIGINT', shutdownCallback);
        return done(err);
      }
      if (stats.compilation.errors && stats.compilation.errors.length) {
        const message = chalk.red('[WEBPACK]') + ' Errors building ' + 
          chalk.yellow(moduleName) + " module: \n"
          + stats.compilation.errors.map(function (error) {
            return error.message;
          }).join("\n");

        process.removeListener('SIGINT', shutdownCallback);
        return done(message);
      }

      console.log(stats.toString({colors: chalk.supportsColor}));

      const timeStamp = chalk.yellow(new Date().toTimeString().split(/ +/)[0]);

      console.log('%s Finished building %s within %s seconds', chalk.blue('[WEBPACK' + timeStamp + ']'), chalk.yellow(moduleNameStr), chalk.blue((stats.endTime - stats.startTime) / 1000));

      process.removeListener('SIGINT', shutdownCallback);
      done(null, JSON.stringify(stats.toJson({colors: chalk.supportsColor})));
    };


    const configuration = (env === "development") ? baseBabelConfig(devBabelConfig(moduleName)) : baseBabelConfig(prodBabelConfig(moduleNameStr));

    console.log('%s Started %s %s', chalk.blue('[WEBPACK]'), 'building', chalk.yellow(moduleName));

    const compiler = webpack(configuration);
    compiler.run(finishedCallback);

    process.on('SIGINT', shutdownCallback);

  });

};
