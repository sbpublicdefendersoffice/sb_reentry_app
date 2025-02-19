// watch out with adding external sources and apis in production mode, make sure to add them to CSP below
const nextConfigOptions = {
  //Workaround to patch next.js CVE-2024-47831
  images: {
    unoptimized: true,
  },
  headers: async () =>
    process.env.NODE_ENV === 'production'
      ? [
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              // the csp may be worth revisiting in the future, but it's throwing too many errors right now
              // {
              //   key: 'Content-Security-Policy',
              //   value:
              //     "default-src 'self'; script-src 'self'; script-src-elem 'self' 'unsafe-inline' *.googletagmanager.com; connect-src 'self' *.mapbox.com *.google-analytics.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline' *.mapbox.com *.googleapis.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; worker-src 'self' blob:; object-src 'self' data:; frame-src 'self' data:;",
              // },
            ],
          },
        ]
      : [],
  output: 'standalone',
  //target: 'serverless',
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset',
    })

    const fallbackModules = {
      dns: false,
      fs: false,
      net: false,
      'pg-hstore': false,
      'pg-native': false,
      tls: false,
      'mock-aws-s3': false,
      'aws-sdk': false,
      nock: false,
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
        // '@sendgrid/mail': false, with this set to false I get a chunking error in production
        'pdf-lib': false,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        ...serverOnlyModules,
      }
    }

    if (isServer)
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mapbox': false,
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

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.DEP_CHECK === 'true'
    ) {
      const CircularDependencyPlugin = require('circular-dependency-plugin')

      config.plugins.push(
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /node_modules/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // allow import cycles that include an asyncronous import,
          // e.g. via import(/* webpackMode: "weak" */ './file.js')
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }),
      )
    }

    return config
  },
  staticPageGenerationTimeout: 100000,
}

console.log(`THE ENV_NODE IS: ----> ${process.env.NODE_ENV} <----`)

module.exports = nextConfigOptions
