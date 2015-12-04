var creds = require('./creds.json');

// we should get the extra params here to know what actions the user
// wanted to run against the sample website
var actions = {}
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  actions.append(val);
});

// remove first 2 elements since they are just the call to this script
actions.splice(0, 2);

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    username = creds.USER,
    accessKey = creds.KEY,
    driver;

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

if(actions.indexOf('option') > -1){
  driver.getTitle().then(function (title) {
      console.log("title is: " + title);
  });
}

driver.findElement(By.id('email')).sendKeys('catchup@saucy.com');
driver.findElement(By.id('password')).sendKeys('saucypassword');
driver.findElement(By.tagName('button')).click();
 
driver.quit();
