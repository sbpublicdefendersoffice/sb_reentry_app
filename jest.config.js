const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/(.next|node_modules)/',
    // RecordPane needs to be fixed
    '<rootDir>/__tests__/components/RecordPane',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/(__helpers__|__mocks__/)/',
    '<rootDir>/(ui|hooks|helpers|constants|components)/index.ts',
    '<rootDir>/components/(DisplayMap|MapMarker|PDFViewer|SearchTermsMarquee)',
    '<rootDir>/helpers/analytics.ts',
    '<rootDir>/next.config.js',
    // RecordPane needs to be fixed
    '<rootDir>/components/RecordPane',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
