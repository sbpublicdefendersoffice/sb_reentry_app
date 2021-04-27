// Concerning coverage path ignore:
// __helpers__ is a folder of functions and data created to help with testing.
// SearchTermsMarquee cannot be rendered by JSDom, as I understand it. I hope to find another way to test this, but for the moment I am not counting it against my coverage score.
// FreshStartLogo is from an earlier iteration of the project and is not used. However, I do not want to delete it right now.
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/__helpers__/',
    '<rootDir>/components/SearchTermsMarquee',
    '<rootDir>/ui/FreshStartLogo',
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
}

module.exports = jestConfig
