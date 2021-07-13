import { Options } from 'sequelize'
import { DatabaseEnvs } from '../types/database'

const baseOptions: Options = {
  dialect: 'postgres',
  port: 5432,
}

export const postgresEnvs: DatabaseEnvs = {
  development: {
    ...baseOptions,
    host: 'localhost',
    database: 'thrive',
    username: 'thrive',
    password: 'sbc',
  },
  production: {},
}
