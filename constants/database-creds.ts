import { Options } from 'sequelize'

const dialect = 'postgres'

const postgresEnvs: { [env: string]: Options } = {
  development: {
    dialect,
    username: 'thrive',
    password: 'sbc',
    host: 'localhost',
    port: 5432,
    database: 'thrive',
  },
  production: {
    dialect,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATA,
    // ssl: true,
    // dialectOptions: {
    //   ssl: { require: true, rejectUnauthorized: false },
    // },
  },
}

export default postgresEnvs[process.env.NODE_ENV]
