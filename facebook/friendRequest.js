const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');
const argv = require('yargs').argv;

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
    let users = [
    //   'https://m.facebook.com/achuth09',
      'https://www.facebook.com/gouthamgandhi'
    ]

  try {
    await driver.get('https://en-gb.facebook.com/login/');
    await driver.findElement(By.name('email')).sendKeys(argv.username);
    await driver.findElement(By.name('pass')).sendKeys(argv.password);
    await driver.findElement(By.id('loginbutton')).sendKeys(Key.RETURN);
  } finally {
    // await driver.quit();
    function delay() {
      return new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    async function delayedLog(item) {
      await delay();
      await driver.get(item);
      await delay();

      // message button                     
      await driver.findElement(By.className('FriendRequestAdd')).click()
      await delay()
    }
    async function processArray(array) {
      for (const item of array) {
        await delayedLog(item);
      }
      console.log('Done!');
    }
    processArray(users)
  }
})();