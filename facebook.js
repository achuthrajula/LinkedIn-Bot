const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');

(async function example() {
  WebDriver.createSession('a94f8ff3a42faf2b5520d329c146a59c')
  let driver = await new Builder().forBrowser('chrome').build();
  console.log(driver.getSession())
    let users = [
    //   'https://m.facebook.com/achuth09',
      'https://www.facebook.com/gouthamgandhi'
    ]

  try {
    await driver.get('https://en-gb.facebook.com/login/');
    await driver.findElement(By.name('email')).sendKeys('achuth.rajula@ftlabs.io');
    await driver.findElement(By.name('pass')).sendKeys('7981936393');
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
      delay()
    //   // select and type message
    //   await driver.navigate().refresh()
    //   delay()
    //   await driver.findElement(By.css('textarea[placeholder="Write a message..."]')).sendKeys('Hi, please ignore this message it\'s sent to test out features in real time', Key.RETURN)
    //   delay()
    //   // send
    //   await driver.findElement(By.xpath('//button[@value="Send"]')).sendKeys(Key.RETURN)
    //   delay()
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

