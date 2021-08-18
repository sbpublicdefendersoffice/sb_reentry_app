// Ignored folders/files/lines fall into two buckets:
// 1: Things that do not makes sense to test in an automated fashion or things that cannot be tested with JSDom
// 2: Ignoring coverage for files that have not had tests written yet or are not working due to a breaking change
// In the case of ignored lines, /* istanbul ignore next */ is used to indicate them
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
    '<rootDir>/components/(SearchTermsMarquee|PDFViewer|MapMarker|DisplayMap)',
    //write tests for below
    '<rootDir>/components/(RecordPane|DesktopFilterView|Filter.*|Mobile.*|TagPane)',
    '<rootDir>/helpers/view',
    '<rootDir>/hooks/(useGetMatchingRecords|useFormFields|useOnClickOutside)',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
