/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',

  clearMocks: true,

  collectCoverageFrom: ['<rootDir>/tests'],

  testPathIgnorePatterns: ['<rootDir>/dist'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
