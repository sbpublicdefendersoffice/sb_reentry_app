const withPWA = require('next-pwa')

const pwaOptions = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    sw: 'service-worker.js',
  },
}

module.exports = withPWA(pwaOptions)
