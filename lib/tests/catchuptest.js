var inquirer = require("inquirer");
var open = require("open");

module.exports = function (userInput) {
  var self = this;
  var spinner = [
    " .",
    " ..",
    " ...",
    " .."
  ];
  var ui = new inquirer.ui.BottomBar({ bottomBar: 'Running test in saucelabs.com'+spinner[0]});
  var spinTheWheel = function(text) {
    var i = 4;
    return setInterval(function() {
      ui.updateBottomBar(text+spinner[i++ % 4]);
    }, 300);
  };

  var spin = spinTheWheel('Running test in saucelabs.com');

  // we should get the extra params here to know what actions the user
  // wanted to run against the sample website
  var actions = self.userInput.sampleTest.actions;

  var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By,
  username = this.userInput.username,
  accessKey = this.userInput.accessKey,
  driver;

  SauceLabs = require("saucelabs"),
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey
  });

  var capabilities = {
    'browserName': 'chrome',
    'platform': 'Windows XP',
    'version': '43.0',
    'username': username,
    'accessKey': accessKey
  }

  driver = new webdriver.Builder().
    withCapabilities(capabilities).
    usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub").
                build();

  driver.get('http://saucelabs.github.io/catchup/');

  // if the first option was selected, we get page title
  if(actions.indexOf('title') > -1){
    driver.getTitle().then(function (title) {
      console.log("title is: " + title);
    });
  }

  // if the second option was selected, we get the email field
  if(actions.indexOf('emailInput') > -1){
    el = driver.findElement(By.id('email'));
  }
  
  if(actions.indexOf('emailValue') > -1){
    driver.findElement(By.id('email')).sendKeys('catchup@saucy.com');
  }

  if(actions.indexOf('passValue') > -1){
    driver.findElement(By.id('password')).sendKeys('saucypassword');
  }

  if(actions.indexOf('button') > -1){
    el = driver.findElement(By.tagName('button'));
  }

  if(actions.indexOf('click') > -1){
    driver.findElement(By.tagName('button')).click();
  }

  driver.quit().then(function(){
    clearInterval(spin);
    ui.updateBottomBar('');
    
    var statement = [
        {
          type: "input",
          name: "statement",
          message: "Done! Press enter to see the results"
        }
      ];

      inquirer.prompt(statement, function (results) {
        // launch test results
        open("https://saucelabs.com/beta/dashboard/tests");
        console.log('Flow complete');
      });

  });

}
