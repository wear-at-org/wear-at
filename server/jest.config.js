// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [ 'src/**/*.ts', '!src/**/*.spec.ts', , '!src/**/*.test.ts' ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@config(.*)$': '<rootDir>/src/config/$1',
    '@models(.*)$': '<rootDir>/src/models/$1',
    '@controllers(.*)$': '<rootDir>/src/controllers/$1',
    '@services(.*)$': '<rootDir>/src/services/$1',
    '@utils(.*)$': '<rootDir>/src/utils/$1',
  },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // A list of paths to directories that Jest should use to search for files in
  roots: [ '<rootDir>/src/' ],

  // The test environment that will be used for testing
  testEnvironment: 'node',


  // Indicates whether each individual test should be reported during the run
  verbose: false,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  watchPathIgnorePatterns: [ '<rootDir>/node_modules/' ],
};
