const { remote } = require("webdriverio");

// const capabilities = {
//   platformName: "Android",
//   "appium:automationName": "UiAutomator2",
//   "appium:deviceName": "Android",
//   "appium:appPackage": "com.android.settings",
//   "appium:appActivity": ".Settings",
// };
// const desiredCapabilities = {
//   platformName: "iOS",
//   automationName: "XCUITest",
//   deviceName: "iPhone 12 Pro Max",
//   platformVersion: "14.2",
//   bundleId: "org.reactjs.native.example.movieDb",
// };
const desiredCapabilities = {
  platformName: "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 12 Pro",
  "appium:platformVersion": "16.0",
  "appium:bundleId": "org.reactjs.native.example.movieDb",
};
// iPhone 12 Pro C8ACBED2-DA6E-417F-99BF-4B1E324CA078
// path: "/wd/hub",

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities: desiredCapabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
