import { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize, DataTypes, ModelOptions } from 'sequelize'

import { postgresEnvs } from '../../constants/database-creds'

const { TEXT, DATE, BOOLEAN } = DataTypes
const opt: ModelOptions = { timestamps: false }

const sql = new Sequelize(postgresEnvs[process.env.NODE_ENV])

const postgres = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    await sql
      .authenticate()
      .then(() => {
        console.log('SQL database connection established')
      })
      .catch(err => {
        console.error(`Unable to connect to SQL database: ${err}`)
      })

    const useObj = sql.define(
      'is_this_usefuls',
      {
        // id: {
        //   primaryKey: true,
        //   type: INTEGER,
        // },
        created_at: {
          type: DATE,
        },
        is_useful: { type: BOOLEAN },
        route: { type: TEXT },
        language: { type: TEXT },
        comment: { type: TEXT },
      },
      opt,
    )

    await useObj.create({
      created_at: new Date(Date.now()),
      is_useful: true,
      route: '/',
      language: 'english',
      comment: null,
    })

    const returnedFeedback = await useObj.findAll()

    res.json(returnedFeedback)
  } catch (error) {
    console.error(error)
  } finally {
    sql
      .close()
      .then(() => console.log('SQL database connection closed'))
      .catch(err => {
        console.error(`Error disconnecting from SQL database: ${err}`)
      })
  }
}

export default postgres
