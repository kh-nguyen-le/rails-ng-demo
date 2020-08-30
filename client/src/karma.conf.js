// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    hostname: 'frontend',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-selenium-grid-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      'selenium-ff': {
        base: 'SeleniumGrid',
        gridUrl: 'http://selenium-hub:4444/wd/hub',
        browserName: 'firefox'
      },
      'selenium-chrome': {
        base: 'SeleniumGrid',
        gridUrl: 'http://selenium-hub:4444/wd/hub',
        browserName: 'chrome',
        //delayLaunch: 10000
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['selenium-chrome'],
    singleRun: true
  });
};