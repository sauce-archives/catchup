var inquirer = require("inquirer");

module.exports = function (userInput) {
  return new Promise( function (resolve, reject) {
    
    // list of questions - examples: https://github.com/SBoudrias/Inquirer.js/tree/master/examples
    var questions = [
      {
        type: "checkbox",
        message: "Choose actions to perform in website (select with space key)",
        name: "actions",
        choices: [
          new inquirer.Separator("Actions:"),
          {
            name: "Find email input field"
          },
          {
            name:  "Complete email input field"
          },
          {
            name: "Find a button on page"
          },
          {
            name: "Click the button",
          },
          {
            name: "Get page title"
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
      userInput.sampleTest = results;
      
      // next step
      resolve();
    });
  });
};
