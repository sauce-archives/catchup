var inquirer = require("inquirer");

module.exports = function (userInput) {
  var self = this; 
  // list of questions - examples: https://github.com/SBoudrias/Inquirer.js/tree/master/examples
  var questions = [
    {
    type: "checkbox",
    message: "Choose actions to perform in website (select with space key)",
    name: "actions",
    choices: [
      new inquirer.Separator("Actions:"),
      {
        value: "title",
        name: "Get page title"
      },
      {
        value: "emailInput",
        name: "Find email input field"
      },
      {
        value: "emailValue",
        name: "Complete email input field"
      },
      {
        value: "passValue",
        name: "Complete password input field"
      },
      {
        value: "button",
        name: "Find a button on page"
      },
      {
        value: "click",
        name: "Click the button",
      }
    ],
    validate: function( answer ) {
      if ( answer.length < 1 ) {
        return "You must choose at least one action.";
      }
      return true;
    }
  }
  ];

  // fire the prompt
  inquirer.prompt(questions, function (results) {
    // add the user's answers to the userInput object
    // so future steps can access the information
    self.userInput.sampleTest = results;

    // next step
    self.runTests();
  });
};
