
const {By, Builder} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");
const validData =[
  {username: 'mngr473254',
   password:'ydugupy',
  },
  {username: 'mngr473254',
   password:'ydugupy',
  },
];

const invalidData =[
  {username: 'valid',
   password: 'invalid',
  },
  {username: 'invalid',
  password: 'valid',
  },
  {username: 'invalid',
  password: 'invalid',
  },
];

suite(function (env) {
  describe('Verify the Login Section', function () {
    let driver;
    let userId;
    let password;

    beforeEach(async function () {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.manage().setTimeouts({implicit:10000});
      await driver.get('http://www.demo.guru99.com/V4/');
    });

    afterEach(async function() {
      await driver.quit();
    });

    it('should display successful information when login with valid userId and password', async function () {

      
      for(let i = 0; i < validData.length; i++) {
        
        userId = validData[i].username;
        password = validData[i].password;

        const userIdField = await driver.findElement(By.name("uid"));

        await driver.actions()
          .sendKeys(userIdField, userId)
          .perform();


        const passwordField = await driver.findElement(By.name("password"));

        await driver.actions()
          .sendKeys(passwordField, password)
          .perform();


        const loginBtn = await driver.findElement(By.name("btnLogin"));

        await loginBtn.click();


        const resultText = await driver.findElement(By.xpath("/html[1]/body[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]"))
                                      .getText();
        

        assert.equal(resultText.includes("Welcome To Manager's Page of Guru99 Bank"), true);
        assert.equal(resultText.includes("Manger Id : " + userId), true);


        const title = await driver.getTitle();
        assert.equal(title, "Guru99 Bank Manager HomePage");

        const logoutBtn = await driver.findElement(By.linkText("Log out"));

        await logoutBtn.click();

        let alert = await driver.switchTo().alert();
        await alert.accept();      
      };
            
    });

    it('should display error message when login with invalid userId ', async function () {

      
      for (let i = 0; i < invalidData.length; i++) {
        userId = invalidData[i].username;
        password = invalidData[i].password;

        const userIdField = await driver.findElement(By.name("uid"));

        await driver.actions()
          .sendKeys(userIdField, userId)
          .perform();


        const passwordField = await driver.findElement(By.name("password"));

        await driver.actions()
          .sendKeys(passwordField, password)
          .perform();


        const loginBtn = await driver.findElement(By.name("btnLogin"));

        await loginBtn.click();

        let alert = await driver.switchTo().alert();
        let alertText= await alert.getText();
        console.log("Alert message is:", alertText);

        assert.equal(alertText.includes("User or Password is not valid"), true);

        alert.accept();

      }
    });
  });
});