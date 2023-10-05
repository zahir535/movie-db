const { remote } = require("webdriverio");
// var it = mocha.it
// var assert = require('chai').assert

// const { TestConfig } = require("./utils/testConfig");
// const { MainStockPriceView } = require("./viewObjects/mainStockPriceView");

// const targetPlatforms = [TestConfig.iosBaseCapabilities(), TestConfig.androidBaseCapabilities()];

// node tests_stock/stockPriceApp.js

function iosBaseCapabilities() {
  const desiredCapabilities = {
    platformName: "iOS",
    "appium:automationName": "XCUITest",
    "appium:deviceName": "iPhone 12 Pro",
    "appium:platformVersion": "16.0",
    "appium:bundleId": "org.reactjs.native.example.movieDb",
  };

  return {
    hostname: process.env.APPIUM_HOST || "localhost",
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: "info",
    capabilities: desiredCapabilities,
  };
}

async function runTest() {
  let driver;
  const testOptions = iosBaseCapabilities();
  driver = await remote(testOptions);

  // await driver.findElement('login-button');
  // await driver.findElement(By.id("login-button")).click();
  // const getLoginButton = await driver.tapElement(driver, "~login-button");
  // setTimeout(async () => {
  //   // await getLoginButton();
  //   await driver.findElement(By.id("login-button")).click();
  // }, 5000);

  try {
    setTimeout(async () => {
      const getButton = await driver.findElement("id", "login-button");
      const buttonItem = await driver.$(getButton);

      await buttonItem.click();
    }, 3000);

    setTimeout(async () => {
      const getSearch = await driver.findElement("id", "TextInput-dashboard");
      const searchItem = await driver.$(getSearch);

      // await searchItem.click();
      await searchItem.setValue("barbie");
      // await driver.keys([Key.return]);

      const getIcon = await driver.findElement("id", "Pressable-magnifying-glass");
      const iconItem = await driver.$(getIcon);

      await iconItem.click();
    }, 5000);

    // setTimeout(async () => {
    //   await driver.send_keys("barbie").perform();
    // }, 3000);

    // setTimeout(async () => {
    //   const getIcon = await driver.findElement("id", "Pressable-magnifying-glass");
    //   const iconItem = await driver.$(getIcon);

    //   await iconItem.click();
    // }, 5000);

    // console.log("buttonItem", buttonItem);
    // const buttonItem = await driver.findElement("testID", "login-button");
    // const buttonItem = await driver.$('//*[@text="login-button"]');
    // // const buttonItem = await driver.$('//*[@text="Log In"]');
  } finally {
    await driver.pause(60000);
    await driver.deleteSession();
  }
}

// async function runTest() {
// 	const driver = await remote(wdOpts);
// 	try {
// 	  const batteryItem = await driver.$('//*[@text="Battery"]');
// 	  await batteryItem.click();
// 	} finally {
// 	  await driver.pause(1000);
// 	  await driver.deleteSession();
// 	}
//   }

runTest().catch(console.error);
