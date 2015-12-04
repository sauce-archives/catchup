var config = require('./creds.json');

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
 
driver.getTitle().then(function (title) {
    console.log("title is: " + title);
});

driver.findElement(By.id('email')).sendKeys('catchup@saucy.com');
driver.findElement(By.id('password')).sendKeys('saucypassword');
driver.findElement(By.tagName('button')).click();
 
driver.quit();
