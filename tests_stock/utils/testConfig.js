export default class TestConfig {
  static webdriverPath = "/wd/hub";
  static webdriverPort = 4723;

  // static androidBaseCapabilities(appPackage, appActivity) {
  //   const desiredCapabilities = {
  //     platformName: "Android",
  //     automationName: "UiAutomator2",
  //     deviceName: "Android Emulator",
  //     appPackage: typeof appPackage !== "undefined" ? appPackage : "com.zahir.moviedb",
  //     appActivity: typeof appActivity !== "undefined" ? appActivity : "host.exp.exponent.LauncherActivity",
  //     automationName: "UiAutomator2",
  //   };

  //   return {
  //     path: this.webdriverPath,
  //     port: this.webdriverPort,
  //     capabilities: desiredCapabilities,
  //   };
  // }

  static iosBaseCapabilities(bundleId) {
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
}
