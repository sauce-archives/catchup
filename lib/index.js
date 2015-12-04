#! /usr/bin/env node

var createAccount = require('./steps/create-account');
var samplePage = require('./steps/sample-page');
var sampleTests = require('./steps/sample-tests');
var runTests = require('./steps/run-tests');
var open = require("open");

var userInput = {};

createAccount(userInput).then(function () {
  samplePage(userInput).then(function () {
    sampleTests(userInput).then(function () {
      runTests(userInput).then(function () {
        // show the results
        open(userInput.testResultsUrl);  
      });
    });  
  });
});
