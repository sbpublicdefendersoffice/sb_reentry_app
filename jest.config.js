const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__helpers__',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/ui/',
    '<rootDir>/__tests__/__helpers__/',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
