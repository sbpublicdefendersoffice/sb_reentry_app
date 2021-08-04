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

    config.plugins.push(
      new StatsWriterPlugin({
        filename: 'webpack-stats.json',
        stats: {
          context: './src', // optional, will improve readability of the paths
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
        },
      }),
    )

    return config
  },
}

module.exports = nextConfigOptions
