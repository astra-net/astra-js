const baseConfig = require('./jest.src.config');
module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@astra-js/(.*)$': '<rootDir>/packages/astra-$1/src/index.ts',
  },
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testMatch: ['<rootDir>/e2e/src/?(*.)+(spec|test|e2e).ts'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  collectCoverageFrom: [
    // 'packages/!(astra-core)/src/**/*.ts',
    'packages/astra-core/src/**/*.ts',
    'packages/astra-utils/src/**/*.ts',
    'packages/astra-crypto/src/**/*.ts',
    'packages/astra-transaction/src/**/*.ts',
  ],
};
