const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    //make below work
    '<rootDir>/__tests__/components/RecordPane',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/__helpers__/',
    '<rootDir>/__mocks__/',
    '<rootDir>/(ui|hooks|helpers|constants|components)/index.ts',
    '<rootDir>/helpers/analytics.ts',
    '<rootDir>/next.config.js',
    //write tests for below
    '<rootDir>/components/RecordPane',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
