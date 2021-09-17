const headers = async () => [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      {
        key: 'Content-Security-Policy',
        value:
          "default-src 'self'; script-src 'self'; script-src-elem 'self' 'unsafe-inline' *.googletagmanager.com; connect-src 'self' *.mapbox.com *.google-analytics.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' *.mapbox.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; worker-src 'self' blob:; object-src 'self' data:; frame-src 'self' data:;",
      },
    ],
  },
]

const nextConfigOptions = {
  headers,
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
            context: './src', // optional
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
