var inquirer = require("inquirer");
var open = require("open");

module.exports = function () {
  var self = this;
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
    self.sampleTests();
  });
};
