// Concerning coverage path ignore:
// __helpers__ is a folder of functions and data created to help with testing.
// SearchTermsMarquee cannot be rendered by JSDom, as I understand it. I hope to find another way to test this, but for the moment I am not counting it against my coverage score.
// Same with PDFViewer
// FreshStartLogo is from an earlier iteration of the project and is not used. However, I do not want to delete it right now.
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/components/RecordPane',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/__helpers__/',
    '<rootDir>/ui/FreshStartLogo',
    '<rootDir>/components/SearchTermsMarquee',
    '<rootDir>/components/PDFViewer',
    '<rootDir>/components/RecordPane',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
