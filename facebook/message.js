const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');
const argv = require('yargs').argv;

const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');

// let's us pass a varialble from command line
const argv = require('yargs').argv;
const fs = require("fs");

// creates path to the respective log files
const path = `../logs/facebook/dms/${argv.m}.json`

// Reading the message to be sent and storing it in a variable
let message = null

fs.readFile(`../content/${argv.m}.txt`, 'UTF-8', function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    message = data;                
});

//looking if the file with the messageid is already exists

if (fs.existsSync(path)) {
    console.log('Resending an old message');
    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        let sentTo = require(path)
        let groupUrls = []
        let groups = Array.from(Array(1).keys())
      
        function storeURLs(url) {
            groupUrls.push(url)
            // console.log(groupUrls)
        }
    
        function check_repeat (array_1, array_2) {
            groupUrls = array_2.filter(x => !array_1.includes(x));
        }
      
        // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
    
        function delay() {
            let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
            console.log('delay', delay)
            return new Promise(resolve => setTimeout(resolve, delay))
        }
      
        try {
            await driver.get('https://m.facebook.com/');
            // console.log('Visited Facebook Login Page');
            await delay()
            await driver.findElement(By.name('email')).sendKeys(argv.username);
            // console.log(`Entered username ${argv.username}`);
            await delay()
            await driver.findElement(By.name('pass')).sendKeys(argv.password);
            // console.log(`Entered password ${argv.password}`);
            await delay()
            await driver.findElement(By.name('login')).click();
            // console.log('Clicked the login button');
            await delay()
            await driver.get('https://m.facebook.com/friends/center/friends/');
            // console.log('Browsed your facebook groups');
            await delay()
        } 
        finally {
            async function message (url) {
                await delay();
                await driver.get(url);
                // console.log(`Visited group ${url}`);
                await delay();
                await driver.findElement(By.xpath('//a[@aria-label="Message"]')).click()
                // console.log('Selected textarea');
                await delay();
                await driver.findElement(By.css('textarea[placeholder="Write a message..."]')).sendKeys('Hi, please ignore this message it\'s sent to test out features in real time', Key.RETURN)
                // console.log('Wrote post as: ', message);
                await delay();
                await driver.findElement(By.xpath('//button[@value="Send"]')).click()
                .then(() => {
                  sentTo.urls = sentTo.urls.concat(url)
                  // writing to the file after each successful posting of the message
                  fs.writeFile(path, JSON.stringify(sentTo, null, 4), (err) => {
                      if (err) return console.log(err);
                      console.log(`Added the url ${url} to the sent list`);
                  });         
                })
                .catch((e) => console.log(e));
                // console.log('Clicked the post button');
                await delay();
            }
          async function delayedLog(item) {
                for(let i = 0; i < 100000; i+=10000) {
                    await driver.executeScript(`scroll(0,${i})`);
                    await new Promise(random => setTimeout(random, 1000));
                    console.log(i);
                }
                // console.log('Scrolled till the end of page');
                await driver.findElements(By.css('a:not(.darkTouch)[href*="/profile.php?id="]'))
                .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
                .catch((e) => console.log(e))
                // await storeURLs()
                // console.log('Scrapped out the groups URLs and called the function to store URLs')
                await delay();
                await check_repeat(sentTo.urls, groupUrls);
                // console.log('Removed already existing URLs using check_repeat()')
                await delay();
                for(const url of groupUrls) {
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
        let groupUrls = []
        let groups = Array.from(Array(1).keys())
    
        function storeURLs(url) {
            groupUrls.push(url)
            console.log(groupUrls)
        }
        // function storeURLs() {
        //     groupUrls.push('url1','url4')
        //     console.log(groupUrls)
        // }
    
        // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
    
        function delay() {
            let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
            console.log('delay', delay)
            return new Promise(resolve => setTimeout(resolve, delay))
        }
      
        try {
            await driver.get('https://m.facebook.com/');
            // console.log('Visited Facebook Login Page');
            await delay()
            await driver.findElement(By.name('email')).sendKeys(argv.username);
            // console.log(`Entered username ${argv.username}`);
            await delay()
            await driver.findElement(By.name('pass')).sendKeys(argv.password);
            // console.log(`Entered password ${argv.password}`);
            await delay()
            await driver.findElement(By.name('login')).click();
            // console.log('Clicked the login button');
            await delay()
            await driver.get('https://m.facebook.com/friends/center/friends/');
            // console.log('Browsed your facebook groups');
            await delay()
        } 
        finally {
            async function message (url) {
                await delay();
                await driver.get(url);
                // console.log(`Visited group ${url}`);
                await delay();
                await driver.findElement(By.xpath('//a[@aria-label="Message"]')).click()
                // console.log('Selected textarea');
                await delay();
                await driver.findElement(By.css('textarea[aria-label="What\'s on your mind?"]')).sendKeys(message);
                // console.log('Wrote post as: ', message);
                await delay();
                await driver.findElement(By.xpath('//button[@value="Send"]')).click()
                .then(() => {
                  sentTo.urls = sentTo.urls.concat(url)
                  // writing to the file after each successful posting of the message
                  fs.writeFile(path, JSON.stringify(sentTo, null, 4), (err) => {
                      if (err) return console.log(err);
                      console.log(`Added the url ${url} to the sent list`);
                  });         
                })
                .catch((e) => console.log(e));
                // console.log('Clicked the post button');
                await delay();
            }
          async function delayedLog(item) {
                for(let i = 0; i < 100000; i+=10000) {
                    await driver.executeScript(`scroll(0,${i})`);
                    await new Promise(random => setTimeout(random, 1000));
                    console.log(i);
                }
                // console.log('Scrolled till the end of page');
                await driver.findElements(By.css('a:not(.darkTouch)[href*="/profile.php?id="]'))
                .then((e) => e.map((sub) => sub.getAttribute('href').then((val) => storeURLs(val))))
                .catch((e) => console.log(e))
                // await storeURLs()
                // console.log('Scrapped out the groups URLs and called the function to store URLs');
                await delay();
                for(const url of groupUrls) {
                    console.log('Current URL: ', url)
                    await message(url);
                }
                await delay()
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