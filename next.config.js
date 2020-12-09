const withPWA = require('next-pwa')

const nextConfigOptions = {
  target: 'serverless',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    sw: 'service-worker.js',
  },
}

module.exports = withPWA(nextConfigOptions)
