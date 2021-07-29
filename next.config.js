// webpack included to fix issue with next-pwa. if there is an issue going forward, downgrade next-pwa to 3.1.5
// make sure to see if this is still necessary the next time packages are upgraded
// require('webpack')
const withPWA = require('next-pwa')

const nextConfigOptions = {
  future: {
    webpack5: true,
  },
  target: 'serverless',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    sw: 'service-worker.js',
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/inline',
    })

    config.resolve.fallback = {
      ...config.resolve.fallback,
      dns: false,
      fs: false,
      net: false,
      'pg-hstore': false,
      'pg-native': false,
      tls: false,
    }

    if (!isServer)
      config.resolve.alias = {
        ...config.resolve.alias,
        dns: false,
        fs: false,
        net: false,
        pg: false,
        'pg-hstore': false,
        'pg-native': false,
        sequelize: false,
        tls: false,
      }

    return config
  },
}

module.exports = withPWA(nextConfigOptions)
