const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/__helpers__/',
    // '<rootDir>/components/LiveDataSearch',
    // '<rootDir>/components/MapMarker',
    // '<rootDir>/components/SearchTermsMarquee',
    // '<rootDir>/helpers',
    '<rootDir>/ui/FreshStartLogo',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
