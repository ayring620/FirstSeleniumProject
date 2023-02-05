const {By,Key,Builder} = require('selenium-webdriver');
require ('chromedriver');

async function myFunction(){
	var searchString ="selemium";
	let driver = await new Builder().forBrowser('chrome').build();

	await driver.get('https://www.google.com');

	const searchField = await driver.findElement(By.name('q'));

	await driver.actions()
	  .sendKeys(searchField, searchString)
	  .sendKeys(Key.RETURN)
	  .perform();


	const oneResult = await driver.findElement(By.partialLinkText("Nutrition Foundation"));

	await driver.actions()
	  .click(oneResult)
	  .perform();

    await driver.quit();
}

myFunction();
