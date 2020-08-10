const {Builder, By, Key, until, WebDriver, Capabilities} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');
let required = Capabilities.chrome();
const sessionId = require('./session.json')
const fs = require('fs')

if (sessionId.sessionId === "") {
  
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  let session = driver.getSession().then((session) => {
    let data = {
      sessionId: session
    }
    fs.writeFile('./session.json', JSON.stringify(data), (err) => {
      if (err) console.log(err)
      else console.log('Session ID saved!')
    })
  })

  try {
    await driver.get('https://www.google.co.in/');
  } finally {
    // await driver.quit();
  }
})();
}

else {
  (async function example() {
    let driver = WebDriver.createSession(executor, {required});
    
    try {
      await driver.get('https://github.com/');
    } finally {
      // await driver.quit();
    }
  })();
}