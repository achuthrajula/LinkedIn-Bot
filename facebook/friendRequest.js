const {Builder, By, Key, until, WebDriver} = require('selenium-webdriver');

// let's us pass a varialble from command line
const argv = require('yargs').argv;
const fs = require("fs");


// creates path to the respective log files
const path1 = require('path')
let path = path1.join(__dirname, `../logs/facebook/requests/${argv.m}.json`)
let users = require('../parse').facebook

//looking if the file with the messageid is already exists

if (fs.existsSync(path)) {
    console.log('Sending from an old list');
    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        let sentTo = require(path)
        let userUrls = []
        
        function check_repeat (array_1, array_2) {
            userUrls = array_2.filter(x => !array_1.includes(x));
        }
        check_repeat(sentTo.urls, users)
        // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
    
        function delay() {
            let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
            console.log('delay', delay)
            return new Promise(resolve => setTimeout(resolve, delay))
        }
      
        try {
            await driver.get('https://m.facebook.com/');
            // console.log('Visited Facebook Login Page');
            await delay();
            await driver.findElement(By.name('email')).sendKeys(argv.username);
            // console.log(`Entered username ${argv.username}`);
            await delay();
            await driver.findElement(By.name('pass')).sendKeys(argv.password);
            // console.log(`Entered password ${argv.password}`);
            await delay();
            await driver.findElement(By.name('login')).click();
            // console.log('Clicked the login button');
            await delay();
        } 
        finally {
          async function delayedLog(url) {
            await delay();
            await driver.get(url);
            await delay();
            // message button                     
            await driver.findElements(By.className('FriendRequestAdd'))
            .then((e) => {
              for(var key in e){
                  var element = e[key];
                  element.click();
                  sentTo.urls = sentTo.urls.concat(url)
                  // writing to the file after each successful posting of the message
                  fs.writeFile(path, JSON.stringify(sentTo, null, 4), (err) => {
                      if (err) return console.log(err);
                      console.log(`Added the url ${url} to the sent list`);
                  });            
              }
            })
            .catch((e) => console.log(e));
            await delay()
          }
          async function processArray(array) {
            for (const item of array) {
              await delayedLog(item);
            }
            console.log('Done!');
          }
          processArray(userUrls)
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
      
      // Generates random delay ranging from ~2-5 seconds to ensure there isn't a pattern in the sequence
  
      function delay() {
          let delay = Math.floor(Math.random() * (5000 - 2000)) + 2000
          console.log('delay', delay)
          return new Promise(resolve => setTimeout(resolve, delay))
      }
    
      try {
          await driver.get('https://m.facebook.com/');
          // console.log('Visited Facebook Login Page');
          await delay();
          await driver.findElement(By.name('email')).sendKeys(argv.username);
          // console.log(`Entered username ${argv.username}`);
          await delay();
          await driver.findElement(By.name('pass')).sendKeys(argv.password);
          // console.log(`Entered password ${argv.password}`);
          await delay();
          await driver.findElement(By.name('login')).click();
          // console.log('Clicked the login button');
          await delay();
      } 
      finally {
        async function delayedLog(url) {
          await delay();
          await driver.get(url);
          await delay();
          // message button                     
          await driver.findElements(By.className('FriendRequestAdd'))
          .then((e) => {
            for(var key in e){
                var element = e[key];
                element.click();
                sentTo.urls = sentTo.urls.concat(url)
                // writing to the file after each successful posting of the message
                fs.writeFile(path, JSON.stringify(sentTo, null, 4), (err) => {
                    if (err) return console.log(err);
                    console.log(`Added the url ${url} to the sent list`);
                });            
            }
          })
          .catch((e) => console.log(e));
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
}