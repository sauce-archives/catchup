var creds = require('./creds.json');
var inquirer = require("inquirer");

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
      ui.updateBottomBar(text+spinner[i++ % 4] );
    }, 300 );
  };

  var spin = spinTheWheel('Running test in saucelabs.com');

  // we should get the extra params here to know what actions the user
  // wanted to run against the sample website
  var actions = self.userInput.sampleTest.actions;

  var webdriver = require('selenium-webdriver'),
  By = require('selenium-webdriver').By,
  username = creds.USER,
  accessKey = creds.KEY,
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

  console.log(actions);
  // if the first option was selected, we get page title
  if(actions.indexOf('title') > -1){
    driver.getTitle().then(function (title) {
      console.log("title is: " + title);
    });
  }

  // if the second option was selected, we get the email field
  if(actions.indexOf('emailInput') > -1){
    el = driver.findElement(By.id('email'));
    //console.log(el);
  }
  
  if(actions.indexOf('emailValue') > -1){
    driver.findElement(By.id('email')).sendKeys('catchup@saucy.com');
  }

  if(actions.indexOf('passValue') > -1){
    driver.findElement(By.id('password')).sendKeys('saucypassword');
  }

  if(actions.indexOf('button') > -1){
    el = driver.findElement(By.tagName('button'));
    //console.log(el);
  }

  if(actions.indexOf('click') > -1){
    driver.findElement(By.tagName('button')).click();
  }

  /*
  var title = this.currentTest.title,
      passed = (this.currentTest.state === 'passed') ? true : false;

  console.log(title);
  console.log(passed);
  */
  driver.quit();
  //clearInterval(spin);
  //ui.updateBottomBar('');
}
