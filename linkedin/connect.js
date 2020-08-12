const {Builder, By, Key, until} = require('selenium-webdriver');
const { del } = require('selenium-webdriver/http');
 

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
    let groups = [
        'https://www.linkedin.com/in/gowtham-venkat-sai-ram-7185a71a7/',
        'https://www.linkedin.com/in/achuth-rajula-162048177/'
    ]

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
  } 
  
  finally {
    async function delayedLog(item) {
        await driver.get(item);
        await delay();
        // connect button
        await driver.findElement(By.className('pv-s-profile-actions--connect')).click();
        await delay();
        // proceed to connect with a message
        await driver.findElement(By.css('button[aria-label="Add a note"]')).click();
        await delay();
        // select the text area and write your message here
        await driver.findElement(By.className('send-invite__custom-message')).sendKeys('Hey there, this is sent automatically using selenium webdriver');
        await delay();
        // send message button
        await driver.findElement(By.css('button[aria-label="Send invitation"]')).click();
        await delay();
    }
    async function processArray(array) {
        for (const item of array) {
            await delayedLog(item);
        }
        console.log('Done!');
        await driver.quit();
    }
    processArray(groups);
  }
})();

// (async function example() {
//   let driver = await new Builder().forBrowser('chrome').build();

//     let users = [
//       // 'https://www.linkedin.com/in/achuth-rajula-162048177/',
//       // 'https://www.linkedin.com/in/rahul-nadendla-34212252/',
//       'https://www.linkedin.com/in/saikiran-gonugunta/',
//       'https://www.linkedin.com/in/abhishek-kasireddy-2158b91a5/',
//       // 'https://www.linkedin.com/in/gowtham-venkat-sai-ram-7185a71a7/',
//       // 'https://www.linkedin.com/in/anweshachattoraj/',
//       // 'https://www.linkedin.com/in/gouthamgandhi/',
//       // 'https://www.linkedin.com/in/priyanka-ravuri-71a784148/',
//       // 'https://www.linkedin.com/in/veerababu-vattikuti-61469332/',
//       // 'https://www.linkedin.com/in/kaival-trapasia-10a947169/',
//       // 'https://www.linkedin.com/in/mainak-mitra-197545105/',
//       // 'https://www.linkedin.com/in/shravan-yadav-a074a5145/',
//       // 'https://www.linkedin.com/in/ravitejabhogavalli/',
//       // 'https://www.linkedin.com/in/zeeshanver/',
//       // 'https://www.linkedin.com/in/surendra-bharath-palle-329167102/'
//     ]

//   try {
//     await driver.get('https://www.linkedin.com/home');
//     await driver.findElement(By.className('nav__button-secondary')).sendKeys(Key.RETURN);
//     await driver.wait(until.titleIs('LinkedIn Login, Sign in | LinkedIn'), 1000);
//     await driver.findElement(By.id('username')).sendKeys('achuth.rajula@ftlabs.io');
//     await driver.findElement(By.id('password')).sendKeys('7981936393');
//     await driver.findElement(By.className('btn__primary--large from__button--floating')).sendKeys(Key.RETURN);
//     // // search bar
//     // await driver.findElement(By.className('search-global-typeahead__input always-show-placeholder')).sendKeys('Achuth Rajula', Key.RETURN);
//     // await driver.findElement(By.className('follow org-company-follow-button org-top-card-primary-actions__action artdeco-button ember-view')).sendKeys(Key.RETURN)
//   } finally {
//     // await driver.quit();
//     function delay() {
//       return new Promise(resolve => setTimeout(resolve, 10000));
//     }
    
//     async function delayedLog(item) {
//       await delay();
//       await driver.get(item);
//       await delay();
//       // // connect button
//       // await driver.findElement(By.className('pv-s-profile-actions--connect')).sendKeys(Key.RETURN)
//       // // message button
//       // await delay();
//       // // proceed to connect with a message
//       // await driver.findElement(By.className('mr1 artdeco-button artdeco-button--muted artdeco-button--3 artdeco-button--secondary ember-view')).sendKeys(Key.RETURN)
//       // await delay();
//       // // select the text area and write your message here
//       // await driver.findElement(By.className('send-invite__custom-message')).sendKeys('Hey there, this is sent automatically using selenium webdriver', Key.RETURN);
//       // await delay();
//       // // send message button
//       // await driver.findElement(By.className('ml1 artdeco-button artdeco-button--3 artdeco-button--primary ember-view')).sendKeys(Key.RETURN)
      
//       // message existing contact

//       // message button
//       await driver.findElement(By.className('pv-s-profile-actions--message')).sendKeys(Key.RETURN)
//       await delay()
//       // select and type message
//       await driver.findElement(By.xpath('//div[@aria-label="Write a message…"]')).sendKeys('Hi, please ignore this message it\'s sent to test out features in real time', Key.RETURN)
//       await delay()
//       // send
//       await driver.findElement(By.css('button[type="submit"]')).click()
//       await delay()
//       // close message button
//       await driver.findElement(By.css('button[data-control-name="overlay.close_conversation_window"]')).click()
//       await delay()
//     }
//     async function processArray(array) {
//       for (const item of array) {
//         await delayedLog(item);
//       }
//       console.log('Done!');
//     }
//     processArray(users)
//   }
// })();

