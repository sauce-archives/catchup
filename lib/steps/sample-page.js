var inquirer = require("inquirer");

module.exports = function (userInput) {
  return new Promise( function (resolve, reject) {
    
    // list of questions - examples: https://github.com/SBoudrias/Inquirer.js/tree/master/examples
    var questions = [
      {
        type: "input",
        name: "firstName",
        message: "What's your first name"
      },
      {
        type: "input",
        name: "lastName",
        message: "What's your last name",
        default: function () { return "Doe"; }
      }
    ];

    // fire the prompt
    inquirer.prompt(questions, function (results) {
      // add the user's answers to the userInput object
      // so future steps can access the information
      userInput.samplePage = results;
      
      // next step
      resolve();
    });
  });
};
