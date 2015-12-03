var inquirer = require("inquirer");
var open = require("open");

module.exports = function (userInput) {
  return new Promise( function (resolve, reject) {

    var statement = [
      {
        type: "input",
        name: "statement",
        message: "Press enter to see the website we're going to automate"
      }
    ];

    inquirer.prompt(statement, function (results) {
      // launch our example site
      open("https://saucelabs.github.io/catchup/");    
      // next step
      resolve();
    });

  });
};
