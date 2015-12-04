var inquirer = require("inquirer");
var https = require('https');
var restPath = 'https://saucelabs.com';
var spinner = [
  "validating .",
  "validating ..",
  "validating ...",
  "validating .."
];

module.exports = function (userInput) {
  return new Promise( function (resolve, reject) {

    var i = 4;
    var ui = new inquirer.ui.BottomBar({ bottomBar: spinner[i % 4]});
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
        name: "firstName",
        message: "What's your first name"
      },
      {
        type: "input",
        name: "email",
        message: "Please provide a valid email address to use with Sauce Labs",
        validate: function(val) {
          var url = restPath+'/rest/v1/_users/validate?email='+val;
          var done = this.async();
          i = 4;
          var spin = setInterval(function() {
            ui.updateBottomBar( spinner[i++ % 4] );
          }, 300 );

          https.get(url, function callback(response) {
            response.setEncoding('utf8');

            response.on("error", function (err) {
              done(err);
            });
            response.on("data", function (data) {
              clearInterval(spin);
              ui.updateBottomBar('');
              if (data === '"Sorry, this email is already associated with another account"' || 
                data === '"Sorry this email is invalid"') {
                done(data);
              } else {
                done(true);
              }
            });
          });
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
          i = 4;
          var spin = setInterval(function() {
            ui.updateBottomBar( spinner[i++ % 4] );
          }, 300 );

          https.get(url, function callback(response) {
            response.setEncoding('utf8');

            response.on("error", function (err) {
              done(err);
            });
            response.on("data", function (data) {
              clearInterval(spin);
              ui.updateBottomBar('');
              if (data !== '"Sorry, this username is taken"') {
                done(true);
              } else {
                done(data);
              }
            });
          });
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
    ]

    // fire the prompt
    inquirer.prompt(accountExistsQuestion, function (answers) {
      if (answers.existingAccount) {
        if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
          console.log('Environment variables for SAUCE_USERNAME & SAUCE_ACCESS_KEY found.');

          setTimeout(resolve, 1000);
        } else {
          inquirer.prompt(accountCredentials, function(creds) {
            userInput.username = creds.username;
            userInput.accessKey = creds.accessKey;

            resolve();
          });
        }
      } else {
        inquirer.prompt(createNewAccount, function(creds) {
          console.log('CREDS: ', creds);
        });
      }
    });
  });
};
