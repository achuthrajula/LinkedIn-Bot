const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const fs = require('fs');
const { error } = require('console');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
    let groupUrls = []
    let groups = Array.from(Array(1).keys())

    function storeURLs(url) {
        groupUrls.push(url)
    }

    function delay() {
        let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
        console.log('delay', delay)
        return new Promise(resolve => setTimeout(resolve, delay))
    }

  try {
    await driver.get('https://en-gb.facebook.com/');
    await delay()
    await driver.findElement(By.name('email')).sendKeys('achuth.rajula@ftlabs.io');
    await delay()
    await driver.findElement(By.name('pass')).sendKeys('7981936393');
    await delay()
    await driver.findElement(By.id('loginbutton')).click();
    await delay()
    await driver.get('https://m.facebook.com/groups_browse/your_groups/');
    await delay()
  } finally {
    async function post (url) {
        await delay();
        await driver.get(url);
        await delay();
        await driver.findElement(By.xpath('//div[text()="Write something..."]')).click();
        await delay();
        await driver.findElement(By.css('textarea[aria-label="What\'s on your mind?"]')).sendKeys('Hi this is riku, for more details visit my website https://www.getriku.com/');
        await delay();
        await driver.findElements(By.css('button[type="submit"][value="Post"]'))
        .then((e) => {
            for(var key in e){
                    var element = e[key];
                    if(element.isDisplayed()){
                        element.click();            
                    }
                    else console.log('Not visible')
            }
        })
        .catch((e) => console.log(e));
    }
    async function delayedLog(item) {
        for(let i = 0; i < 10000; i+=1000) {
            await driver.executeScript(`scroll(0,${i})`);
            await new Promise(random => setTimeout(random, 1000));
            console.log(i);
        }
        await driver.findElements(By.css('a[href*="?ref=group_browse"]'))
        .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
        .catch((e) => console.log(e))
        await delay();
        for(const url of groupUrls) {
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

