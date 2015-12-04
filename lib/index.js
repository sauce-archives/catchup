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

console.log("\n" +
"                 ssssssss\n" +
"          /+osyhhhhhhhhhhys/\n" +
"       /+shhhhhyssoooshhhs/  so/\n" +
"     /oyhhhyo  +oossshhs/   hhhs/\n" +
"   /+yhhhs  oyhhhhhhho/  s  hhhhhhs\n" +
"  /ohhhy  shhhhhhhho   ss  hhhhhhhhs\n" +
" /+hdds  hhhhhhhyo  shss  hhhhhhhhhhs\n" +
"/+yddy  dhhhhhyo/  hhss          yhhos\n" +
"/oddd  hhhhhyo/  hhhhhyyyyyyyyyy  ohhys\n" +
"+sddh  dhdyo//              oyhhy  hhh+\n" +
"+sddh  dhhyyyyyyyyssssss+  oyhhhy  hhh+\n" +
"+oddd  sssssssssssyhhhy+  hhhhhho  hhh/\n" +
" ++hdd           ohhy+  hhhhhhhy  yhhs\n" +
" +odddddddddhh  shy+  hhhhhhhhs  yhhy/\n" +
"  +sddddddddh  ss+  hhhhhhhhy  +yhhy/\n" +
"   +ohdddddh  ss  hhhhhhhys  +yhhhs/\n" +
"    ++shddh  s  hhyssoo+/  syhhhy+\n" +
"     +++sy+   hddysssssyyhhhhhs+\n" +
"        ++  +shhddddhhhhhhyyo+/\n" +
"           \\sssssssssss//\n" +
"\n\n" + 
"            SAUCE CATCHUP\n")

// let's get started
catchup.createAccount();
