// watch out with adding external sources and apis in production mode, make sure to add them to CSP below
const nextConfigOptions = {
  headers: async () =>
    process.env.NODE_ENV === 'production'
      ? [
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              {
                key: 'Content-Security-Policy',
                value:
                  "default-src 'self'; script-src 'self'; script-src-elem 'self' 'unsafe-inline' *.googletagmanager.com; connect-src 'self' *.mapbox.com *.google-analytics.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline' *.mapbox.com *.googleapis.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; worker-src 'self' blob:; object-src 'self' data:; frame-src 'self' data:;",
              },
            ],
          },
        ]
      : [],
  target: 'serverless',
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/inline',
    })

    const fallbackModules = {
      dns: false,
      fs: false,
      net: false,
      'pg-hstore': false,
      'pg-native': false,
      tls: false,
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      ...fallbackModules,
    }

    if (!isServer) {
      const serverOnlyModules = {
        ...fallbackModules,
        'any-promise': false,
        pg: false,
        sequelize: false,
        twilio: false,
        jsonwebtoken: false,
        bcrypt: false,
        '@sendgrid/mail': false,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        ...serverOnlyModules,
      }
    }

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.PROD_STATS === 'true'
    ) {
      const { StatsWriterPlugin } = require('webpack-stats-plugin')

      config.plugins.push(
        new StatsWriterPlugin({
          filename: 'webpack-stats.json',
          stats: {
            context: './src',
            assets: true,
            entrypoints: true,
            chunks: true,
            modules: true,
          },
        }),
      )
    }

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.PROD_SRC_MAPS === 'true'
    )
      config.devtool = 'source-map'

    return config
  },
}

console.log(`THE ENV_NODE IS: ----> ${process.env.NODE_ENV} <----`)

module.exports = nextConfigOptions
