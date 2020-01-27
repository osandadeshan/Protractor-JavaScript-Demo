var { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');
var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var detailsReportDirectory = reportsDirectory + '/detailReport';

const BASE_URL = "http://newtours.demoaut.com";

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'E2ETestingReport.html',
  reportTitle: "E2E Testing Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});


exports.config = {
  directConnect: true,
  baseUrl: BASE_URL,
  specs: ["spec/using_helper_class/*.js"],
  capabilities: {
    browserName: "chrome"
  },
  SELENIUM_PROMISE_MANAGER: true,     //Set this true if you are using Helper class in page objects, Set this false if you are using async/await in page objects.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000
},

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
    browser.waitForAngularEnabled(false);
    browser.driver.manage().window().maximize();

    // xml report generated for dashboard
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));

    //Test Summary report creation
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);

    var fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    //console logs configurations
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
      displaySuccessesSummary: false, // display summary of all successes after execution 
      displayFailuresSummary: true,   // display summary of all failures after execution 
      displayPendingSummary: true,    // display summary of all pending specs after execution 
      displaySuccessfulSpec: true,    // display each successful spec 
      displayFailedSpec: true,        // display each failed spec 
      displayPendingSpec: false,      // display each pending spec 
      displaySpecDuration: false,     // display each spec duration 
      displaySuiteNumber: false,      // display each suite number (hierarchical) 
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
      customProcessors: []
    }));

  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'index',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  
};
