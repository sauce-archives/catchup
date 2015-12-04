var inquirer = require("inquirer");
var https = require('https');
var restPath = 'saucelabs.com';
var chalk = require('chalk');
var restPort = 80;

module.exports = function () {
  var self = this;
  var accountExistsQuestion = [
    {
      type: "confirm",
      name: "existingAccount",
      message: "Do you have a Sauce Labs account",
      default: false
    }
  ];

  var accountCredentials = [
    {
      type: "input",
      name: "username",
      message: "What's your Sauce username"
    },
    {
      type: "input",
      name: "accessKey",
      message: "What's your Sauce access key"
    }
  ];

  var createNewAccount = [
    {
      type: "input",
      name: "name",
      message: "What's your first name"
    },
    {
      type: "input",
      name: "email",
      message: "Please provide a valid email address to use with Sauce Labs",
      validate: function(val) {
        var url = restPath+'/rest/v1/_users/validate?email='+val;
        var done = this.async();
        var req = https.get('https://'+url, function callback(response) {
          response.setEncoding('utf8');

          response.on("error", function (err) {
            done(err);
          });
          response.on("data", function (data) {
            if (data === '"Sorry, this email is already associated with another account"' || 
              data === '"Sorry this email is invalid"') {
              done(data);
            } else {
              done(true);
            }
          });
        });
        req.end();
      }
    },
    {
      type: "input",
      name: "username",
      message: "What's your desired username",
      validate: function (val) {
        if (val.length <= 3) {
          return "Username must be longer than 3 characters";
        }
        var url = restPath+'/rest/v1/_users/validate?username='+val;
        var done = this.async();
        var req = https.get('https://'+url, function callback(response) {
          response.setEncoding('utf8');

          response.on("error", function (err) {
            done(err);
          });
          response.on("data", function (data) {
            if (data !== '"Sorry, this username is taken"') {
              done(true);
            } else {
              done(data);
            }
          });
        });
        req.end();
      }
    },
    {
      type: "password",
      name: "password",
      message: "What's your desired password",
      validate: function(val) {
        if (val.length < 6) {
          return "Password must be longer than 6 characters";
        }
        return true;
      }
    }
  ];

  // fire the prompt
  inquirer.prompt(accountExistsQuestion, function (answers) {
    if (answers.existingAccount && process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
      console.log(chalk.blue('Environment variables for SAUCE_USERNAME & SAUCE_ACCESS_KEY found.'));
      self.userInput.username = process.env.SAUCE_USERNAME;
      self.userInput.accessKey = process.env.SAUCE_ACCESS_KEY;
      // next step
      self.samplePage();
    } else {
      if (!answers.existingAccount) {
        console.log(chalk.blue('Sign up at https://saucelabs.com. Then go to https://saucelabs.com/beta/user-settings and copy your access key'));
      } else {
        console.log(chalk.blue('Log in to https://saucelabs.com/beta/user-settings and copy your access key'));
      }
      inquirer.prompt(accountCredentials, function(creds) {
        self.userInput.username = creds.username;
        self.userInput.accessKey = creds.accessKey;
        // next step
        self.samplePage();
      });
    }
  });
};
