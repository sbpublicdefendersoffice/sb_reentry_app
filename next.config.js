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

module.exports = nextConfigOptions
