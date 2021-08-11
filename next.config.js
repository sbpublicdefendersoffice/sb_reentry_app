const { StatsWriterPlugin } = require('webpack-stats-plugin')

const nextConfigOptions = {
  future: {
    webpack5: true,
  },
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
        pg: false,
        sequelize: false,
        twilio: false,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        ...serverOnlyModules,
      }
    }

    if (process.env.NODE_ENV === 'production') {
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

      if (process.env.PROD_SRC_MAPS === 'true') config.devtool = 'source-map'
    }

    return config
  },
}

module.exports = nextConfigOptions
