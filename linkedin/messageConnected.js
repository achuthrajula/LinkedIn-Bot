const {Builder, By, Key, until} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');
 

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
    let profileUrls = []
    let groups = Array.from(Array(1).keys())

    function storeURLs(url) {
        profileUrls.push(url)
    }

    function delay() {
        let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
        console.log('delay', delay)
        return new Promise(resolve => setTimeout(resolve, delay))
    }

  try {
    await driver.get('https://www.linkedin.com/home');
    await delay();
    await driver.findElement(By.className('nav__button-secondary')).click();
    await delay();
    await driver.wait(until.titleIs('LinkedIn Login, Sign in | LinkedIn'), 1000);
    await delay();
    await driver.findElement(By.id('username')).sendKeys('achuth.rajula@ftlabs.io');
    await delay();
    await driver.findElement(By.id('password')).sendKeys('7981936393');
    await delay();
    await driver.findElement(By.className('btn__primary--large from__button--floating')).click();
    await delay()
    await driver.get('https://www.linkedin.com/mynetwork/invite-connect/connections/');
    await delay()
  } finally {
    async function post (url) {
        await delay();
        await driver.get(url);
        await delay();
        // message button
        await driver.findElement(By.className('pv-s-profile-actions--message')).click();
        await delay();
        // select and type message
        await driver.findElement(By.xpath('//div[@aria-label="Write a message…"]')).sendKeys('Hi, please ignore this message it\'s sent to test out features in real time', Key.RETURN);
        await delay();
        // send
        await driver.findElement(By.css('button[type="submit"]')).click();
        await delay();
        // close message button
        await driver.findElement(By.css('button[data-control-name="overlay.close_conversation_window"]')).click();
        await delay();
    }
    async function delayedLog(item) {
        for(let i = 0; i < 10000; i+=1000) {
            await driver.executeScript(`scroll(0,${i})`);
            await new Promise(random => setTimeout(random, 1000));
            console.log(i);
        }
        await driver.findElements(By.css('a[class*="mn-connection-card__link"]'))
        .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
        .catch((e) => console.log(e))
        await delay();
        for(const url of profileUrls) {
            await post(url);
        }
        await delay()
        await driver.quit();
    }
    async function processArray(array) {
        for (const item of array) {
            await delayedLog(item);
        }
        console.log('Done!');
    }
    processArray(groups);
  }
})();
