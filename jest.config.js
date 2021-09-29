const jestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/(.next|node_modules)/',
    // Below need to be fixed
    '<rootDir>/__tests__/pages/category',
    '<rootDir>/__tests__/components/RecordPane',
    '<rootDir>/__tests__/components/CityFilter',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/(__helpers__|__mocks__/)/',
    '<rootDir>/(ui|hooks|helpers|constants|components)/index.ts',
    '<rootDir>/components/(DisplayMap|MapMarker|PDFViewer|SearchTermsMarquee)',
    '<rootDir>/helpers/analytics.ts',
    '<rootDir>/next.config.js',
    // Below need to be fixed
    '<rootDir>/components/RecordPane',
    '<rootDir>/components/CityFilter',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
