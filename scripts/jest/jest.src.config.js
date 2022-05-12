const config = {
  transform: {
    // '^.+\\.(t|j)s$': require.resolve('./transformer.js')
    '^.+\\.(t)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tsconfig.test.json',
    },
  },
  testMatch: [
    // '<rootDir>/packages/**/test/?(*.)+(spec|test).js',
    '<rootDir>/packages/astra-core/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-account/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-network/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-crypto/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-contract/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-transaction/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-staking/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/astra-utils/test/?(*.)+(spec|test).ts',
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
  },
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts', '<rootDir>/e2e'],
  collectCoverageFrom: [
    // 'packages/!(astra-core)/src/**/*.ts',
    'packages/astra-core/src/**/*.ts',
    'packages/astra-utils/src/**/*.ts',
    'packages/astra-crypto/src/**/*.ts',
    'packages/astra-transaction/src/**/*.ts',
    'packages/astra-staking/src/**/*.ts',
    'packages/astra-contract/src/**/*.ts',
  ],
  // timers: 'fake',
  setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
  collectCoverage: true,
  automock: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = config;
