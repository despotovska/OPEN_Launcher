/*
 * When testing with webpack and ES6, we have to do some extra
 * things get testing to work right. Because we are gonna write test
 * in ES6 to, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it well compile and bundle them
 * all here!
*/
Error.stackTraceLimit = Infinity;

// import 'phantomjs-polyfill';
// import 'es6-promise';
// import 'es6-shim';
// import 'es7-reflect-metadata';


// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'reflect-metadata';

import 'ts-helpers';

import 'zone.js/dist/zone';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/long-stack-trace-zone';
// import 'zone.js/dist/async-test';
// import 'zone.js/dist/fake-async-test';


const testing = require('angular2/testing');
const browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS);

Object.assign(global, testing);
/*
  Ok, this is kinda crazy. We can use the the context method on
  require that webpack created in order to tell webpack
  what files we actually want to require or import.
  Below, context will be an function/object with file names as keys.
  using that regex we are saying look in ./src/app and ./test then find
  any file that ends with spec.ts and get its path. By passing in true
  we say do this recursively
*/
const testContext = require.context('./src', true, /\.spec\.ts/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const modules = requireAll(testContext);
// requires and returns all modules that match
