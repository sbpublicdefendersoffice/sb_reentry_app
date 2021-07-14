import { NextApiResponse } from 'next'
import { getDb } from '../../helpers/sequelize'

const getFeedback = async (_, res: NextApiResponse): Promise<void> => {
  try {
    const { useObj } = getDb()

    const returnedFeedback = await useObj.findAll()

    res.json(returnedFeedback)
  } catch (error) {
    console.error(error)
  }
}

export default getFeedback
