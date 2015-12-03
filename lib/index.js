#! /usr/bin/env node

var createAccount = require('./steps/create-account');
var samplePage = require('./steps/sample-page');
var sampleTest = require('./steps/sample-tests');
var runTest = require('./steps/run-tests');

var userInput = {};

createAccount(userInput).then(function () {
  samplePage(userInput).then(function () {
    sampleTest(userInput).then(function () {
      runTest(userInput).then(function () {
        // complete.
        console.log(userInput);
      });
    });  
  });
});
