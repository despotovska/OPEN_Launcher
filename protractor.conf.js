require('ts-node/register');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  baseUrl: 'http://localhost:3000/',


  specs: [
    'e2e/*.e2e.js'
  ],

  exclude: [],

  framework: 'jasmine',

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function () {
    global.EC = protractor.ExpectedConditions;
    browser.driver.manage().window().maximize();
    browser.get('http://localhost:3000/');
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'protractorReport/',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true
      })
    );
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
  },

  seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",

  useAllAngular2AppRoots: true
};
