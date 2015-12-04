var inquirer = require("inquirer");
var https = require('https');
var restPath = 'saucelabs.com';
var restPort = 80;
var spinner = [
  " .",
  " ..",
  " ...",
  " .."
];

module.exports = function (userInput) {
  return new Promise( function (resolve, reject) {
    var ui = new inquirer.ui.BottomBar({ bottomBar: 'validating'+spinner[0]});
    var spinTheWheel = function(text) {
      var i = 4;

      return setInterval(function() {
        ui.updateBottomBar(text+spinner[i++ % 4] );
      }, 300 );
    };

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
          var spin = spinTheWheel('validating');
          var req = https.get('https://'+url, function callback(response) {
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
          var spin = spinTheWheel('validating');
          var req = https.get('https://'+url, function callback(response) {
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
          userInput.username = creds.username;
          userInput.accessKey = creds.accessKey;

          var options = {
            hostname: restPath,
            path: '/rest/v1/_users/'+creds.username,
            port: restPort,
            data: creds,
            method: 'PUT'
          };
          var spin = spinTheWheel('Creating a new account');
          var req = https.request(options, function(res) {
            res.on('data', function(d) {
            });
            res.on('end', function() {
              ui.updateBottomBar('');
              clearInterval(spin);
              resolve();
            });
          });
          req.end();

          req.on('error', function(e) {
            ui.updateBottomBar('');
            clearInterval(spin);
          });
        });
      }
    });
  });
};
