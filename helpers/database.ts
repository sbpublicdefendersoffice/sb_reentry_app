import { Sequelize } from 'sequelize'

import { postgresEnvs } from '../constants/database-creds'

export const initDB = async (): Promise<Sequelize> => {
  const sql = new Sequelize(postgresEnvs[process.env.NODE_ENV])

  await sql
    .authenticate()
    .then(() => {
      console.log('SQL database connection established')
    })
    .catch(err => {
      console.error(`Unable to connect to SQL database: ${err}`)
    })

  return sql
}

export const killDB = (sql: Sequelize): Promise<void> =>
  sql
    .close()
    .then(() => console.log('SQL database connection closed'))
    .catch(err => {
      console.error(`Error disconnecting from SQL database: ${err}`)
    })
