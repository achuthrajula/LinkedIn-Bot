const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const argv = require('yargs').argv;

const fs = require("fs");

// creates path to the respective log files
const path1 = require('path')
let path = path1.join(__dirname, `../logs/linkedin/dms/${argv.m}.json`)

// Reading the message to be sent and storing it in a variable
let msg = null

fs.readFile(path1.join(__dirname ,`../content/${argv.m}.txt`), 'UTF-8', function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    msg = data;                
});

//looking if the file with the messageid is already exists

if (fs.existsSync(path)) {
    console.log('Resending an old message');
    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        let sentTo = require(path)
        let userURLs = []
        let groups = Array.from(Array(1).keys())
      
        function storeURLs(url) {
            userURLs.push(url)
        }
    
        function check_repeat (array_1, array_2) {
            userURLs = array_2.filter(x => !array_1.includes(x));
        }
      
        // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
    
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
            await delay();
            await driver.get('https://www.linkedin.com/mynetwork/invite-connect/connections/');
            await delay();
        } 
        finally {
            async function message (url) {
              await delay();
              await driver.get(url);
              await delay();
              // message button
              await driver.findElement(By.className('pv-s-profile-actions--message')).click();
              await delay();
              // select and type message
              await driver.findElement(By.xpath('//div[@aria-label="Write a message…"]')).sendKeys(msg, Key.RETURN);
              await delay();
              // send
              await driver.findElement(By.css('button[type="submit"]')).click();
              await delay();
              // close message button
              await driver.findElement(By.css('button[data-control-name="overlay.close_conversation_window"]')).click();
              await delay();
            }
          async function delayedLog(item) {
                for(let i = 0; i < 100000; i+=10000) {
                    await driver.executeScript(`scroll(0,${i})`);
                    await new Promise(random => setTimeout(random, 1000));
                    console.log(i);
                }
                // console.log('Scrolled till the end of page');
                await driver.findElements(By.css('a[class*="mn-connection-card__link"]'))
                .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
                .catch((e) => console.log(e))
                await delay();
                await check_repeat(sentTo.urls, userURLs);
                await delay();
                for(const url of userURLs) {
                    console.log('Current URL: ', url)
                    await message(url);
                }
                await delay()
          }
          async function processArray(array) {
              for (const item of array) {
                  await delayedLog(item);
              }
              console.log('Task Successfully Finished!');
          }
          processArray(groups);
        }
      })();
}

else {
    console.log('Since that you\'re here it\'s understood that this message is being sent the first time, so it\'ll be sent to all your connections')
    let data = {
        urls: []
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 4), (err) => {
        if (err) return console.log(err);
        console.log('Created a log file');
    });

    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        let sentTo = require(path)
        let userURLs = []
        let groups = Array.from(Array(1).keys())
    
        function storeURLs(url) {
            userURLs.push(url)
            console.log(userURLs)
        }
        // function storeURLs() {
        //     userURLs.push('url1','url4')
        //     console.log(userURLs)
        // }
    
        // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
    
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
            await delay();
            await driver.get('https://www.linkedin.com/mynetwork/invite-connect/connections/');
            await delay();
        } 
        finally {
            async function message (url) {
              await delay();
              await driver.get(url);
              await delay();
              // message button
              await driver.findElement(By.className('pv-s-profile-actions--message')).click();
              await delay();
              // select and type message
              await driver.findElement(By.xpath('//div[@aria-label="Write a message…"]')).sendKeys(msg, Key.RETURN);
              await delay();
              // send
              await driver.findElement(By.css('button[type="submit"]')).click();
              await delay();
              // close message button
              await driver.findElement(By.css('button[data-control-name="overlay.close_conversation_window"]')).click();
              await delay();
            }
          async function delayedLog(item) {
              for(let i = 0; i < 100000; i+=10000) {
                await driver.executeScript(`scroll(0,${i})`);
                await new Promise(random => setTimeout(random, 1000));
                console.log(i);
              }
              // console.log('Scrolled till the end of page');
              await driver.findElements(By.css('a[class*="mn-connection-card__link"]'))
              .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
              .catch((e) => console.log(e))
              await delay();
              for(const url of userURLs) {
                  console.log('Current URL: ', url)
                  await message(url);
              }
              await delay();
            }
          async function processArray(array) {
              for (const item of array) {
                  await delayedLog(item);
              }
              console.log('Task Finished Successfully!');
          }
          processArray(groups);
        }
      })();
}