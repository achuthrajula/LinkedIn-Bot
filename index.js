const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  /*
    Users
    https://www.linkedin.com/in/achuth-rajula-162048177/
    https://www.linkedin.com/in/abhishek-kasireddy-2158b91a5/

  */ 

    let users = [
      // 'https://www.linkedin.com/in/achuth-rajula-162048177/',
      'https://www.linkedin.com/in/rahul-nadendla-34212252/',
      'https://www.linkedin.com/in/saikiran-gonugunta/'
      // 'https://www.linkedin.com/in/abhishek-kasireddy-2158b91a5/',
      // 'https://www.linkedin.com/in/gowtham-venkat-sai-ram-7185a71a7/',
      // 'https://www.linkedin.com/in/anweshachattoraj/',
      // 'https://www.linkedin.com/in/gouthamgandhi/',
      // 'https://www.linkedin.com/in/priyanka-ravuri-71a784148/',
      // 'https://www.linkedin.com/in/veerababu-vattikuti-61469332/',
      // 'https://www.linkedin.com/in/kaival-trapasia-10a947169/',
      // 'https://www.linkedin.com/in/mainak-mitra-197545105/',
      // 'https://www.linkedin.com/in/shravan-yadav-a074a5145/',
      // 'https://www.linkedin.com/in/ravitejabhogavalli/',
      // 'https://www.linkedin.com/in/zeeshanver/',
      // 'https://www.linkedin.com/in/surendra-bharath-palle-329167102/'
    ]

    let companies = [
        'https://www.linkedin.com/company/twitter/',
        'https://www.linkedin.com/company/google/',
        'https://www.linkedin.com/company/microsoft/',
        'https://www.linkedin.com/company/facebook/',
        'https://www.linkedin.com/company/linkedin/',
        'https://www.linkedin.com/company/instagram/'
    ]
  try {
    await driver.get('https://www.linkedin.com/home');
    await driver.findElement(By.className('nav__button-secondary')).sendKeys(Key.RETURN);
    await driver.wait(until.titleIs('LinkedIn Login, Sign in | LinkedIn'), 1000);
    await driver.findElement(By.id('username')).sendKeys('achuth.rajula@ftlabs.io');
    await driver.findElement(By.id('password')).sendKeys('7981936393');
    await driver.findElement(By.className('btn__primary--large from__button--floating')).sendKeys(Key.RETURN);
    // // search bar
    // await driver.findElement(By.className('search-global-typeahead__input always-show-placeholder')).sendKeys('Achuth Rajula', Key.RETURN);
    // await driver.findElement(By.className('follow org-company-follow-button org-top-card-primary-actions__action artdeco-button ember-view')).sendKeys(Key.RETURN)
    // await driver.sendKeys('Hi').then(() => {}).catch((e) => console.log(e));
    // await driver.findElement(By.className('msg-form__send-button artdeco-button artdeco-button--1')).sendKeys(Key.RETURN);
  } finally {
    // await driver.quit();
    function delay() {
      return new Promise(resolve => setTimeout(resolve, 300));
    }
    
    async function delayedLog(item) {
      // notice that we can await a function
      // that returns a promise
      await delay();
      await driver.get(item);
      await delay();
      // // connect button
      // await driver.findElement(By.className('pv-s-profile-actions--connect')).sendKeys(Key.RETURN)
      await driver.findElement(By.className('pv-s-profile-actions--connect')).sendKeys(Key.RETURN)
      await delay();
      // proceed to connect with a message
      await driver.findElement(By.className('mr1 artdeco-button artdeco-button--muted artdeco-button--3 artdeco-button--secondary ember-view')).sendKeys(Key.RETURN)
      await delay();
      await driver.findElement(By.className('send-invite__custom-message')).sendKeys('Hey there, this is sent automatically using selenium webdriver', Key.RETURN);
      await delay();
      await driver.findElement(By.className('ml1 artdeco-button artdeco-button--3 artdeco-button--primary ember-view')).sendKeys(Key.RETURN)
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