const baseOptions = {
  dialect: 'postgres',
  port: 5432,
}

const postgresEnvs = {
  development: {
    ...baseOptions,
    host: 'localhost',
    database: 'thrive',
    username: 'thrive',
    password: 'sbc',
  },
  production: {},
}

module.exports = postgresEnvs
