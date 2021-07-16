import { NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

const getFeedback = async (_, res: NextApiResponse): Promise<void> => {
  try {
    const { useObj } = initDb()

    const returnedFeedback = await useObj.findAll()

    res.json(returnedFeedback)
  } catch (error) {
    console.error(error)
  }
}

export default getFeedback
