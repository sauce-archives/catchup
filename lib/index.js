#! /usr/bin/env node

var createAccount = require('./steps/create-account');
var samplePage = require('./steps/sample-page');
var sampleTests = require('./steps/sample-tests');
var runTests = require('./steps/run-tests');
var actualTest = require('./tests/catchuptest');
var open = require("open");

var catchup = {
  userInput: {},
  createAccount: createAccount,
  samplePage: samplePage,
  sampleTests: sampleTests,
  runTests: runTests,
  actualTest: actualTest
}

// let's get started
//catchup.createAccount();
catchup.sampleTests();
