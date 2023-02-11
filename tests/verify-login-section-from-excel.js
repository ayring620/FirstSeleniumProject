const { parseExcel } = require("./read-data.js");
const {By, Builder} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

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

      const dataFromExcel = parseExcel("../data/verify-login-data.xls", "Data"); 
        
      userId = dataFromExcel[0].username;
      password = dataFromExcel[0].password;

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
            
    });

  });
});