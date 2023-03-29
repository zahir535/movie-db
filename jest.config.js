const config = {
  verbose: true,
  cacheDirectory: ".jest/cache",
  collectCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testResultsProcessor: "jest-sonar-reporter",
  transformIgnorePatterns: ["node_modules/(?!(react-native|@react-native)/)"],
};

module.exports = config;
