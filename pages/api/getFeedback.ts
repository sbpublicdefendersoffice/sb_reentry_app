import { NextApiResponse } from 'next'
import { Sequelize, DataTypes } from 'sequelize'

import { initDB, killDB } from '../../helpers/database'

const { TEXT, DATE, BOOLEAN } = DataTypes
let sql: Sequelize

const getFeedback = async (_, res: NextApiResponse): Promise<void> => {
  try {
    sql = await initDB()

    const useObj = sql.define(
      'is_this_usefuls',
      {
        created_at: {
          type: DATE,
        },
        is_useful: { type: BOOLEAN },
        route: { type: TEXT },
        language: { type: TEXT },
        comment: { type: TEXT },
      },
      { timestamps: false },
    )

    const returnedFeedback = await useObj.findAll()

    res.json(returnedFeedback)
  } catch (error) {
    console.error(error)
  } finally {
    killDB(sql)
  }
}

export default getFeedback
