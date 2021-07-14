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
  production: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATA,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    // ssl: true,
    // dialectOptions: {
    //   ssl: { require: true, rejectUnauthorized: false },
    // },
  },
}

module.exports = postgresEnvs
