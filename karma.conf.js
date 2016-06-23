module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.config.js');

    config.set({

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'source-map-support'],

        // list of files to exclude
        exclude: [],

        // list of files / patterns to load in the browser
        // we are building the test environment in ./spec-bundle.js
        files: [{ pattern: 'spec-bundle.ts', watched: false }],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec-bundle.ts': ['webpack'],
            './src/app/{components,shared}/**/!(*.spec).ts': [
                'webpack',
                'sourcemap',
                'coverage'
            ],
            './src/app/{components,shared}/**/*.spec.ts': ['webpack']
        },

        // Webpack Config at ./webpack.test.config.js
        webpack: testWebpackConfig,

        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text-summary' },
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage-final.json'
                }
            ]
        },

        remapIstanbulReporter: {
            src: 'coverage/coverage-final.json',
            reports: {
                lcovonly: 'coverage/lcov.info',
                html: 'coverage/report'
            },
            timeoutNotCreated: 5000,
            timeoutNoMoreFiles: 1000
        },

        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'karma-remap-istanbul'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });

};
