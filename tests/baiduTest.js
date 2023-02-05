//调用Chrome浏览器。打开网址: www.baidu.com点击百度搜索文本框。输入关键字 - “易百教程”单击“搜索”按钮。
const {By,Key,Builder} = require('selenium-webdriver');
require ('chromedriver');

async function myFunction(){
	let driver = await new Builder().forBrowser("chrome").build();

	await driver.get("http://wwww.baidu.com");

	const searchField = await driver.findElement(By.id("kw"));
	var searchString = "易百教程";

	await driver.actions()
	  .sendKeys(searchField, searchString)
	  .perform();

	await driver.findElement(By.id("su")).click();
    
    await driver.quit();




}

myFunction();

