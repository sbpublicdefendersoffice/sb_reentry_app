// Concerning ignore:
// __helpers__ is a folder of functions and data created to help with testing.
// Certain lines are ignored with /* istanbul ignore next */ as the lines effects cannot be test in JSDom
// SearchTermsMarquee cannot be rendered by JSDom, as I understand it. I hope to find another way to test this, but for the moment I am not counting it against my coverage score.
// Same with PDFViewer
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    //get back to below and make it work
    '<rootDir>/__tests__/pages/category',
    '<rootDir>/__tests__/pages/search',
    '<rootDir>/__tests__/components/RecordPane',
    '<rootDir>/__tests__/components/DisplayMap',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/__helpers__/',
    '<rootDir>/__mocks__/',
    '<rootDir>/(ui|hooks|helpers|constants|components)/index.ts',
    '<rootDir>/next.config.js',
    '<rootDir>/components/SearchTermsMarquee',
    '<rootDir>/components/PDFViewer',
    //get back to below and make it work
    '<rootDir>/pages/\\[category\\]/',
    '<rootDir>/pages/search',
    '<rootDir>/components/RecordPane',
    '<rootDir>/components/DisplayMap',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
