// webpack included to fix issue with next-pwa. if there is an issue going forward, downgrade next-pwa to 3.1.5
// make sure to see if this is still necessary the next time packages are upgraded
// require('webpack')
const withPWA = require('next-pwa')
const { exec } = require('child_process')

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
  webpack: config => {
    config.module.rules.push({
      test: /\.pdf/,
      type: 'asset/inline',
    })

    config.plugins.push({
      apply: compiler => {
        compiler.hooks.done.tap('StartSequelize', () =>
          exec('node ./helpers/sequelize.js&'),
        )
      },
    })

    return config
  },
}

module.exports = withPWA(nextConfigOptions)
