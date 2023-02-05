const {By,Builder} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

suite(function (env) {
  describe('Verify the Login Section with invalidID', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get('http://www.demo.guru99.com/V4/');
    });

    after(async function() {
      await driver.quit();
    });

    it('should display error message when login with invalid userId ', async function () {

      // const userId = "mngr473254";
      const userId = "mngrnihao";
      const password = "ydugupy";

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

    });
  });
});