/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',

  clearMocks: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  testPathIgnorePatterns: ['<rootDir>/dist'],

  roots: ['<rootDir>/tests'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
