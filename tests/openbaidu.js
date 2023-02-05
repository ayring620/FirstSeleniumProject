const {By,Key,Builder} = require('selenium-webdriver');
require ('chromedriver');

async function myFunction(){
	var searchString ="selemium";
	let driver = await new Builder().forBrowser('chrome').build();

	await driver.get('https://www.baidu.com');

	const searchField = await driver.findElement(By.id('kw'));

	await driver.actions()
	  .sendKeys(searchField, searchString)
	  .sendKeys(Key.RETURN)
	  .perform();


	const baidubaike = await driver.findElement(By.partialLinkText("百科"));

	await driver.actions()
	  .click(baidubaike)
	  .perform();

	// await driver.findElement(By.css("input[type='submit']")).click;

	// await driver.quit();
}

myFunction();
